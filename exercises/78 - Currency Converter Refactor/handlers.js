// using async await means this request will only be made when the event fires

import { convert } from './functions.js';

export async function handleInput(e) {
  // actual event happens on the input or selectbox
  // console.log(e.target);
  // form is the currentTarget
  // console.log(e.currentTarget);
  // const { fromInput, fromSelect, toSelect } = await import('./money.js');

  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
}
