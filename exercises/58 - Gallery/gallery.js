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

  // Select the elements we need and arrayify to interact with
  // need to scope to the element passed in from the selector
  const images = Array.from(gallery.querySelectorAll('img'));
  // only one modal at a time so document is right scope here
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');

  // chunk functionality into a bunch of little functions
  // open / close / show / event listens / add and remove event listeners

  // need to declare this outside, to manage prev and next
  let currentImage;

  function openModal() {
    // console.info('Opening Modal...');
    // first check if the modal is already open
    // to avoid unnecessarily triggering animations
    if (modal.matches('.open')) {
      console.info('modal already open..');
      return; // stop it from running
    }
    // add class to open
    modal.classList.add('open');

    // event listeners to bind on modal open
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // add listeners for clicks and keyboard...

    // event listeners to unbind on close
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(event) {
    // if the thing they clicked is exactly the same as what we're listening to..
    // then match and execute
    if (event.target === event.currentTarget) {
      // console.info('Closing modal...');
      closeModal();
    }
  }

  function handleKeyUp(event) {
    // small PERFormace point
    // add a return here to each line to stop unnecessarily checking for other keys
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    // how do we know the next image?
    // get the currentImage! which we set above.
    // make it wrap back to the first element if there are none left
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    // how do we know the next image?
    // get the currentImage! which we set above.
    // make it wrap back to the first element if there are none left
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(element) {
    // sometimes these functions can run accidentally... so its good to do safety checks
    if (!element) {
      console.info('no image to show');
    }
    // update modal with this info
    console.log(element);
    modal.querySelector('img').src = element.src;
    modal.querySelector('h2').textContent = element.title;
    // custom property 'description' under data attribute
    modal.querySelector('figure p').textContent = element.dataset.description;
    currentImage = element;
    openModal();
  }

  // event listeners

  images.forEach((image) =>
    image.addEventListener('click', (event) => showImage(event.currentTarget))
  );

  // loop over each image
  images.forEach((image) =>
    // attach an event listener for each image
    image.addEventListener('keyup', (event) => {
      // when that is keyup, check if it was enter
      if (event.key === 'Enter') {
        // if it was enter, show the current image
        showImage(event.currentTarget);
      }
    })
  );

  modal.addEventListener('click', handleClickOutside);
}

// use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
