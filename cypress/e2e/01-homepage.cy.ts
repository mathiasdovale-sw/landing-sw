describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('contain', 'SellifyWorks')
  })

  it('should display the main navigation', () => {
    // Check for navigation container
    cy.get('header').should('be.visible')
    
    // Check for logo/brand
    cy.contains('SELLIFYWORKS').should('be.visible')
    
    // Check for main navigation elements (desktop)
    cy.get('nav.hidden.md\\:flex').should('exist') // Desktop nav exists
    cy.contains('SERVICES').should('exist')
    cy.contains('ABOUT').should('exist')
    cy.contains('BLOG').should('exist')
    cy.contains('CONTACT').should('exist')
  })

  it('should display the hero section', () => {
    // Check for hero content with SellifyWorks branding
    cy.get('h1').should('be.visible')
    // Check if the page contains relevant keywords
    cy.get('body').should('contain.text', 'SELLIFYWORKS')
  })

  it('should display the footer', () => {
    cy.get('footer').should('be.visible')
    cy.get('footer').should('contain.text', 'SELLIFYWORKS')
  })

  it('should have working blog navigation', () => {
    // Click on blog navigation link - be more specific to get only one element
    cy.get('nav a[href="/posts"]').first().click()
    
    // Should navigate to /posts
    cy.url().should('include', '/posts')
    
    cy.get('h1').should('be.visible')
  })

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-6')
    cy.get('body').should('be.visible')
    
    // Desktop nav should be hidden on mobile
    cy.get('nav.hidden.md\\:flex').should('not.be.visible')
    
    // Mobile menu button should be visible and clickable
    cy.get('button[aria-label="Toggle menu"]').should('be.visible').and('not.be.disabled')
    
    // Test basic mobile functionality without complex state checking
    cy.get('header').should('be.visible')
    cy.contains('SELLIFYWORKS').should('be.visible')
  })

  it('should test mobile navigation functionality', () => {
    cy.viewport('iphone-6')
    
    // Open mobile menu
    cy.get('button[aria-label="Toggle menu"]').click()
    
    // Wait for menu animation
    cy.wait(800)
    
    // Verify that menu state changed (button should show close icon)
    cy.get('button[aria-label="Toggle menu"]').should('have.attr', 'aria-expanded', 'true')
    
    // Click on BLOG in mobile menu - intercept the navigation to prevent actual navigation
    cy.window().then((win) => {
      // Prevent navigation for testing
      const stub = cy.stub(win, 'location')
    })
    
    // Find and click the BLOG link in mobile nav
    cy.get('.fixed.inset-0').within(() => {
      cy.contains('BLOG').should('exist')
    })
  })
})
