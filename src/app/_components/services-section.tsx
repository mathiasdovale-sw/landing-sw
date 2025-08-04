"use client"
import { useState } from "react"
import { Plus, Minus, Construction, Search, Sprout } from "lucide-react"

interface ServiceItemProps {
  number: string;
  title: string;
  description: string;
  details: string[];
  isExpanded: boolean;
  onToggle: () => void;
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function ServiceItem({ number, title, description, details, isExpanded, onToggle, accentColor, icon: Icon }: ServiceItemProps) {
  return (
    <div
      className={`border-b border-gray-800 last:border-b-0 group transition-all duration-500 ${
        isExpanded ? "bg-white" : "bg-black"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-8 lg:px-16 text-left hover:bg-opacity-90 transition-all duration-300"
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className={`mr-1 sm:mr-2 md:mr-4 lg:mr-8 xl:mr-12 transition-colors duration-500 flex-shrink-0 w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 flex items-center justify-center ${
              isExpanded ? "text-gray-300" : "text-gray-800 group-hover:text-gray-700"
            }`}
          >
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full transition-colors duration-500 flex items-center justify-center"
              style={{ 
                backgroundColor: isExpanded ? '#d1d5db' : accentColor,
                transition: 'background-color 0.5s ease'
              }}
            >
              <Icon 
                size={16} 
                className={`sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-500 ${
                  isExpanded ? "text-black" : "text-white"
                }`}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide mb-2 sm:mb-2 md:mb-3 transition-colors duration-500 ${
                isExpanded ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {title.toUpperCase()}
            </h3>
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed transition-colors duration-500 ${
                isExpanded ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="ml-1 sm:ml-2 md:ml-4 lg:ml-8 flex-shrink-0">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isExpanded ? "border-black" : "border-white hover:bg-white/10"
            }`}
            style={{
              backgroundColor: isExpanded ? accentColor : undefined,
              borderColor: isExpanded ? accentColor : undefined,
              transition: 'all 0.3s ease'
            }}
          >
            {isExpanded ? (
              <Minus size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            ) : (
              <Plus size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            )}
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? "max-h-[500px] sm:max-h-[600px] md:max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 sm:px-3 md:px-4 lg:px-8 xl:px-16 pb-6 sm:pb-8 md:pb-12">
          <div className="ml-6 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-32">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start group/item">
                  <div 
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 md:mr-4 mt-1.5 sm:mt-2 flex-shrink-0 group-hover/item:opacity-80 transition-colors"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <span className="text-gray-700 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed group-hover/item:text-black transition-colors">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-300">
              <button className="bg-black text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm md:text-base">
                Más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: "crear",
      number: "01",
      title: "Crear",
      description: "Desarrollamos tu tienda Shopify desde cero con diseño personalizado y funcionalidades avanzadas",
      accentColor: "#FF6C03",
      icon: Construction,
      details: [
        "Diseño web personalizado y responsive",
        "Configuración completa de Shopify",
        "Integración de pasarelas de pago",
        "Optimización para dispositivos móviles",
        "Configuración de productos y categorías",
        "Implementación de funcionalidades avanzadas",
      ],
    },
    {
      id: "optimizar",
      number: "02",
      title: "Optimizar",
      description: "Mejoramos el rendimiento y conversión de tu tienda existente para maximizar resultados",
      accentColor: "#02ADC5",
      icon: Search,
      details: [
        "Auditoría completa de la tienda",
        "Optimización de velocidad de carga",
        "Mejora de la experiencia de usuario (UX)",
        "Optimización para motores de búsqueda (SEO)",
        "Análisis y mejora del funnel de conversión",
        "Implementación de herramientas de analytics",
      ],
    },
    {
      id: "crecer",
      number: "03",
      title: "Crecer",
      description: "Escalamos tu negocio con estrategias de marketing digital y automatización avanzada",
      accentColor: "#70764D",
      icon: Sprout,
      details: [
        "Estrategias de marketing digital",
        "Campañas de publicidad en redes sociales",
        "Email marketing y automatización",
        "Optimización de conversiones (CRO)",
        "Análisis de métricas y KPIs",
        "Consultoría estratégica continua",
      ],
    },
  ]

  const handleToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <section className="bg-black text-white">
      <div className="text-center py-10 sm:py-14 md:py-18 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 sm:mb-5 md:mb-6"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          NUESTROS SERVICIOS
        </h2>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-3">
          Soluciones completas para hacer crecer tu negocio en Shopify con resultados garantizados
        </p>
      </div>

      <div className="w-full">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            number={service.number}
            title={service.title}
            description={service.description}
            details={service.details}
            isExpanded={expandedService === service.id}
            onToggle={() => handleToggle(service.id)}
            accentColor={service.accentColor}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  )
}