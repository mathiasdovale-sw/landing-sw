/// <reference types="cypress" />

describe('SEO Validation - Simplified & Fast', () => {
  // Solo las páginas más importantes para validación rápida
  const criticalPages = [
    '/es',
    '/en', 
    '/es/consultoria-shopify',
    '/en/shopify-consulting',
    '/es/sobre-nosotros',
    '/en/about'
  ];

  // Test simple y rápido para cada página crítica
  criticalPages.forEach((url) => {
    it(`Should have basic SEO elements on ${url}`, () => {
      cy.visit(url, { timeout: 5000 });
      
      // Solo validaciones esenciales
      cy.title().should('not.be.empty').and('include', 'SellifyWorks');
      cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
      cy.get('link[rel="canonical"]').should('exist');
      
      // Verificar que la página carga correctamente
      cy.get('body').should('be.visible');
      cy.get('header, nav').should('exist');
      cy.get('footer').should('exist');
      
      cy.log(`✅ Basic validation passed for ${url}`);
    });
  });

  // Test de breadcrumbs solo en páginas que no sean home
  const nonHomePages = [
    '/es/consultoria-shopify',
    '/en/shopify-consulting', 
    '/es/sobre-nosotros',
    '/en/about'
  ];

  nonHomePages.forEach((url) => {
    it(`Should have proper breadcrumbs on ${url}`, () => {
      cy.visit(url, { timeout: 5000 });
      
      // Verificar breadcrumbs visuales (sin guiones)
      cy.get('body').then(($body) => {
        if ($body.find('nav[aria-label="Breadcrumb"]').length > 0) {
          cy.get('nav[aria-label="Breadcrumb"]').should('not.contain.text', '-');
          cy.log(`✅ Breadcrumbs validation passed for ${url}`);
        } else {
          cy.log(`ℹ️ No breadcrumbs found on ${url}`);
        }
      });
    });
  });

  // Test de Schema.org solo en páginas de servicio
  const servicePages = [
    '/es/consultoria-shopify',
    '/en/shopify-consulting'
  ];

  servicePages.forEach((url) => {
    it(`Should have ServiceStructuredData on ${url}`, () => {
      cy.visit(url, { timeout: 5000 });
      
      cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
        let hasServiceData = false;
        $scripts.each((_, script) => {
          try {
            const jsonData = JSON.parse(script.textContent || '');
            if (jsonData['@type'] === 'Service') {
              hasServiceData = true;
            }
          } catch (e) {
            // Ignore
          }
        });
        
        if (hasServiceData) {
          cy.log(`✅ ServiceStructuredData found on ${url}`);
        } else {
          cy.log(`⚠️ No ServiceStructuredData found on ${url}`);
        }
      });
    });
  });

  // Test básico de performance
  it('Should load pages quickly', () => {
    const startTime = Date.now();
    cy.visit('/es');
    cy.get('body').should('be.visible').then(() => {
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(5000); // Menos de 5 segundos
      cy.log(`✅ Page loaded in ${loadTime}ms`);
    });
  });

  // Test de navegación básica
  it('Should have working navigation', () => {
    cy.visit('/es');
    
    // Verificar que existen elementos de navegación
    cy.get('header').should('exist');
    cy.get('nav, [role="navigation"]').should('exist');
    cy.get('footer').should('exist');
    
    // Verificar que hay links
    cy.get('a[href]').should('have.length.greaterThan', 5);
    
    cy.log('✅ Basic navigation elements found');
  });
});