"use client"
import Navbar from "./navbar"
import Image from "next/image"

const HeaderHome = () => {
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
    <div className="min-h-[70vh] sm:min-h-[20vh] lg:min-h-screen text-white" style={{ backgroundColor: '#141417ff' }}>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 lg:py-12 min-h-[calc(70vh-70px)] sm:min-h-[calc(90vh-100px)] lg:min-h-[calc(100vh-120px)] text-center">
        {/* Main Text - Centered */}
        <div className="mb-6 sm:mb-8 lg:mb-12 max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-tight tracking-tight break-words">
            MENOS COMPLICACIONES
            <br />
            <span className="text-gray-400">MÁS CONVERSIONES.</span>
          </h1>
        </div>

        {/* Call to Action Button */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <button 
            onClick={scrollToContact}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl lg:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Habla con un experto
          </button>
        </div>

        {/* Shopify Section - Below text with background */}
        <div className="flex flex-col items-center text-center rounded-2xl px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
          <Image
            src="/assets/img/shopifyLogo.png"
            alt="Agencia Shopify Barcelona - Desarrollo de tiendas online"
            width={200}
            height={160}
            className="w-48 h-auto sm:w-56 md:w-64 lg:w-72 xl:w-80 rounded-lg shadow-lg mb-3 sm:mb-4"
            priority
          />
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-widest">AGENCY PARTNER</div>
        </div>
      </main>
    </div>
  )
}

export default HeaderHome