// LIB contains core functionality unique to this app

// you can import into multiple files

const endpoint = 'http://api.exchangeratesapi.io/v1/latest';
const key = 'a00f25ae793abf75095a7edf3d877482';
const symbols = 'USD,EUR,GBP,JPY';
const ratesByBase = {};

export async function fetchRates(base = 'EUR') {
  const res = await fetch(`${endpoint}?access_key=${key}&symbols=${symbols}`);
  const rates = await res.json();
  console.log(rates);
  return rates;
}

export async function convert(amount, from, to) {
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
  // console.log(`${amount} ${fromSelect} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}
