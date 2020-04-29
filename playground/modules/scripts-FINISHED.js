import first, { returnHi as sayHi, last, middle } from "./utils.js";
import * as everything from "./wes.js";
import { handleButtonClick } from "./handlers.js";

const button = document.querySelector("button");

button.addEventListener("click", handleButtonClick);
