describe('Newsletter Popup - SellifyWorks Specific', () => {
  // Helper function to force show popup
  const forceShowPopup = () => {
    cy.window().then((win) => {
      win.localStorage.removeItem('newsletterPopupSeen')
      const event = new win.KeyboardEvent('keydown', {
        ctrlKey: true,
        shiftKey: true,
        key: 'N'
      })
      win.dispatchEvent(event)
    })
  }

  beforeEach(() => {
    cy.visit('/')
    // Clear localStorage before each test
    cy.clearLocalStorage()
  })

  it('should show popup after 3 seconds when not seen before', () => {
    // Wait for the 3-second timer
    cy.wait(3500)
    
    // Check if popup is visible by looking for specific elements
    cy.get('input[placeholder="tu@email.com"]').should('be.visible')
    cy.get('button').contains('Suscribirme Gratis').should('be.visible')
  })

  it('should force show popup with Ctrl+Shift+N', () => {
    forceShowPopup()
    cy.get('input[placeholder="tu@email.com"]').should('be.visible')
  })

  it('should close popup with X button', () => {
    forceShowPopup()
    
    // Wait for newsletter popup specifically (z-50) to be visible
    cy.get('.fixed.inset-0.z-50').should('be.visible')
    
    // Click the close button in the newsletter popup
    cy.get('.fixed.inset-0.z-50 button.absolute.top-4.right-4').should('be.visible').click()
    
    // Newsletter popup should be gone
    cy.get('.fixed.inset-0.z-50').should('not.exist')
  })

  it('should subscribe with valid email and show success message', () => {
    // Mock successful subscription
    cy.intercept('POST', '/api/newsletter', {
      statusCode: 200,
      body: { 
        message: 'Suscripción exitosa',
        success: true 
      }
    }).as('successfulSubscription')

    forceShowPopup()
    
    // Be more specific - target the newsletter popup input only
    cy.get('.fixed.inset-0.z-50 input[placeholder="tu@email.com"]').type('test@sellifyworks.com')
    cy.get('.fixed.inset-0.z-50 button').contains('Suscribirme Gratis').click()
    
    cy.wait('@successfulSubscription')
    
    // Check for success state - wait for content to be visible
    // The component shows successMessage instead of "BIENVENIDO A BORDO" when API returns success
    cy.contains('Revisa tu email para confirmar tu suscripción', { timeout: 10000 }).should('be.visible')
    cy.get('.bg-green-500', { timeout: 5000 }).should('be.visible') // Success icon
  })

  it('should handle already subscribed email', () => {
    // Mock API response for already subscribed
    cy.intercept('POST', '/api/newsletter', {
      statusCode: 200,
      body: { 
        message: 'Ya estás suscrito a nuestra newsletter',
        success: true 
      }
    }).as('alreadySubscribed')

    forceShowPopup()
    
    // Fill email and submit - be specific to newsletter popup
    cy.get('.fixed.inset-0.z-50 input[placeholder="tu@email.com"]').type('existing@example.com')
    cy.get('.fixed.inset-0.z-50 button').contains('Suscribirme Gratis').click()
    
    cy.wait('@alreadySubscribed')
    
    // Should show already subscribed message
    cy.contains('Ya estás suscrito a nuestra newsletter', { timeout: 5000 }).should('be.visible')
    cy.contains('No te preocupes, ya recibes nuestros consejos exclusivos').should('be.visible')
  })

  it('should auto-close popup after successful subscription', () => {
    // Mock successful subscription
    cy.intercept('POST', '/api/newsletter', {
      statusCode: 200,
      body: { 
        message: 'Suscripción exitosa',
        success: true 
      }
    }).as('successfulSubscription')

    forceShowPopup()
    
    // Subscribe - be specific to newsletter popup
    cy.get('.fixed.inset-0.z-50 input[placeholder="tu@email.com"]').type('autoclose@test.com')
    cy.get('.fixed.inset-0.z-50 button').contains('Suscribirme Gratis').click()
    
    cy.wait('@successfulSubscription')
    
    // Should auto-close after 4 seconds (your setTimeout is 4000ms)
    cy.wait(4500)
    cy.get('.fixed.inset-0.z-50').should('not.exist')
  })

  it('should not show popup again after being dismissed', () => {
    forceShowPopup()
    cy.get('.fixed.inset-0.z-50 button.absolute.top-4.right-4').click()
    
    // Reload page
    cy.reload()
    cy.wait(4000) // Wait longer than popup timer
    
    // Newsletter popup should not appear
    cy.get('.fixed.inset-0.z-50').should('not.exist')
  })

  it('should show correct branding and styling', () => {
    forceShowPopup()
    
    // Wait for newsletter popup specifically to be fully visible
    cy.get('.fixed.inset-0.z-50').should('be.visible').within(() => {
      cy.contains('NO TE PIERDAS NUESTROS CONSEJOS').should('be.visible')
      cy.contains('Shopify').should('be.visible')
      cy.contains('e-commerce').should('be.visible')
      cy.contains('No spam').should('be.visible')
    })
    
    // Check for proper styling classes (Tailwind) - these should be within the newsletter popup
    cy.get('.fixed.inset-0.z-50 .bg-gradient-to-r').should('exist') // Gradient background
    cy.get('.fixed.inset-0.z-50 .from-black').should('exist') // Black to cyan gradient
    cy.get('.fixed.inset-0.z-50 .to-cyan-500').should('exist')
  })
})
