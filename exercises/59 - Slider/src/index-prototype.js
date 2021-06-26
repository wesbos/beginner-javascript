// a slider basically adds and removes prev, current, and next classes

// use a /src folder when you have a bunch of javascript

console.log('its working');

function Slider(sliderElement) {
  // check if a valid HTML element was passed in
  if (!(sliderElement instanceof Element)) {
    throw new Error('No slider was passed in');
  }

  // removed for Prototype refactor
  // create some empty variables for working with the slider
  // let current;
  // let prev;
  // let next;

  // select the elements needed for the slider
  // querySelector finds and binds to the first element that matches
  this.slides = sliderElement.querySelector('.slides');
  this.sliderElement = sliderElement;

  // WHY are these not this. ?
  // because they are not needed anywhere outside the constructor.
  // just keep them as regular CONST variables and access them inside the function

  const prevButton = sliderElement.querySelector('.goToPrev');
  const nextButton = sliderElement.querySelector('.goToNext');

  // BIND prototype methods
  this.startSlider = this.startSlider.bind(this);
  this.applyClasses = this.applyClasses.bind(this);
  this.move = this.move.bind(this);

  // event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', this.move);

  // when this slider is created, run the relevant functions
  this.startSlider();
  this.applyClasses();
}

// current is defined outside this so all these function will have access to it
// this is an example of variables in a CLOSURE!
Slider.prototype.startSlider = function () {
  this.current =
    this.sliderElement.querySelector('.current') ||
    this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  // console.log({ current, prev, next });
};

// DOM DOOM TIPS
// nextSibling gives a node (which could be plain text)
// nextElementSibling gives an element only

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function (direction) {
  // first strip all the classess off the current slides
  const classesToRemove = ['prev', 'current', 'next'];
  // loop over with forEach and classList.remove
  [this.prev, this.current, this.next].forEach((element) =>
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
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    // shift them all around as needed, easy!
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      // get the next slide, or if at the end, loop around and grab the first
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  // don't forget to apply the classes on move
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);
// to access dogSlider (when using parcel or other packaging)
// you need to do this:
window.dogSlider = dogSlider;

// Surface Functionality via methods
// and let other people hook in to it
window.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    dogSlider.move('back');
  }
});
