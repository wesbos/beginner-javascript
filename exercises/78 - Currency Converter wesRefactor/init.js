// if you have a circular dependency, split the functionality into a new file again, like this one
// this section was moved from elements.js for that reason

import { fromSelect, toSelect } from './elements.js';
import { generateOptions } from './utils.js';
import currencies from './currencies.js';
import { handleInput } from './handlers.js';

export function init() {
  // when the page loads, this code runs
  const form = document.querySelector('.app form');

  // run it once, store it in a variable, then you can use it later
  const optionsHTML = generateOptions(currencies);

  // populate options elements
  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  // listen for input on the form and cover all inputs inside
  form.addEventListener('input', handleInput);
}
