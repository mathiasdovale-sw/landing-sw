"use client"
import Navbar from "./navbar"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import AuroraBackground from "@/app/_components/aurora-background"

const HeaderHome = () => {
  const { t } = useLanguage()
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[20vh] lg:min-h-screen text-white overflow-hidden" 
             style={{ 
               backgroundColor: '#1a1a1a',
               width: '100vw',
               position: 'relative',
               left: '50%',
               right: '50%',
               marginLeft: '-50vw',
               marginRight: '-50vw'
             }}>
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AuroraBackground 
          colorStops={["#79FFE1", "#0070f3", "#1a1a1a"]}
          amplitude={1.0}
          blend={0.8}
          speed={0.3}
        />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 sm:px-10 md:px-16 lg:px-20 py-6 sm:py-8 lg:py-12 min-h-[calc(70vh-70px)] sm:min-h-[calc(90vh-100px)] lg:min-h-[calc(100vh-120px)] text-center">
        {/* Main Text - Centered */}
        <div className="mb-4 sm:mb-6 lg:mb-8 max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight xl:leading-tight 2xl:leading-tight tracking-tight break-words">
            {t('header.title.line1')}
            <br />
            <span className="text-orange-300">{t('header.title.line2')}</span>
          </h1>
          
          {/* Shopify Integration - More cohesive placement */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/img/shopifyLogo.png"
                alt="Shopify Partner Agency"
                width={50}
                height={40}
                className="w-12 h-auto sm:w-14 lg:w-16"
                priority
              />
              <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-300 tracking-wide">
                {t('header.shopify.partner')}
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-600"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light text-center sm:text-left max-w-md">
              {t('header.shopify.description')}
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <button 
            onClick={scrollToContact}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl lg:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('header.cta')}
          </button>
        </div>

        {/* Spacer for better layout */}
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </main>
    </section>
  );
}

export default HeaderHome;