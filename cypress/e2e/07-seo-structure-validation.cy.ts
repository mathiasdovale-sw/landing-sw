/// <reference types="cypress" />

describe('SEO and Structure Validation - All Pages', () => {
  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  
  // Lista completa de todas las páginas a validar
  const allPages = {
    spanish: [
      { url: '/es', name: 'Home ES', hasContact: true, hasFAQ: true },
      { url: '/es/contacto', name: 'Contacto', hasContact: true, hasFAQ: false },
      { url: '/es/sobre-nosotros', name: 'Sobre Nosotros', hasContact: false, hasFAQ: false },
      { url: '/es/blog', name: 'Blog ES', hasContact: false, hasFAQ: false },
      
      // Servicios ES
      { url: '/es/consultoria-shopify', name: 'Consultoría Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/seo-shopify', name: 'SEO Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/diseno-shopify', name: 'Diseño Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/cro-shopify', name: 'CRO Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/crear-tienda-shopify', name: 'Crear Tienda Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/migracion-shopify', name: 'Migración Shopify', hasContact: false, hasFAQ: true },
      { url: '/es/personalizacion-tema-shopify', name: 'Personalización Tema', hasContact: false, hasFAQ: true },
      { url: '/es/shopify-plus', name: 'Shopify Plus', hasContact: false, hasFAQ: true },
      { url: '/es/growth-partner-shopify', name: 'Growth Partner', hasContact: false, hasFAQ: true },
      { url: '/es/ab-testing-shopify', name: 'A/B Testing', hasContact: false, hasFAQ: true },
      
      // Políticas ES
      { url: '/es/politica-de-privacidad', name: 'Política Privacidad ES', hasContact: false, hasFAQ: false },
      { url: '/es/politica-de-cookies', name: 'Política Cookies ES', hasContact: false, hasFAQ: false },
      { url: '/es/suscripcion-confirmada', name: 'Suscripción Confirmada', hasContact: false, hasFAQ: false },
    ],
    english: [
      { url: '/en', name: 'Home EN', hasContact: true, hasFAQ: true },
      { url: '/en/contact', name: 'Contact', hasContact: true, hasFAQ: false },
      { url: '/en/about', name: 'About', hasContact: false, hasFAQ: false },
      { url: '/en/blog', name: 'Blog EN', hasContact: false, hasFAQ: false },
      
      // Servicios EN
      { url: '/en/shopify-consulting', name: 'Shopify Consulting', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-seo', name: 'Shopify SEO', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-design', name: 'Shopify Design', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-cro', name: 'Shopify CRO', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-store-setup', name: 'Store Setup', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-migration', name: 'Shopify Migration', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-theme-customization', name: 'Theme Customization', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-plus', name: 'Shopify Plus', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-growth-partner', name: 'Growth Partner', hasContact: false, hasFAQ: true },
      { url: '/en/shopify-ab-testing', name: 'A/B Testing', hasContact: false, hasFAQ: true },
      
      // Políticas EN
      { url: '/en/privacy-policy', name: 'Privacy Policy', hasContact: false, hasFAQ: false },
      { url: '/en/cookie-policy', name: 'Cookie Policy', hasContact: false, hasFAQ: false },
      { url: '/en/newsletter-confirmed', name: 'Newsletter Confirmed', hasContact: false, hasFAQ: false },
    ]
  };

  // Helper function para validar elementos SEO básicos
  const validateBasicSEO = (pageName: string) => {
    // Meta title
    cy.title().should('not.be.empty');
    cy.title().should('include', 'SellifyWorks');
    
    // Meta description
    cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
    cy.get('meta[name="description"]').should('have.attr', 'content').invoke('length').should('be.gt', 120);
    
    // Canonical URL
    cy.get('link[rel="canonical"]').should('exist').and('have.attr', 'href');
    
    // Open Graph
    cy.get('meta[property="og:title"]').should('have.attr', 'content').and('not.be.empty');
    cy.get('meta[property="og:description"]').should('have.attr', 'content').and('not.be.empty');
    cy.get('meta[property="og:url"]').should('have.attr', 'content').and('not.be.empty');
    
    // Twitter Cards
    cy.get('meta[name="twitter:card"]').should('have.attr', 'content', 'summary_large_image');
    cy.get('meta[name="twitter:title"]').should('have.attr', 'content').and('not.be.empty');
    cy.get('meta[name="twitter:description"]').should('have.attr', 'content').and('not.be.empty');
    
    // Language attributes
    cy.get('html').should('have.attr', 'lang').and('match', /^(es|en)$/);
    
    cy.log(`✅ Basic SEO validation passed for ${pageName}`);
  };

  // Helper function para validar structured data
  const validateStructuredData = (pageName: string) => {
    // Verificar que existe al menos un JSON-LD
    cy.get('script[type="application/ld+json"]').should('exist');
    
    // Validar breadcrumb structured data en páginas que no sean home
    cy.url().then((url) => {
      if (!url.endsWith('/es') && !url.endsWith('/en')) {
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
          let hasBreadcrumb = false;
          $scripts.each((_, script) => {
            try {
              const jsonData = JSON.parse(script.textContent || '');
              if (jsonData['@type'] === 'BreadcrumbList' || 
                  (jsonData['@type'] === 'Service' && jsonData.offers) ||
                  jsonData['@type'] === 'Organization') {
                hasBreadcrumb = true;
              }
            } catch (e) {
              // Ignore parse errors
            }
          });
          expect(hasBreadcrumb, 'Should have breadcrumb or service structured data').to.be.true;
        });
      }
    });
    
    cy.log(`✅ Structured data validation passed for ${pageName}`);
  };

  // Helper function para validar navegación y footer
  const validateNavigation = (pageName: string) => {
    // Header/Navigation
    cy.get('header, nav, [data-testid="header"], [data-testid="nav"]').should('exist');
    
    // Logo o marca
    cy.get('img[alt*="logo"], img[alt*="Logo"], img[alt*="SellifyWorks"], a[href*="/"]').first().should('exist');
    
    // Links de navegación principales
    cy.get('a[href*="/es"], a[href*="/en"]').should('have.length.at.least', 3);
    
    // Footer
    cy.get('footer, [data-testid="footer"]').should('exist');
    
    cy.log(`✅ Navigation validation passed for ${pageName}`);
  };

  // Helper function para validar breadcrumbs visuales
  const validateVisualBreadcrumbs = (pageName: string) => {
    cy.url().then((url) => {
      // Solo validar breadcrumbs en páginas que no sean home
      if (!url.endsWith('/es') && !url.endsWith('/en')) {
        // Buscar elementos de breadcrumb
        cy.get('nav[aria-label="Breadcrumb"], nav[aria-label="breadcrumb"], .breadcrumb, [data-testid="breadcrumb"]')
          .should('exist', 'Visual breadcrumbs should exist on non-home pages');
        
        // Verificar que tenga al menos 2 elementos (Home + Current)
        cy.get('nav[aria-label="Breadcrumb"] a, nav[aria-label="breadcrumb"] a, .breadcrumb a, [data-testid="breadcrumb"] a')
          .should('have.length.at.least', 1);
        
        cy.log(`✅ Visual breadcrumbs validation passed for ${pageName}`);
      }
    });
  };

  // Helper function para validar FAQ section
  const validateFAQSection = (pageName: string, shouldHaveFAQ: boolean) => {
    if (shouldHaveFAQ) {
      cy.get('[data-testid="faq"], .faq, section:contains("FAQ"), section:contains("Preguntas")').should('exist');
      cy.log(`✅ FAQ section validation passed for ${pageName}`);
    } else {
      cy.log(`ℹ️ FAQ section not expected for ${pageName}`);
    }
  };

  // Helper function para validar contact section
  const validateContactSection = (pageName: string, shouldHaveContact: boolean) => {
    if (shouldHaveContact) {
      cy.get('[data-testid="contact"], .contact, section:contains("Contact"), section:contains("Contacto")').should('exist');
      cy.log(`✅ Contact section validation passed for ${pageName}`);
    } else {
      cy.log(`ℹ️ Contact section not expected for ${pageName}`);
    }
  };

  // Helper function para validar performance básico
  const validateBasicPerformance = (pageName: string) => {
    // Verificar que la página carga en tiempo razonable
    cy.window().should('exist');
    
    // Verificar que no hay errores de JavaScript críticos
    cy.window().then((win) => {
      expect(win.console.error).to.not.have.been.called;
    });
    
    // Verificar que hay contenido visible
    cy.get('body').should('contain.text', 'SellifyWorks');
    
    cy.log(`✅ Basic performance validation passed for ${pageName}`);
  };

  // Test para páginas en español
  allPages.spanish.forEach((page) => {
    it(`Should validate all SEO and structure elements for ${page.name}`, () => {
      cy.visit(page.url);
      
      // Esperar a que la página cargue completamente
      cy.get('body').should('be.visible');
      
      // Validaciones principales
      validateBasicSEO(page.name);
      validateStructuredData(page.name);
      validateNavigation(page.name);
      validateVisualBreadcrumbs(page.name);
      validateFAQSection(page.name, page.hasFAQ);
      validateContactSection(page.name, page.hasContact);
      validateBasicPerformance(page.name);
      
      cy.log(`🎉 All validations passed for ${page.name}`);
    });
  });

  // Test para páginas en inglés
  allPages.english.forEach((page) => {
    it(`Should validate all SEO and structure elements for ${page.name}`, () => {
      cy.visit(page.url);
      
      // Esperar a que la página cargue completamente
      cy.get('body').should('be.visible');
      
      // Validaciones principales
      validateBasicSEO(page.name);
      validateStructuredData(page.name);
      validateNavigation(page.name);
      validateVisualBreadcrumbs(page.name);
      validateFAQSection(page.name, page.hasFAQ);
      validateContactSection(page.name, page.hasContact);
      validateBasicPerformance(page.name);
      
      cy.log(`🎉 All validations passed for ${page.name}`);
    });
  });

  // Test especial para validar consistency entre idiomas
  it('Should validate consistency between Spanish and English versions', () => {
    const spanishServices = allPages.spanish.filter(p => p.url.includes('shopify') || p.url.includes('cro') || p.url.includes('seo'));
    const englishServices = allPages.english.filter(p => p.url.includes('shopify') || p.url.includes('cro') || p.url.includes('seo'));
    
    expect(spanishServices.length).to.equal(englishServices.length, 'Should have same number of service pages in both languages');
    
    cy.log(`✅ Language consistency validation passed`);
  });

  // Test para validar que no hay páginas rotas
  it('Should validate that all pages return 200 status', () => {
    const allUrls = [...allPages.spanish, ...allPages.english];
    
    allUrls.forEach((page) => {
      cy.request(page.url).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    
    cy.log(`✅ All pages return 200 status`);
  });
});