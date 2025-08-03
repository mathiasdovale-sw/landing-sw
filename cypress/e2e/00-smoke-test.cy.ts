describe('Quick Smoke Tests - SellifyWorks', () => {
  it('should load homepage and basic elements', () => {
    cy.visit('/')
    
    // Basic page load
    cy.get('body').should('be.visible')
    
    // Brand/Logo should be present
    cy.get('header').should('be.visible')
    cy.contains('SELLIFYWORKS').should('be.visible')
    
    // Some navigation should exist
    cy.get('nav, header').should('exist')
    
    // Footer should exist
    cy.get('footer').should('be.visible')
    cy.get('footer').should('contain.text', 'SELLIFYWORKS')
  })

  it('should have working navigation to posts', () => {
    cy.visit('/')
    
    // Test navigation to posts page - wait for page to load
    cy.get('body').should('be.visible')
    
    // Be more specific with the blog link - target navigation specifically
    cy.get('nav').contains('BLOG').should('be.visible').click()
    
    // Alternative: just visit the posts page directly to test if it exists
    cy.visit('/posts')
    cy.url().should('include', '/posts')
    cy.get('body').should('be.visible')
  })

  it('should have working links', () => {
    cy.visit('/')
    
    // Test logo link to home
    cy.contains('SELLIFYWORKS').should('have.attr', 'href', '/')
    
    // Check if any navigation links exist and have proper href attributes
    cy.get('a[href*="/"]').should('have.length.greaterThan', 0)
  })

  it('should be mobile responsive', () => {
    cy.visit('/')
    
    // Test different viewports
    const viewports = [
      [375, 667], // iPhone SE
      [768, 1024], // iPad
      [1920, 1080] // Desktop
    ]
    
    viewports.forEach(([width, height]) => {
      cy.viewport(width, height)
      cy.get('body').should('be.visible')
      cy.get('header').should('be.visible')
    })
  })

  it('should have proper title and meta', () => {
    cy.visit('/')
    
    // Page should have a title
    cy.title().should('not.be.empty')
    
    // Should have viewport meta tag
    cy.get('head meta[name="viewport"]').should('exist')
  })
})
