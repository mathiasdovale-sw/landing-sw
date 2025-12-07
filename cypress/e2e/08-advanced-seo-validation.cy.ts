/// <reference types="cypress" />

describe('Advanced SEO Technical Validation', () => {
  const servicePagesES = [
    '/es/consultoria-shopify',
    '/es/seo-shopify', 
    '/es/diseno-shopify',
    '/es/cro-shopify',
    '/es/crear-tienda-shopify',
    '/es/migracion-shopify',
    '/es/personalizacion-tema-shopify',
    '/es/shopify-plus',
    '/es/growth-partner-shopify',
    '/es/ab-testing-shopify'
  ];

  const servicePagesEN = [
    '/en/shopify-consulting',
    '/en/shopify-seo',
    '/en/shopify-design', 
    '/en/shopify-cro',
    '/en/shopify-store-setup',
    '/en/shopify-migration',
    '/en/shopify-theme-customization',
    '/en/shopify-plus',
    '/en/shopify-growth-partner',
    '/en/shopify-ab-testing'
  ];

  const institutionalPagesES = ['/es/sobre-nosotros'];
  const institutionalPagesEN = ['/en/about'];

  describe('Service Pages - ServiceStructuredData Validation', () => {
    [...servicePagesES, ...servicePagesEN].forEach((url) => {
      it(`Should have valid ServiceStructuredData on ${url}`, () => {
        cy.visit(url);
        
        // Verificar que existe ServiceStructuredData
        cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
          let hasServiceData = false;
          let serviceData = null;
          
          $scripts.each((_, script) => {
            try {
              const jsonData = JSON.parse(script.textContent || '');
              if (jsonData['@type'] === 'Service') {
                hasServiceData = true;
                serviceData = jsonData;
              }
            } catch (e) {
              // Ignore parse errors
            }
          });
          
          expect(hasServiceData, 'Service pages should have ServiceStructuredData').to.be.true;
          
          if (serviceData) {
            // Validar estructura del Service schema
            expect(serviceData).to.have.property('@context', 'https://schema.org');
            expect(serviceData).to.have.property('@type', 'Service');
            expect(serviceData).to.have.property('name').that.is.a('string');
            expect(serviceData).to.have.property('description').that.is.a('string');
            expect(serviceData).to.have.property('provider');
            expect(serviceData).to.have.property('areaServed');
            
            // Validar breadcrumbs en ServiceStructuredData
            if ((serviceData as any).breadcrumb) {
              expect((serviceData as any).breadcrumb).to.have.property('@type', 'BreadcrumbList');
              expect((serviceData as any).breadcrumb).to.have.property('itemListElement').that.is.an('array');
            }
            
            cy.log(`✅ ServiceStructuredData validation passed for ${url}`);
          }
        });
      });
    });
  });

  describe('Institutional Pages - AutoBreadcrumbStructuredData Validation', () => {
    [...institutionalPagesES, ...institutionalPagesEN].forEach((url) => {
      it(`Should have valid BreadcrumbStructuredData on ${url}`, () => {
        cy.visit(url);
        
        // Verificar que existe BreadcrumbStructuredData separado
        cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
          let hasBreadcrumbData = false;
          let breadcrumbData = null;
          
          $scripts.each((_, script) => {
            try {
              const jsonData = JSON.parse(script.textContent || '');
              if (jsonData['@type'] === 'BreadcrumbList') {
                hasBreadcrumbData = true;
                breadcrumbData = jsonData;
              }
            } catch (e) {
              // Ignore parse errors
            }
          });
          
          expect(hasBreadcrumbData, 'Institutional pages should have BreadcrumbStructuredData').to.be.true;
          
          if (breadcrumbData) {
            expect(breadcrumbData).to.have.property('@context', 'https://schema.org');
            expect(breadcrumbData).to.have.property('@type', 'BreadcrumbList');
            expect(breadcrumbData).to.have.property('itemListElement').that.is.an('array');
            expect((breadcrumbData as any).itemListElement.length).to.be.at.least(2);
            
            cy.log(`✅ BreadcrumbStructuredData validation passed for ${url}`);
          }
        });
      });
    });
  });

  describe('Visual Breadcrumbs Validation', () => {
    const allNonHomePagesES = [...servicePagesES, ...institutionalPagesES, '/es/politica-de-privacidad', '/es/politica-de-cookies'];
    const allNonHomePagesEN = [...servicePagesEN, ...institutionalPagesEN, '/en/privacy-policy', '/en/cookie-policy'];
    
    [...allNonHomePagesES, ...allNonHomePagesEN].forEach((url) => {
      it(`Should have visual breadcrumbs with proper structure on ${url}`, () => {
        cy.visit(url);
        
        // Verificar que existe navegación de breadcrumbs
        cy.get('nav[aria-label="Breadcrumb"]').should('exist');
        
        // Verificar que contiene Home/Inicio link
        cy.get('nav[aria-label="Breadcrumb"]').within(() => {
          cy.get('a').first().should('contain.text', url.includes('/es') ? 'Inicio' : 'Home');
        });
        
        // Verificar que el último elemento no es un link (página actual)
        cy.get('nav[aria-label="Breadcrumb"] span').last().should('exist');
        
        // Verificar que no hay guiones en los nombres (deberían ser espacios)
        cy.get('nav[aria-label="Breadcrumb"]').should('not.contain.text', '-');
        
        cy.log(`✅ Visual breadcrumbs validation passed for ${url}`);
      });
    });
  });

  describe('Meta Descriptions Quality Check', () => {
    const allPages = [...servicePagesES, ...servicePagesEN, ...institutionalPagesES, ...institutionalPagesEN];
    
    allPages.forEach((url) => {
      it(`Should have quality meta description on ${url}`, () => {
        cy.visit(url);
        
        cy.get('meta[name="description"]').should('have.attr', 'content').then((content) => {
          const contentText = content.toString();
          // Longitud entre 120-160 caracteres
          expect(contentText.length).to.be.at.least(120, 'Meta description should be at least 120 characters');
          expect(contentText.length).to.be.at.most(160, 'Meta description should not exceed 160 characters');
          
          // Debe contener palabras clave relevantes
          expect(contentText.toLowerCase()).to.include('shopify');
          
          // No debe terminar con punto suspensivo (indicaría corte)
          expect(contentText).to.not.match(/\.\.\.$/);
          
          cy.log(`✅ Meta description quality check passed for ${url}: "${contentText}"`);
        });
      });
    });
  });

  describe('Canonical URLs Validation', () => {
    const allPages = [...servicePagesES, ...servicePagesEN, '/es', '/en'];
    
    allPages.forEach((url) => {
      it(`Should have proper canonical URL on ${url}`, () => {
        cy.visit(url);
        
        cy.get('link[rel="canonical"]').should('have.attr', 'href').then((href) => {
          // Debe ser URL absoluta
          expect(href).to.match(/^https?:\/\//);
          
          // Debe terminar con la ruta correcta
          expect(href).to.include(url);
          
          // No debe tener trailing slash extra (excepto para home)
          if (url !== '/es' && url !== '/en') {
            expect(href).to.not.match(/\/$/);
          }
          
          cy.log(`✅ Canonical URL validation passed for ${url}: ${href}`);
        });
      });
    });
  });

  describe('Hreflang Validation', () => {
    const pagesPairs = [
      { es: '/es', en: '/en' },
      { es: '/es/contacto', en: '/en/contact' },
      { es: '/es/sobre-nosotros', en: '/en/about' },
      { es: '/es/consultoria-shopify', en: '/en/shopify-consulting' },
      { es: '/es/seo-shopify', en: '/en/shopify-seo' },
    ];
    
    pagesPairs.forEach((pair) => {
      it(`Should have proper hreflang on ${pair.es} and ${pair.en}`, () => {
        // Verificar página en español
        cy.visit(pair.es);
        cy.get('link[rel="alternate"][hreflang="en"]').should('have.attr', 'href').and('include', pair.en);
        cy.get('link[rel="alternate"][hreflang="es"]').should('have.attr', 'href').and('include', pair.es);
        
        // Verificar página en inglés
        cy.visit(pair.en);
        cy.get('link[rel="alternate"][hreflang="es"]').should('have.attr', 'href').and('include', pair.es);
        cy.get('link[rel="alternate"][hreflang="en"]').should('have.attr', 'href').and('include', pair.en);
        
        cy.log(`✅ Hreflang validation passed for ${pair.es} ↔ ${pair.en}`);
      });
    });
  });

  describe('JSON-LD Schema Validation', () => {
    it('Should have valid JSON-LD schemas across all pages', () => {
      const testPages = ['/es/consultoria-shopify', '/en/shopify-consulting', '/es/sobre-nosotros', '/en/about'];
      
      testPages.forEach((url) => {
        cy.visit(url);
        
        cy.get('script[type="application/ld+json"]').should('exist').each(($script) => {
          const content = $script.text();
          
          // Verificar que es JSON válido
          expect(() => JSON.parse(content), 'Should be valid JSON').to.not.throw();
          
          const jsonData = JSON.parse(content);
          
          // Verificar que tiene propiedades Schema.org requeridas
          expect(jsonData).to.have.property('@context');
          expect(jsonData).to.have.property('@type');
          
          cy.log(`✅ Valid JSON-LD found on ${url}: @type=${jsonData['@type']}`);
        });
      });
    });
  });
});