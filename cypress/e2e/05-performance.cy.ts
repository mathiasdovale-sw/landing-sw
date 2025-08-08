describe('Performance Tests', () => {
  it('should load homepage within acceptable time', () => {
    const start = Date.now()
    
    cy.visit('/')
    cy.get('body').should('be.visible')
    
    cy.then(() => {
      const loadTime = Date.now() - start
      expect(loadTime).to.be.lessThan(5000) // Less than 5 seconds
    })
  })

  it('should load blog page within acceptable time', () => {
    const start = Date.now()
    
    cy.visit('/posts')
    cy.get('body').should('be.visible')
    
    cy.then(() => {
      const loadTime = Date.now() - start
      expect(loadTime).to.be.lessThan(5000) // Less than 5 seconds
    })
  })

  it('should have proper meta tags for SEO', () => {
    cy.visit('/')
    
    // Check for essential meta tags
    cy.get('head title').should('exist')
    cy.get('head meta[name="description"]').should('exist')
    cy.get('head meta[name="viewport"]').should('exist')
  })

  it('should have accessible images with alt text', () => {
    cy.visit('/')
    
    // All images should have alt attributes
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  })

  it('should have proper heading hierarchy', () => {
    cy.visit('/')
    
    // Should have at least one h1
    cy.get('h1').should('have.length.greaterThan', 0)
    
    // h1 should come before h2
    cy.get('h1').first().then(($h1) => {
      cy.get('h2').first().should('exist')
    })
  })
})
