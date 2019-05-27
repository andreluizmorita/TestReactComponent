import { renderHook, act } from 'react-hooks-testing-library'
import useCarouseImageIndex from '../../components/Carousel/useCarouseSetImageIndex'

describe('useCarouseImageIndex', () => {
  it('return correct end of the left middle of display paginator number', () => {
    const { result } = renderHook(() => useCarouseImageIndex({
      childrenLength: 100,
      initialImageIndex: 0,
      numDisplayPaginator: 10
    }))

    expect(result.current.endOfTheLeftMiddle).toBe(6)
  })

  describe('currentImageIndex in range between 0 and (numDisplayPaginator / 2)', () => {
    it('return minDisplayPaginatorIndex = 1 and minDisplayPaginatorIndex = numDisplayPaginator, set currentImageIndex', () => {
      const { result } = renderHook(() => useCarouseImageIndex({
        childrenLength: 100,
        initialImageIndex: 0,
        numDisplayPaginator: 10
      }))

      result.current.setCurrentImageIndex(0)
      expect(result.current.minDisplayPaginatorIndex).toBe(0)
      expect(result.current.maxDisplayPaginatorIndex).toBe(10)
      expect(result.current.currentImageIndex).toBe(0)
    })
  })

  describe('currentImageIndex not in range between 0 and (numDisplayPaginator / 2)', () => {
    describe('if offset = (numDisplayPaginator / 2) - index, offset < maxPaginateNumber', () => {
      it('return min = 1 + offset, max = paginateNumber + offset', () => {
        const { result } = renderHook(() => useCarouseImageIndex({
          childrenLength: 100,
          initialImageIndex: 0,
          numDisplayPaginator: 10
        }))

        result.current.setCurrentImageIndex(12)
        expect(result.current.minDisplayPaginatorIndex).toBe(7)
        expect(result.current.maxDisplayPaginatorIndex).toBe(16)
        expect(result.current.currentImageIndex).toBe(12)
      })
    })

    describe('if offset = (numDisplayPaginator / 2) - index, offset > maxPaginateNumber', () => {
      it('return min = 1 + offset, max = paginateNumber + offset', () => {
        const { result } = renderHook(() => useCarouseImageIndex({
          childrenLength: 11,
          initialImageIndex: 0,
          numDisplayPaginator: 10
        }))

        result.current.setCurrentImageIndex(10)
        expect(result.current.minDisplayPaginatorIndex).toBe(2)
        expect(result.current.maxDisplayPaginatorIndex).toBe(11)
        expect(result.current.currentImageIndex).toBe(10)
      })
    })
  })
})