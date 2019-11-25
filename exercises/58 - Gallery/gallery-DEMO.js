// Topics: Design Pattern
// Challenge: Add Arrows for prev/next
// Challenge: add close button

function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery Found!');
  }

  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentImage;

  function handleKeyUp(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showImage(currentImage.nextElementSibling);
    if (e.key === 'ArrowLeft') showImage(currentImage.previousElementSibling);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  function showNextImage() {
    showImage(currentImage.nextElementSibling);
  }
  function showPreviousImage() {
    showImage(currentImage.previousElementSibling);
  }

  function openModal() {
    if (modal.matches('.open')) {
      console.info('modal already open');
      return;
    }
    // listen for keys
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeyUp);
    modal.addEventListener('click', handleClickOutside);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    modal.removeEventListener('click', handleClickOutside);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPreviousImage);
  }

  function showImage(el) {
    if (!el) {
      console.info('No Image To Show');
      return;
    }
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );
  images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') showImage(e.currentTarget);
    })
  );
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
