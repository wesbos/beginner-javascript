// loop over object
import { endpoint, key, ratesByBase } from './api.js';

function generateOptions(options) {
  return (
    Object.entries(options)
      // map over each entry and generate HTML
      .map(
        ([currencyCode, currencyName]) =>
          `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
      )
      // join to dump as HTML
      .join('')
  );
}

async function fetchRates() {
  const res = await fetch(`${endpoint}?access_key=${key}&symbols=${symbols}`);
  const rates = await res.json();
  console.log(rates);
  return rates;
}

async function convert(amount, from, to) {
  // need to cache the rates to avoid rate limits on the API
  // first check if we have rates to convert from that currency

  // use [from] to look up what was passed in
  if (!ratesByBase[from]) {
    console.log(`oh no, no ${from} to convert to ${to}. Go gets it!`);
    const rates = await fetchRates(from);
    console.log(rates);
    // store rates from lookup in from property of ratesByBase
    // this is wiped on page reload but it could be put in local storage, react state, etc.
    ratesByBase[from] = rates;
  }
  // convert the amount that was passed in
  // when passing variables you need to use [square brackets]
  const cRate = ratesByBase[from].rates[to];
  const convertedAmount = cRate * amount;
  console.log(`${amount} ${fromSelect} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );
}

export { generateOptions, fetchRates, convert, formatCurrency };
