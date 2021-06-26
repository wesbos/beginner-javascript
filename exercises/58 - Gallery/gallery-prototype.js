// a CLOSURE is the ability to create a function that has scope
// you can define variables that are

// function Gallery(gallery) {
//   // the variables here will remain accessible after the function is done running
//   // even after it has "closed over"
//   const buttons = gallery.querySelectorAll('button');
//   // this function will exist for other things
//   function showNextImage() {
//     buttons +=;
//   }
// }

// How can you REUSE code?

// this gallery function and all its children are basically duplicated
// when we have a new gallery
// this is a case where prototypes are helpful.
function Gallery(gallery) {
  if (!gallery) {
    throw new Error('no gallery found!');
  }

  // need to save reference to gallery div that was passed in
  // we're going to need it in prototype methods
  this.gallery = gallery;

  // Select the elements we need and arrayify to interact with
  // need to scope to the element passed in from the selector

  this.images = Array.from(gallery.querySelectorAll('img'));
  // only one modal at a time so document is right scope here
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // this is the PROTOTYPE way of coding
  // !!bind our methods to the instance when we need them
  // create an instance property of the same prototype function,...
  // but now it's bound with this!
  // doing it at this scope, allows them to be removed later
  // BIND this keyword to each prototypal method
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // event listeners

  this.images.forEach((image) =>
    image.addEventListener('click', (event) =>
      this.showImage(event.currentTarget)
    )
  );

  // loop over each image
  this.images.forEach((image) =>
    // attach an event listener for each image
    image.addEventListener('keyup', (event) => {
      // when that is keyup, check if it was enter
      if (event.key === 'Enter') {
        // if it was enter, show the current image
        this.showImage(event.currentTarget);
      }
    })
  );

  this.modal.addEventListener('click', this.handleClickOutside);
}

// set each of these to live on the prototype
// chunk functionality into a bunch of little functions
// open / close / show / event listens / add and remove event listeners

// need to declare this outside, to manage prev and next

Gallery.prototype.openModal = function () {
  // console.info('Opening Modal...');
  // first check if the modal is already open
  // to avoid unnecessarily triggering animations
  if (this.modal.matches('.open')) {
    console.info('modal already open..');
    return; // stop it from running
  }
  // add class to open
  this.modal.classList.add('open');

  // event listeners to bind on modal open
  window.addEventListener('keyup', this.handleKeyUp);

  // whenever you pass a callback to an event listener, ...
  // THIS will be equal to whatever is to the left of the dot
  // in this case, we want to get around that
  // adding an arrow function makes another function that must be removed later
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  // add listeners for clicks and keyboard...

  // event listeners to unbind on close
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function (event) {
  // if the thing they clicked is exactly the same as what we're listening to..
  // then match and execute
  if (event.target === event.currentTarget) {
    // console.info('Closing modal...');
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (event) {
  // small PERFormace point
  // add a return here to each line to stop unnecessarily checking for other keys
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showNextImage = function () {
  // how do we know the next image?
  // get the currentImage! which we set above.
  // make it wrap back to the first element if there are none left

  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function () {
  // how do we know the next image?
  // get the currentImage! which we set above.
  // make it wrap back to the first element if there are none left
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function (element) {
  // sometimes these functions can run accidentally... so its good to do safety checks
  if (!element) {
    console.info('no image to show');
  }
  // update modal with this info
  console.log(element);
  this.modal.querySelector('img').src = element.src;
  this.modal.querySelector('h2').textContent = element.title;
  // custom property 'description' under data attribute
  this.modal.querySelector('figure p').textContent =
    element.dataset.description;
  this.currentImage = element;
  this.openModal();
};

// Use it on the page

// without new, it doesn't return anything
// with NEW, it returns an instance of the gallery automatically
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
