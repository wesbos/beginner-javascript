// select all elements to interact with
const textArea = document.querySelector('[name="text"]');
const result = document.querySelector('.result');
// turn the result into an array (instead of a node list)
const filterInputs = Array.from(document.querySelectorAll('[name="filter"]'));

/* eslint-disable */
const funkyLetters = {
  '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
};
/* eslint-enable */

// STORE METHODS inside an object and look them up based on an external variable

const filters = {
  // every other upper and lower
  sarcastic(letter, index) {
    // if odd, return 1 and that's truthy so
    if (index % 2) {
      return letter.toUpperCase();
    }
    // if even, return zero and lower it
    return letter.toLowerCase();
  },
  // filter randomly make them superscript
  funky(letter) {
    // first check if there is a funky letter for this case
    let funkyLetter = funkyLetters[letter];
    if (funkyLetter) return funkyLetter;
    // if there is not, check for a lowercase version
    funkyLetter = funkyLetters[letter.toLowerCase()];
    if (funkyLetter) return funkyLetter;

    // if nothing, return the regular
    return letter;
  },
  // filter randomly add ...
  unable(letter) {
    const random = Math.floor(Math.random() * 3);
    if (letter === ' ' && random === 1) {
      return '...';
    }
    return letter;
  },
};

// create generalized transform function

// grab the filter you want to use
function transformText(text) {
  // const filter = document.querySelector('[name="filter"]:checked').value;
  // instead of selecting it again (we already have it), do a .find for performance
  const filter = filterInputs.find((input) => input.checked).value;
  console.log(filter);
  // take the text, and loop over each letter to arrayify
  const mod = Array.from(text).map(filters[filter]);

  result.textContent = mod.join('');
}

textArea.addEventListener('input', (e) => transformText(e.target.value));

// trigger each filter and show result as soon as its selected
filterInputs.forEach((input) =>
  input.addEventListener('input', () => {
    transformText(textArea.value);
  })
);

// MODULO!!
// get minutes and seconds, etc.
// if x % 2 returns 0 then it's even
// if x % 2 returns 1 then it's odd
