describe('Blog Tests', () => {
  beforeEach(() => {
    // Visit the posts page (your actual blog route)
    cy.visit('/posts')
  })

  it('should load the blog page successfully', () => {
    cy.get('body').should('be.visible')
    cy.url().should('include', '/posts')
  })

  it('should display blog posts', () => {
    // Check if there are blog posts displayed
    cy.get('body').should('contain.text', 'More Stories')
    
    // Look for post previews - they are divs, not articles in this implementation
    cy.get('h3').should('have.length.greaterThan', 0) // Post titles
    cy.get('a[href*="/posts/"]').should('have.length.greaterThan', 0) // Post links
  })

  it('should be able to read a blog post', () => {
    // Find blog post links and verify they exist with correct hrefs
    cy.get('a[href*="/posts/"]').should('have.length.greaterThan', 0)
    
    // Get the first post slug and navigate directly to test individual post loading
    cy.get('a[href*="/posts/"]').first().then(($link) => {
      const href = $link.attr('href')
      if (href) {
        cy.visit(href)
        
        // Should be on individual post page
        cy.url().should('match', /\/posts\/.+/)
        cy.get('h1').should('be.visible')
        cy.get('body').should('be.visible')
      }
    })
  })

  it('should display post metadata', () => {
    // Click on a blog post using post title link
    cy.get('a[href*="/posts/"]').first().click()
    
    // Check for post metadata like date and author - be more specific
    cy.get('time[dateTime]').should('exist') // Date element exists
    cy.get('body').should('contain.text', 'March') // Month in the date
  })

  it('should have working navigation back to home', () => {
    // Look for the logo/brand that links to home - be more specific and wait
    cy.get('a[href="/"]').contains('SELLIFYWORKS').should('be.visible').click()
    
    // Wait for navigation to complete
    cy.wait(1000)
    
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-6')
    cy.get('body').should('be.visible')
    cy.get('h1').should('be.visible')
  })
})
