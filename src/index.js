const carousel = document.querySelector('.carousel')

const contents = carousel.querySelector('.carousel__contents')
const prevButton = carousel.querySelector('.prev-button')
const nextButton = carousel.querySelector('.next-button')
const slides = [...carousel.querySelectorAll('.carousel__slide')]
const dots = [...carousel.querySelectorAll('.carousel__dot')]
const dotsContainer = carousel.querySelector('.carousel__dots')

const SELECTED_CLASS = 'is-selected'

/**
 * Set initial slide positions
 */
const setSlidePositions = () => {
  slides.forEach((slide, i) => {
    const width = slide.getBoundingClientRect().width
    slide.style.left = `${i * width}px`
  })
}

/**
 * Switch slides
 * @param {Number} currentSlideIndex Current slide index
 * @param {Number} targetSlideIndex Target slide index
 */
const switchSlide = (currentSlideIndex, targetSlideIndex) => {
  const currentSlide = slides[currentSlideIndex]
  const targetSlide = slides[targetSlideIndex]

  // contents destination
  const destination = getComputedStyle(targetSlide).left

  // move contents
  contents.style.transform = `translateX(-${destination})`

  // set new current slide
  currentSlide.classList.remove(SELECTED_CLASS)
  targetSlide.classList.add(SELECTED_CLASS)
}

/**
 * Switch dots
 * @param {Number} currentSlideIndex Current slide index
 * @param {Number} targetSlideIndex Target slide index
 */
const highlightDot = (currentSlideIndex, targetSlideIndex) => {
  const currentDot = dots[currentSlideIndex]
  const targetDot = dots[targetSlideIndex]

  currentDot.classList.remove(SELECTED_CLASS)
  targetDot.classList.add(SELECTED_CLASS)
}

/**
 * Show/hide arrow buttons
 * @param {Number} clickedDotIndex 
 */
const showHideArrowButtons = clickedDotIndex => {
  if (clickedDotIndex === 0) {
    nextButton.removeAttribute('hidden')
    prevButton.setAttribute('hidden', true)
  } else if (clickedDotIndex === dots.length - 1) {
    nextButton.setAttribute('hidden', true)
    prevButton.removeAttribute('hidden')
  } else {
    prevButton.removeAttribute('hidden')
    nextButton.removeAttribute('hidden')
  }
}

/**
 * Get index of current slide
 * @returns {Number} Index of currently selected slide
 */
const getCurrentSlideIndex = () => {
  const currentSlide = contents.querySelector(`.${SELECTED_CLASS}`)
  return slides.findIndex(s => s === currentSlide)
}

// START

setSlidePositions()

// click prev button
prevButton.addEventListener('click', e => {
  const currentSlideIndex = getCurrentSlideIndex()
  const prevSlideIndex = currentSlideIndex - 1

  switchSlide(currentSlideIndex, prevSlideIndex)
  showHideArrowButtons(prevSlideIndex)
  highlightDot(currentSlideIndex, prevSlideIndex)
})

// click next button
nextButton.addEventListener('click', e => {
  const currentSlideIndex = getCurrentSlideIndex()
  const nextSlideIndex = currentSlideIndex + 1

  switchSlide(currentSlideIndex, nextSlideIndex)
  showHideArrowButtons(nextSlideIndex)
  highlightDot(currentSlideIndex, nextSlideIndex)
})

// click on dot
dotsContainer.addEventListener('click', e => {
  const dot = e.target.closest('.carousel__dot')
  if (!dot) return

  const currentSlideIndex = getCurrentSlideIndex()
  const targetSlideIndex = dots.findIndex(d => d === dot);

  switchSlide(currentSlideIndex, targetSlideIndex)
  showHideArrowButtons(targetSlideIndex)
  highlightDot(currentSlideIndex, targetSlideIndex)
})