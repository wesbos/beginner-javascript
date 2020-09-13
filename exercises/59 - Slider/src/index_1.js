function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error("no slider was passed in");
  }
  let previous;
  let current;
  let next;

  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".goToPrev");
  const nextButton = slider.querySelector(".goToNext");

  function startSlider() {
    current = slider.querySelector(".current") || slides.firstElementChild;
    previous = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, previous, next });
  }

  function applyClasses() {
    current.classList.add("current");
    previous.classList.add("prev");
    next.classList.add("next");
  }

  function move(direction) {
    const classesToRemove = ["current", "prev", "next"];
    previous.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === "back") {
      [previous, current, next] = [
        previous.previousElementSibling || slides.lastElementChild,
        previous,
        current,
      ];
    } else {
      [previous, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }

  startSlider();
  applyClasses();

  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
}

const mySlider = Slider(document.querySelector(".slider"));
const dogSlider = Slider(document.querySelector(".dog-slider"));
