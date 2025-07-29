"use client"
import Navbar from "./navbar"
import Image from "next/image"

const HeaderHome = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-12 lg:py-24 min-h-[calc(100vh-120px)]">
        {/* Left Side - Main Text */}
        <div className="flex-1 mb-12 lg:mb-0">
          <h1 className="text-6xl md:text-7xl lg:text-6xl font-black leading-tight tracking-tight">
            MENOS COMPLICACIONES.
            <br />
            MÁS CONVERSIONES.
          </h1>
        </div>

        {/* Right Side - Shopify Section */}
        <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right">
          <Image
            src="/assets/img/shopifyLogo.png"
            alt="Agencia Shopify Barcelona - Desarrollo de tiendas online"
            width={250}
            height={200}
            className="rounded-lg shadow-lg"
            priority
          />
          <div className="text-sm md:text-base font-medium tracking-widest">AGENCY PARTNER</div>
        </div>
      </main>
    </div>
  )
}

export default HeaderHome