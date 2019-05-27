import React from 'react'

// Have to be test through cypress carousel
describe('Carousel Component', () => {
  describe('useCarouselResizeObserver', () => {
    it('return containerWidth width equal size of containerRef when observer initialise', (done) => {
      // Insert mock function of jest
      let spyFunctionOfContainerWidthChange = null
      const promiseObserverHasBeenCalled = null
      cy.visit('localhost:3000', {
        // Hook to call
        onBeforeLoad(win) {
          // Setup Test
          const promiseObserverHasBeenCalled = new Promise((resolve) => {
            win.observerHasBeenCalled = resolve
          })
          win.spyFunctionOfContainerWidthChange = () => { }
          spyFunctionOfContainerWidthChange = cy.spy(win, 'spyFunctionOfContainerWidthChange')

          // Assert
          promiseObserverHasBeenCalled.then(() => {
            expect(spyFunctionOfContainerWidthChange).calledWith(1000)
            done()
          })
        }
      })
    })

    it('return containerWidth width equal size of containerRef when page resize', (done) => {
      // Insert mock function of jest
      let spyFunctionOfContainerWidthChange = null
      const promiseObserverHasBeenCalled = null
      cy.visit('localhost:3000')

      // Hook to call
      // Setup Test
      cy.window().then(() => {
        const promiseObserverHasBeenCalled = new Promise((resolve) => {
          win.observerHasBeenCalled = resolve
        })
        win.spyFunctionOfContainerWidthChange = () => { }
        spyFunctionOfContainerWidthChange = cy.spy(win, 'spyFunctionOfContainerWidthChange')

        // Start resize layout
        cy.viewport(1000, 1000)

        // start assert, wait for resize observer to kick in
        promiseObserverHasBeenCalled.then(() => {
          expect(spyFunctionOfContainerWidthChange).calledWith(1000)
          done()
        })

      })
    })
  })
})