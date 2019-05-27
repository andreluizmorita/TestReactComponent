
// Find children container
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'

import useCarouselReactResizeObserver from './useCarouselReactResizeObserver'
import useCarouseSetImageIndex from './useCarouseSetImageIndex'

import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

// Using css module
import carouselStyle from './style.module.css'


/**
 * Todo
 * 
 * Integrate react/jest and tailwind
 * Move source code ito study css
 * 
 * Caculate the dot
 * Render the dot
 * Render the arrow
 * Dnd feature
 * 
 * Check
 * React Icon
 */

const {
  container,
  innerContainer,
  childContainer,
  arrowButton,
  arrowButtonRight
} = carouselStyle

const Carousel = ({
  currentFocusImageIndex,
  onChangeNext,
  onChangePrev,
  children = [],
}) => {
  const containerRef = useRef()

  const { widthOfInnerContainer, containerWidth } = useCarouselReactResizeObserver({
    containerRef,
    childrenLength: children.length
  })

  const {
    setCurrentImageIndex,
    currentImageIndex,
  } = useCarouseSetImageIndex({
    childrenLength: children.length,
    displayPaginator: 10,
  })

  // Handle dnd
  const arrowRightClick = () => {
    // From the item in last index move backward 1 item
    if (currentImageIndex === children.length-1) {
      setCurrentImageIndex(0)
      return
    }

    setCurrentImageIndex(currentImageIndex + 1)
  }

  const arrowLeftOnClick = () => {
    // From the item index 0 move backward 1 item
    if (currentImageIndex === 0) {
      setCurrentImageIndex(children.length - 1)
      return
    }

    setCurrentImageIndex(currentImageIndex-1)
  }

  // Expose data out for testing process
  if (process.env.REACT_APP_IS_TEST_MODE === 'true') {
    global.exposedCarouselComponentData = {
      arrowLeftOnClick,
      arrowRightClick,
      currentImageIndex
    }
  }

  return (
    // Copy div from outter container and watch for size change
    <div className={innerContainer} ref={containerRef}>
      {/* Arrow */}
      <button data-testid="leftCarouselArrowButton" className={arrowButton} onClick={arrowLeftOnClick}>
        <FaChevronLeft size="25" color="white" />
      </button>
      <button data-testid="rightCarouselArrowButton" className={[arrowButton, arrowButtonRight].join(' ')} onClick={arrowRightClick}>
        <FaChevronRight size="25" color="white" />
      </button>

      {/* Use for transit slide */}
      <div
        data-testid="carouselContainer"
        className={container}
        style={{
          width: widthOfInnerContainer,
          transform: `translateX(-${currentImageIndex * containerWidth}px)`
        }}>
        {/* slide container */}
        {children.map(element => (
          <div
            data-testid="CarouselChildContainer"
            className={childContainer}
            style={{
              width: containerWidth
            }}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel