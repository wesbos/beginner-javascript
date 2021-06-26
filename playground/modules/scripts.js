// you can rename import functions with 'as'
import first, { returnHi as sayHi, last } from './utils.js';
import * as everything from './ben.js';
import { handleButtonClick } from './handlers.js';

// scripts.js selects elements and hooks up event listeners
// almost all other utility, data, functionality, handlers go in separate files

const button = document.querySelector('button');

button.addEventListener('click', handleButtonClick);
