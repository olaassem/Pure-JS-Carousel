const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__btn--right");
const prevButton = document.querySelector(".carousel__btn--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = [];

//Define the width/how big the track is:
//get size one of the slides because all slides should have the same slideWidth

// const slideSize = slides[0].getBoundingClientRect();
// const slideWidth = slideSize.width;
const slideWidth = slides[0].getBoundingClientRect().width;

//1. arrange slides next to each other because they are already stacked on top of each other:
//we can use css and flexbox to arrange them next to one another but we still need to make most of these calculations anyway
//1a. manual method
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

//1b. loop method
//look at each slide and index # with a function
//declare a named function
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
//then running the function for each of the slides
slides.forEach(setSlidePosition);

//Create indicator dots
const populateDots = (dotsNav, slides) => {
  dotsNav.innerHTML = "";

  slides.forEach((_, slide) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel__indicator");

    // Activate first indicator
    if (slide === 0) {
      dot.classList.add("current-slide");
    }

    // Add to DOM
    dotsNav.appendChild(dot);

    // and push reference to array
    dots.push(dot);
  });
};

populateDots(dotsNav, slides);

const moveToSlide = (track, currentSlide, targetSlide) => {
  //move to the next slide
  track.style.transform = "translateX(-" + targetSlide.style.left + " )";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

//when i click left, move slides left
prevButton.addEventListener("click", e => {
  //set current and next slides
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

//when i click right, move slides right
nextButton.addEventListener("click", e => {
  //set current and next slides
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

//when i click nav indicators, move to that slide
dotsNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");
  // const targetDot = e.target.nodeName;

  if (!targetDot) return;
  // if(targetDot !== 'BUTTON') return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  //findIndex acts like a for loop and returns index number of targetDot
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
