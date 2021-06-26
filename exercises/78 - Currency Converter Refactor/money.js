// caching
// APIs
// promises
// async await

import { currencies, symbols } from './currencies.js';
import { handleInput } from './handlers.js';
import * as functions from './functions.js';

// free API has limited functionality so EUR is the only option
export const fromSelect = 'EUR';
export const fromInput = document.querySelector('[name="from_amount"]');
export const toSelect = document.querySelector('[name="to_currency"]');
export const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

toEl.textContent = formatCurrency(rawAmount, toSelect.value);
// console.log(rawAmount);

// run it once, store it in a variable, then you can use it later
const optionsHTML = generateOptions(currencies);

// populate options elements
// fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

// listen for input on the form and cover all inputs inside
form.addEventListener('input', handleInput({ fromInput }));
