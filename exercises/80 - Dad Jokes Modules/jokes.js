import { handleClick } from './lib/handlers.js';
import { jokeButton } from './lib/elements.js';
// pass function here to allow adding arguments
jokeButton.addEventListener('click', handleClick);

// alternative:
// jokeButton.addEventListener('click', handleClick.bind(null, loader));
