import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '../../App'

describe('Carousel Component', function () {
  afterEach(cleanup)
  it('arrow left handler event set currentIndex (initialised) from 1 to 2 when invoked', () => {
    const {
      getByTestId
    } = render(<App />)

    const rightArrowButton = getByTestId('rightCarouselArrowButton')
    rightArrowButton.click()

    expect(global.exposedCarouselComponentData.currentImageIndex).toBe(1)
  })

  it('arrow right handler event set currentIndex from 4 to 3 when invoked', () => {
    const {
      getByTestId
    } = render(<App />)

    const rightArrowButton = getByTestId('rightCarouselArrowButton')
    rightArrowButton.click()
    rightArrowButton.click()
    rightArrowButton.click()

    const leftArrowButton = getByTestId('leftCarouselArrowButton')
    leftArrowButton.click()

    expect(global.exposedCarouselComponentData.currentImageIndex).toBe(2)
  })

  it('arrow left handler event set currentIndex from 1 to last (6) when invoked', () => {
    const {
      getByTestId
    } = render(<App />)

    const leftArrowButton = getByTestId('leftCarouselArrowButton')
    leftArrowButton.click()

    expect(global.exposedCarouselComponentData.currentImageIndex).toBe(5)
  })

  it('arrow right handler event set currentIndex from last to 1 when invoked', () => {
    const {
      getByTestId
    } = render(<App />)

    const rightArrowButton = getByTestId('rightCarouselArrowButton')
    for (let i = 0; i < 4; i++) {
      rightArrowButton.click()
    }
    rightArrowButton.click()

    expect(global.exposedCarouselComponentData.currentImageIndex).toBe(5)
  })
})