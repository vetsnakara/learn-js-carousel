const carousel = document.querySelector('.carousel')

const contents = carousel.querySelector('.carousel__contents')
const prevButton = carousel.querySelector('.prev-button')
const nextButton = carousel.querySelector('.next-button')
const slides = Array.from(carousel.querySelectorAll('.carousel__slide'))
const dotsContainer = carousel.querySelector('.carousel__dots')
const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))

slides.forEach((slide, i) => {
  const width = slide.getBoundingClientRect().width
  slide.style.left = i * width + 'px'
})

// click prev button
prevButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const prevSlide = currentSlide.previousElementSibling
  const destination = getComputedStyle(prevSlide).left

  // move slide
  contents.style.transform = `translateX(-${destination})`

  // set current slide
  currentSlide.classList.remove('is-selected')
  prevSlide.classList.add('is-selected')

  // show next button
  nextButton.removeAttribute('hidden')

  // hide prev button for first slide
  if (!prevSlide.previousElementSibling) {
    prevButton.setAttribute('hidden', true)
  }

  // highlight prev dot
  const currentDot = dotsContainer.querySelector('.is-selected')
  const prevDot = currentDot.previousElementSibling
  currentDot.classList.remove('is-selected')
  prevDot.classList.add('is-selected')
})

// click next button
nextButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling
  const destination = getComputedStyle(nextSlide).left;

  // move slide
  contents.style.transform = `translateX(-${destination})`

  // set current slide
  currentSlide.classList.remove('is-selected')
  nextSlide.classList.add('is-selected')

  // show prev button
  prevButton.removeAttribute('hidden')

  // hide next button for last slide
  if (!nextSlide.nextElementSibling) {
    nextButton.setAttribute('hidden', true)
  }

  // highlight next dot
  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling;
  currentDot.classList.remove('is-selected')
  nextDot.classList.add('is-selected')
})

// click on dot
dotsContainer.addEventListener('click', e => {
  const dot = e.target
  const isDotClicked = dot.matches('.carousel__dot');

  if (isDotClicked) {
    // get index of clicked dot
    let index;
    for (let i = 0; i < dots.length; i++) {
      if (dots[i] === dot) {
        index = i;
        break;
      }
    }

    // move slide
    const slideToShow = slides[index]
    const destination = getComputedStyle(slideToShow).left

    contents.style.transform = `translateX(-${destination})`

    // set selected dot
    dots.forEach(dot => dot.classList.remove('is-selected'))
    dot.classList.add('is-selected')

    // set current slide
    slides.forEach(slide => slide.classList.remove('is-selected'))
    slideToShow.classList.add('is-selected')

    // show/hide buttons
    if (index === 0) {
      nextButton.removeAttribute('hidden')
      prevButton.setAttribute('hidden', true)
    } else if (index === dots.length - 1) {
      nextButton.setAttribute('hidden', true)
      prevButton.removeAttribute('hidden')
    } else {
      prevButton.removeAttribute('hidden')
      nextButton.removeAttribute('hidden')
    }
  }
})