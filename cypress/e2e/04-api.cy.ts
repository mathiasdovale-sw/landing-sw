describe('Newsletter API Tests', () => {
  it('should accept valid email subscription', () => {
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: 'test-api@example.com'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.match(/suscrito|éxito|email|confirma/i)
    })
  })

  it('should reject invalid email format', () => {
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: 'invalid-email'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422])
      expect(response.body).to.have.property('error')
    })
  })

  it('should handle empty email', () => {
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422])
      expect(response.body).to.have.property('error')
    })
  })

  it('should handle missing email field', () => {
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422])
      expect(response.body).to.have.property('error')
    })
  })

  it('should handle already subscribed email gracefully', () => {
    const email = 'existing-subscriber@example.com'
    
    // First subscription
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { email },
      failOnStatusCode: false
    })

    // Second subscription attempt
    cy.request({
      method: 'POST',
      url: '/api/newsletter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { email },
      failOnStatusCode: false
    }).then((response) => {
      // Should handle gracefully (either 200 with message or 409)
      expect(response.status).to.be.oneOf([200, 409])
      if (response.status === 200) {
        // Accept either "already subscribed" message or "confirmation email" message
        expect(response.body.message).to.satisfy((msg: string) => {
          return msg.includes('Ya estás suscrito') || 
                 msg.includes('Te hemos enviado un email de confirmación')
        })
      }
    })
  })
})
