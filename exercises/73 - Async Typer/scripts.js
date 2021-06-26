function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PURE FUNCTIONS are BETTER
// by adding an argument for randomnumber this becomes a pure function
// it is completely reliable, for testing, etc.
function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// ASYNC FOR OF LOOP
// async function draw(el) {
//   const text = el.textContent;
//   let soFar = '';
//   for (const letter of text) {
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some amount of time
//     const { typeMin, typeMax } = el.dataset;
//     const amountOfTimeToWait = getRandomBetween(typeMin,typeMax);
//     await wait(amountOfTimeToWait);
//   }
// }

// recursion
// a function calling itself until there is an exit condition where it stops

function draw(el) {
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;

    // wait a bit
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);

    // exit condition
    if (index <= text.length) {
      // this is a call to itself, AKA recursion
      drawLetter();
    }
  }
  // when this function draw() runs, kick off drawLetter
  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
