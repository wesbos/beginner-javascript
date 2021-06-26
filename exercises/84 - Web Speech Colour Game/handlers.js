import { isValidColor } from './colors';

function logWords(results) {
  // console.log(results[results.length - 1][0].transcript);
}

export function handleResult({ results }) {
  logWords(results);
  const words = results[results.length - 1][0].transcript;
  console.log(words);
  // lowercase all
  let color = words.toLowerCase();
  // strip any spaces
  color = color.replace(/\s/g, '');
  // check if color name is valid
  if (!isValidColor(color)) return;
  // if valid, show the UI highlight for that color
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  // console.log(colorSpan);
  // console.log('color is valid.');

  // change
  document.body.style.backgroundColor = color;
}
