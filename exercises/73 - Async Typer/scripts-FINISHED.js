function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}



// recursion
function draw(el) {
  let index = 1;
  const text = el.textContent;
  const typeMin = parseInt(el.dataset.typeMin, 10);
  const typeMax = parseInt(el.dataset.typeMax, 10);
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    // exit condition
    await wait(amountOfTimeToWait);
    if (index <= text.length) {
      drawLetter();
      // wait for some time
    }
  }
  // when this function draw() runs, kick off drawLetter
  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
