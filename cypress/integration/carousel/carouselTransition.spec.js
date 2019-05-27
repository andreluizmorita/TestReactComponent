/// <reference types="Cypress" />

describe('Carousel Component', () => {
  describe('Transition', () => {
    it('Translate from 1st slide to 2nd slide when press next arrow', () => {
      cy.visit('http://localhost:3000')
      // Wait for react to render
      cy.getByTestId('rightCarouselArrowButton').click()
      // Wait 150s + 500s (transition of animation)
      cy.wait(650)

      // Promisify it
      cy.window().then(window => {
        // Assert Image 2 must inside viewport
        const image2SearchResults = Cypress.$('[data-testid="Image2"]')
        const image2 = image2SearchResults[0]
        const image2BoundingBox = image2.getBoundingClientRect()

        expect(image2BoundingBox.left).to.be.least(0)
        expect(image2BoundingBox.right).to.be.least(0)
        expect(image2BoundingBox.left).to.be.at.most(window.innerWidth+1)
        expect(image2BoundingBox.right).to.be.at.most(window.innerWidth+1)
      })
    })

    it('translate from 4rd slide to 3rd when press prev arrow', () => {
      cy.visit('http://localhost:3000')
      // Wait for react to render
      cy.getByTestId('rightCarouselArrowButton').click()
      cy.getByTestId('rightCarouselArrowButton').click()
      cy.getByTestId('rightCarouselArrowButton').click()
      cy.getByTestId('leftCarouselArrowButton').click()

      // Wait 150s + 500s (transition of animation)
      cy.wait(650)

      // Promisify it
      cy.window().then(window => {
        // Assert Image 2 must inside viewport
        const image3SearchResults = Cypress.$('[data-testid="Image3"]')
        const image3 = image3SearchResults[0]
        const image3BoundingBox = image3.getBoundingClientRect()


        expect(image3BoundingBox.left).to.be.least(0)
        expect(image3BoundingBox.right).to.be.least(0)
        expect(image3BoundingBox.left).to.be.at.most(window.innerWidth+1)
        expect(image3BoundingBox.right).to.be.at.most(window.innerWidth+1)
      })
    })

    it('Translate from 1st slide to the last slide when press prev arrow', () => {
      cy.visit('http://localhost:3000')
      // Wait for react to render
      cy.getByTestId('leftCarouselArrowButton').click()
      // Wait 150s + 500s (transition of animation)
      cy.wait(650)

      // Promisify it
      cy.window().then(window => {
        // Assert Image 6 must inside viewport
        const image2SearchResults = Cypress.$('[data-testid="Image6"]')
        const image6 = image2SearchResults[0]
        const image6BoundingBox = image6.getBoundingClientRect()

        expect(image6BoundingBox.left).to.be.least(0)
        expect(image6BoundingBox.right).to.be.least(0)
        expect(image6BoundingBox.left).to.be.at.most(window.innerWidth+1)
        expect(image6BoundingBox.right).to.be.at.most(window.innerWidth+1)
      })
    })

    it('Translate from the last slide to the first slide when press right arrow', () => {
      cy.visit('http://localhost:3000')

      // Go image at index 6
      for (let i = 0; i < 5; i++) {
        cy.getByTestId('rightCarouselArrowButton').click()
      }

      // Press the next button
      cy.getByTestId('rightCarouselArrowButton').click()

      // Wait 150s + 500s (transition of animation)
      cy.wait(650)

      // Promisify it
      cy.window().then(window => {
        // Assert Image 2 must inside viewport
        const image1SearchResults = Cypress.$('[data-testid="Image1"]')
        const image1 = image1SearchResults[0]
        const image1BoundingBox = image1.getBoundingClientRect()

        expect(image1BoundingBox.left).to.be.least(0)
        expect(image1BoundingBox.right).to.be.least(0)
        expect(image1BoundingBox.left).to.be.at.most(window.innerWidth+1)
        expect(image1BoundingBox.right).to.be.at.most(window.innerWidth+1)
      })
    })
  })
})