/// <reference types="cypress" />

describe('SEO and Structure Validation - Simplified', () => {
  // Solo las páginas más críticas para testing rápido
  const criticalPages = [
    { url: '/es', name: 'Home ES' },
    { url: '/en', name: 'Home EN' },
    { url: '/es/consultoria-shopify', name: 'Consultoría Shopify' },
    { url: '/en/shopify-consulting', name: 'Shopify Consulting' },
    { url: '/es/sobre-nosotros', name: 'Sobre Nosotros' },
    { url: '/en/about', name: 'About' }
  ];

  // Helper function simplificada para validar SEO básico
  const validateBasicSEO = (pageName: string) => {
    // Meta title
    cy.title().should('not.be.empty');
    cy.title().should('include', 'SellifyWorks');
    
    // Meta description
    cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
    
    // Canonical URL
    cy.get('link[rel="canonical"]').should('exist').and('have.attr', 'href');
    
    // Language attributes
    cy.get('html').should('have.attr', 'lang').and('match', /^(es|en)$/);
    
    cy.log(`✅ Basic SEO validation passed for ${pageName}`);
  };

  // Helper function para validar navegación básica
  const validateNavigation = (pageName: string) => {
    // Header/Navigation
    cy.get('header, nav').should('exist');
    
    // Footer
    cy.get('footer').should('exist');
    
    cy.log(`✅ Navigation validation passed for ${pageName}`);
  };

  // Helper function para validar breadcrumbs
  const validateBreadcrumbs = (pageUrl: string, pageName: string) => {
    // Solo en páginas que no sean home
    if (!pageUrl.endsWith('/es') && !pageUrl.endsWith('/en')) {
      cy.get('body').then(($body) => {
        if ($body.find('nav[aria-label="Breadcrumb"]').length > 0) {
          cy.get('nav[aria-label="Breadcrumb"]').should('not.contain.text', '-');
          cy.log(`✅ Breadcrumb validation passed for ${pageName}`);
        } else {
          cy.log(`ℹ️ No breadcrumbs found for ${pageName}`);
        }
      });
    }
  };

  // Tests individuales para cada página crítica
  criticalPages.forEach((page) => {
    it(`Should validate SEO elements for ${page.name}`, () => {
      cy.visit(page.url, { timeout: 10000 });
      
      // Esperar a que la página cargue
      cy.get('body').should('be.visible');
      cy.wait(1000);
      
      // Validaciones
      validateBasicSEO(page.name);
      validateNavigation(page.name);
      validateBreadcrumbs(page.url, page.name);
      
      cy.log(`🎉 All validations passed for ${page.name}`);
    });
  });

  // Test de performance básico
  it('Should have reasonable load times', () => {
    const startTime = Date.now();
    
    cy.visit('/es');
    cy.get('body').should('be.visible').then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`Page load time: ${loadTime}ms`);
      expect(loadTime).to.be.lessThan(8000);
    });
  });

  // Test de status codes
  it('Should return 200 for all critical pages', () => {
    criticalPages.forEach((page) => {
      cy.request(page.url).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`✅ ${page.url} returns 200`);
      });
    });
  });
});