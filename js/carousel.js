//Notes:
//make sure to have conditional "if slides exist then.... otherwise dont exec"

export default class Carousel {
  constructor(el) {
    this.el = el;
    this.setVars();
    this.bindEvents();
    this.setUp();
  }

  setVars() {
    this.track = this.el.querySelector(".carousel__track");
    this.slides = [...this.el.querySelectorAll(".carousel__slide")];
    this.nextButton = this.el.querySelector(".carousel__btn--right");
    this.prevButton = this.el.querySelector(".carousel__btn--left");
    this.dotsNav = this.el.querySelector(".carousel__nav");
    this.dots = [];
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    // make into attribute
    this.currentSlide = this.track.querySelector(".current-slide");
  }

  setUp() {
    this.setSlidePosition();
    this.populateDots();
    this.moveToSlide(this.slides[0]);
    // this.updateDots();
    this.hideShowArrows();
  }

  bindEvents() {
    this.prevButton.addEventListener(
      "click",
      this.handlePrevBtnClick.bind(this)
    );
    this.nextButton.addEventListener(
      "click",
      this.handleNextBtnClick.bind(this)
    );
    this.dotsNav.addEventListener("click", this.handleDotClick.bind(this));
  }

  //Arrange slides next to each other because they are already stacked on top of each other.
  //look at each slide and index # with a function.
  setSlidePosition() {
    this.slides.forEach((slide, i) => {
      slide.style.left = this.slideWidth * i + "px";
    });
  }

  //Populate indicator dots.
  populateDots() {
    this.dotsNav.innerHTML = "";
    // const fragment = document.createDocumentFragment();

    this.slides.forEach((_, slide) => {
      const dot = document.createElement("button");
      //add setAttribute
      dot.setAttribute("aria-label", "Slide " + (slide + 1));
      dot.classList.add("carousel__indicator");

      if (slide === 0) {
        dot.classList.add("current-slide");
      }

      // 1. Add to DOM.
      this.dotsNav.appendChild(dot);
      // fragment.appendChild(dot);

      // 2. And push reference to array.
      this.dots.push(dot);
    });

    // dotsNav.appendChild(fragment);

    //change to current-dot attribute
    this.currentDot = this.dotsNav.querySelector(".current-slide");
  }

  moveToSlide(targetSlide) {
    this.track.style.transform = "translateX(-" + targetSlide.style.left + " )";
    this.currentSlide.classList.remove("current-slide");
    this.currentSlide.setAttribute("aria-hidden", true);
    targetSlide.classList.add("current-slide");
    targetSlide.removeAttribute("aria-hidden");

    this.currentSlide = targetSlide;
  }

  updateDots(targetDot) {
    this.currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");

    this.currentDot = targetDot;
  }

  hideShowArrows(targetIndex) {
    if (targetIndex === 0) {
      this.prevButton.classList.add("hidden");
      this.nextButton.classList.remove("hidden");
    } else if (targetIndex === this.slides.length - 1) {
      this.prevButton.classList.remove("hidden");
      this.nextButton.classList.add("hidden");
    } else {
      this.prevButton.classList.remove("hidden");
      this.nextButton.classList.remove("hidden");
    }
  }

  //Move slides left on click
  handlePrevBtnClick = e => {
    //Set current and next slides.
    // const currentSlide = this.track.querySelector(".current-slide");
    const prevSlide = this.currentSlide.previousElementSibling;
    // const currentDot = this.dotsNav.querySelector(".current-slide");
    const prevDot = this.currentDot.previousElementSibling;
    const prevIndex = this.slides.findIndex(slide => slide === prevSlide);

    this.moveToSlide(prevSlide);
    this.updateDots(prevDot);
    this.hideShowArrows(prevIndex);
  };

  //Move slides right on click
  handleNextBtnClick = e => {
    //Set current and next slides.
    // const currentSlide = this.track.querySelector(".current-slide");
    const nextSlide = this.currentSlide.nextElementSibling;
    console.log(nextSlide);
    // const currentDot = this.dotsNav.querySelector(".current-slide");
    const nextDot = this.currentDot.nextElementSibling;
    const nextIndex = this.slides.findIndex(slide => slide === nextSlide);
    console.log(nextIndex);

    this.moveToSlide(nextSlide);
    this.updateDots(nextDot);
    this.hideShowArrows(nextIndex);
  };

  //Move slides to target dot index.
  handleDotClick = e => {
    const targetDot = e.target.closest("button");
    // const targetDot = e.target.nodeName;

    if (!targetDot) return;
    // if(targetDot !== 'BUTTON') return;

    // const currentSlide = this.track.querySelector(".current-slide");
    // const currentDot = this.dotsNav.querySelector(".current-slide");

    //findIndex acts like a for loop and returns index number of targetDot
    const targetIndex = this.dots.findIndex(dot => dot === targetDot);
    console.log(targetIndex);
    const targetSlide = this.slides[targetIndex];
    console.log(targetSlide);

    this.moveToSlide(targetSlide);
    this.updateDots(targetDot);
    this.hideShowArrows(targetIndex);
  };
}
