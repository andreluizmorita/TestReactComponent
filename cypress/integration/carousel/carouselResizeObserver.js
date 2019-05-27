import promisify from 'cypress-promise'

/// <reference types="Cypress" />
describe('Carousel Component', () => {
  describe('Resize Observer', () => {
    it('Render container of child cotainer equal the width of wrapper container (that wrap carousel component)', async () => {
      cy.visit('http://localhost:3000')
      cy.viewport(1920, 1080)
      cy.wait(200)
      cy.getByTestId('testCarouselContainer').then(elem => {
        const carouselContainerWidth = elem[0].clientWidth
        cy.getAllByTestId('testCarouselContainer').then(carouselChildContainers => {
          for (let carouselChildContainer of carouselChildContainers) {
            expect(carouselChildContainer.clientWidth).to.be.equal(carouselContainerWidth)
          }
        })
      })
    })

    it('Render container of child cotainer equal the width of wrapper container (that wrap carousel component) - Resize version', async () => {
      cy.visit('http://localhost:3000')
      cy.viewport(1920, 1080)
      // Give obersve resizer some time for react
      cy.wait(100)
      cy.viewport(800, 1600)
      cy.wait(250)

      const elem = await promisify(cy.getByTestId('testCarouselContainer'))
      const carouselContainerWidth = elem[0].clientWidth
      cy.getAllByTestId('testCarouselContainer').then(carouselChildContainers => {
        for (let carouselChildContainer of carouselChildContainers) {
          expect(carouselChildContainer.clientWidth).to.be.equal(carouselContainerWidth)
          expect(carouselChildContainer.clientWidth).to.be.equal(800)
        }
      })
    })
  })
})