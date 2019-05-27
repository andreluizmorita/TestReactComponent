import {
  useState,
  useEffect,
  useMemo, 
} from 'react'

export default ({
  childrenLength,
  initialImageIndex = 0,
  numDisplayPaginator,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(initialImageIndex)
  }, [initialImageIndex])

  const endOfTheLeftMiddle = useMemo(() => {
    return (numDisplayPaginator / 2) + 1
  }, [numDisplayPaginator])

  const minDisplayPaginatorIndex = useMemo(() => {
    // * Case 1: index in 1 -> (numDisplayPaginator/ 2)
    if (1 >= currentImageIndex && currentImageIndex <= endOfTheLeftMiddle) {
      return 0
    }

    // * Case 2: index + 1 > (numDisplayPaginator / 2)
    let offset = currentImageIndex - endOfTheLeftMiddle
    let maxDisplayPaginatorIndex = offset + numDisplayPaginator

    if (maxDisplayPaginatorIndex >= childrenLength) {
      offset -= (maxDisplayPaginatorIndex - childrenLength)
    }

    return 1 + offset
  }, [childrenLength, currentImageIndex, endOfTheLeftMiddle, numDisplayPaginator])

  const maxDisplayPaginatorIndex = useMemo(() => {
    // * Case 1: index in 1 -> (numDisplayPaginator/ 2)
    if (1 >= currentImageIndex && currentImageIndex <= (numDisplayPaginator)) {
      return numDisplayPaginator
    }

    // * Case 2: index + 1 > (numDisplayPaginator / 2)
    const offset = currentImageIndex - endOfTheLeftMiddle
    let maxDisplayPaginatorIndex = offset + numDisplayPaginator

    if (maxDisplayPaginatorIndex >= childrenLength) {
      maxDisplayPaginatorIndex = childrenLength
    }

    return maxDisplayPaginatorIndex
  }, [childrenLength, currentImageIndex, endOfTheLeftMiddle, numDisplayPaginator])

  return {
    currentImageIndex,
    setCurrentImageIndex,
    maxDisplayPaginatorIndex,
    minDisplayPaginatorIndex,

    // Testing purpose
    endOfTheLeftMiddle
  }
}