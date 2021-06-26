// caching
// APIs
// promises
// async await

// free API has limited functionality so EUR is the only option
const fromSelect = 'EUR';
const fromInput = document.querySelector('[name="from_amount"]');
const toSelect = document.querySelector('[name="to_currency"]');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

const endpoint = 'http://api.exchangeratesapi.io/v1/latest';
const key = 'a00f25ae793abf75095a7edf3d877482';
const ratesByBase = {};
const symbols = 'USD,EUR,GBP,JPY';

const currencies = {
  USD: 'United States Dollar',
  EUR: 'Euros',
  GBP: 'British Pound Sterling',
  JPY: 'Japanese Yen',
};

// loop over object

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

async function fetchRates(base = 'EUR') {
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

async function handleInput(e) {
  // actual event happens on the input or selectbox
  // console.log(e.target);
  // form is the currentTarget
  // console.log(e.currentTarget);
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
  toEl.textContent = formatCurrency(rawAmount, toSelect.value);
  // console.log(rawAmount);
}

// run it once, store it in a variable, then you can use it later
const optionsHTML = generateOptions(currencies);

// populate options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

// listen for input on the form and cover all inputs inside
form.addEventListener('input', handleInput);
