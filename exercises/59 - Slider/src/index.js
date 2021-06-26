// a slider basically adds and removes prev, current, and next classes

// use a /src folder when you have a bunch of javascript

console.log('its working');

function Slider(sliderElement) {
  // check if a valid HTML element was passed in
  if (!(sliderElement instanceof Element)) {
    throw new Error('No slider was passed in');
  }

  // create some empty variables for working with the slider
  let current;
  let prev;
  let next;

  // select the elements needed for the slider
  // querySelector finds and binds to the first element that matches
  const slides = sliderElement.querySelector('.slides');
  const prevButton = sliderElement.querySelector('.goToPrev');
  const nextButton = sliderElement.querySelector('.goToNext');

  // current is defined outside this so all these function will have access to it
  // this is an example of variables in a CLOSURE!
  function startSlider() {
    current =
      sliderElement.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    // console.log({ current, prev, next });
  }

  // DOM DOOM TIPS
  // nextSibling gives a node (which could be plain text)
  // nextElementSibling gives an element only

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // first strip all the classess off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    // loop over with forEach and classList.remove
    [prev, current, next].forEach((element) =>
      element.classList.remove(...classesToRemove)
    );
    // this could also be done in three lines, like so:
    // prev.classList.remove(...classesToRemove);
    // current.. next.. etc.

    if (direction === 'back') {
      // const oldPrev = prev;
      // prev = prev.previousElementSibling;
      // current = oldPrev;
      // doing this for each of them sucks!
      // instead, lets make an array of the new values and destructure them
      // over and into the prev, current, and next vars
      // get the prev slide, or if there is none, get the last slide from the entire slider to wrap
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      // shift them all around as needed, easy!
      [prev, current, next] = [
        current,
        next,
        // get the next slide, or if at the end, loop around and grab the first
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    // don't forget to run the all important function you carefully made!
    applyClasses();
  }

  // when this slider is created, run the relevant functions
  startSlider();
  applyClasses();

  // event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
