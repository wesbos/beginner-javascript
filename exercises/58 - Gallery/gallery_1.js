function Gallery(gallery) {
  if (!gallery) {
    throw new Error("No Gallery Found!");
  }
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const previousButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");

  let currentImage;

  function openModal() {
    console.info("opening modal");
    if (modal.matches(".open")) {
      console.info("modal is already open");
      return;
    }
    modal.classList.add("open");

    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    previousButton.addEventListener("click", showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove("open");
    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    previousButton.removeEventListener("click", showPreviousImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    switch (e.key) {
      case "Escape":
        return closeModal();
        break;

      case "ArrowLeft":
        return showPreviousImage();
        break;

      case "ArrowRight":
        return showNextImage();
        break;

      default:
        return;
    }
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(element) {
    if (!element) {
      console.info("no image to show");
      return;
    }
    console.log(element);
    modal.querySelector("img").src = element.src;
    modal.querySelector("h2").textContent = element.title;
    modal.querySelector("figure p").textContent = element.dataset.description;
    currentImage = element;
    openModal();
  }

  images.forEach((image) =>
    image.addEventListener("click", (e) => showImage(e.currentTarget))
  );

  images.forEach((image) =>
    image.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        showImage(e.currentTarget);
      }
    })
  );

  modal.addEventListener("click", handleClickOutside);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
