import { convert } from './lib.js';
import { formatCurrency } from './utils.js';
import { fromInput, fromSelect, toSelect, toEl } from './elements.js';

export async function handleInput(e) {
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
