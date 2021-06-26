import { fetchJoke } from './index.js';
import { loader, jokeHolder, jokeButtonSpan } from './elements.js';
import { randomItemFromArray } from './utils.js';
import buttonText from '../data/buttontext.js';

export async function handleClick() {
  // data returned here will have other props but we just want joke,
  // so, use DESTRUCTURING
  const { joke } = await fetchJoke(loader);
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}
