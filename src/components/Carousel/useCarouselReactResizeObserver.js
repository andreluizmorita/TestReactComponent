import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'

// Using debouncek
import debounce from 'debounce'


import ResizeObserver from 'resize-observer-polyfill';

export default ({
  containerRef,
  childrenLength
}) => {
  const [containerWidth, setContainerWidth] = useState()

  const onContainerWidthChange = useCallback(debounce((width) => {
    setContainerWidth(width)
  }, 200), [])

  const observer = useMemo(() => {
    const observer = ResizeObserver
    return new observer((entries) => {
      if(global.spyFunctionOfContainerWidthChange && global.observerHasBeenCalled) {
        global.spyFunctionOfContainerWidthChange(entries[0].target.clientWidth)
        global.observerHasBeenCalled()
      }
      
      onContainerWidthChange(entries[0].target.clientWidth)
    }, [])
// eslint-disable-next-line
  }, [])
// eslint-enable-next-line

  useEffect(() => {
    observer.observe(containerRef.current)
    // console.log(containerRef.current);
    
    return () => observer.unobserve(containerRef.current)
  }, [containerRef, observer])

  const widthOfInnerContainer = useMemo(() => {
    return containerWidth * childrenLength
  }, [containerWidth ,childrenLength])


  return {
    widthOfInnerContainer,
    containerWidth
  }
}