export default function carouselUtils() {
  const track = document.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel__button--right');
  const prevButton = document.querySelector('.carousel__button--left');
  const dotsNav = document.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children);
  const beginningSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const beginningDot = dots[0];
  const lastDot = dots[dots.length - 1];
  const captions = document.querySelector('.carousel__captions');
  const caption = Array.from(captions.children);
  const beginningCaption = caption[0];
  const lastCaption = caption[caption.length - 1];

  const slideSize = slides[0].getBoundingClientRect();
  const slideWidth = slideSize.width;
  //arrange the slides next to each other
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToCaption = (currentCaption, targetCaption) => {
    currentCaption.classList.remove('current-slide');
    targetCaption.classList.add('current-slide');
  };

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };

  const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');
    } else {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden');
    }
  };
  //when click right, move slides to the right
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const currentCaption = captions.querySelector('.current-slide');
    const nextCaption = currentCaption.nextElementSibling;

    if (currentIndex !== slides.length - 1) {
      //move to next slide
      moveToSlide(track, currentSlide, nextSlide);
      //move dot
      updateDots(currentDot, nextDot);
      //move caption
      moveToCaption(currentCaption, nextCaption);
    } else {
      //move to beginning slide
      moveToSlide(track, currentSlide, beginningSlide);
      //move dot
      updateDots(currentDot, beginningDot);
      //move caption
      moveToCaption(currentCaption, beginningCaption);
    }
    //restart automatic movement
    clearInterval(timer);
    setTimer(3000);
  });

  //when clickleft, move slides to the left
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const currentCaption = captions.querySelector('.current-slide');
    const prevCaption = currentCaption.previousElementSibling;

    if (currentIndex !== 0) {
      //move to previous slide
      moveToSlide(track, currentSlide, prevSlide);
      //move dot
      updateDots(currentDot, prevDot);
      //move caption
      moveToCaption(currentCaption, prevCaption);
    } else {
      //move to last slide
      moveToSlide(track, currentSlide, lastSlide);
      //move dot
      updateDots(currentDot, lastDot);
      //move caption
      moveToCaption(currentCaption, lastCaption);
    }
    clearInterval(timer);
    setTimer(3000);
  });

  //when click small navigator circle, move to that slide
  dotsNav.addEventListener('click', e => {
    //what was clicked?
    const targetDot = e.target.closest('button');

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    const currentCaption = captions.querySelector('.current-slide');
    const targetCaption = caption[targetIndex];

    if (targetDot !== null) {
      //move to target slide
      moveToSlide(track, currentSlide, targetSlide);
      //move dot
      updateDots(currentDot, targetDot);
      //move caption
      moveToCaption(currentCaption, targetCaption);
    }
    clearInterval(timer);
    setTimer(3000);
  });

  //make slide automatic
  function moveToNextSlide() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const currentCaption = captions.querySelector('.current-slide');
    const nextCaption = currentCaption.nextElementSibling;
    if (currentIndex !== slides.length - 1) {
      //move to next slide
      moveToSlide(track, currentSlide, nextSlide);
      //move dot
      updateDots(currentDot, nextDot);
      //move caption
      moveToCaption(currentCaption, nextCaption);
    } else {
      //move to beginning slide
      moveToSlide(track, currentSlide, beginningSlide);
      //move dot
      updateDots(currentDot, beginningDot);
      //move caption
      moveToCaption(currentCaption, beginningCaption);
    }
  }
  let timer = null;
  const setTimer = n => {
    timer = setInterval(moveToNextSlide, n);
  };
  //initialize automatic movement
  setTimer(3000);
}
