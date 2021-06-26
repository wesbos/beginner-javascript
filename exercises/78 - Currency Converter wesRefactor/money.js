import { init } from './init.js';
// caching
// APIs
// promises
// async await

// start the app
const app = document.querySelector('.app');

app.addEventListener('mouseenter', init, { once: true });
