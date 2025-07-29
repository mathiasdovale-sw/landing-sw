"use client"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { useEffect } from "react"

interface ServiceItemProps {
  number: string;
  title: string;
  description: string;
  details: string[];
  isExpanded: boolean;
  onToggle: () => void;
  accentColor: string;
}

function ServiceItem({ number, title, description, details, isExpanded, onToggle, accentColor }: ServiceItemProps) {
  const [iconSize, setIconSize] = useState(20)

  useEffect(() => {
    const updateIconSize = () => {
      if (typeof window !== 'undefined') {
        setIconSize(window.innerWidth >= 1024 ? 24 : 20)
      }
    }

    // Establecer tamaño inicial
    updateIconSize()

    // Actualizar en resize
    window.addEventListener('resize', updateIconSize)
    return () => window.removeEventListener('resize', updateIconSize)
  }, [])

  return (
    <div
      className={`border-b border-gray-800 last:border-b-0 group transition-all duration-500 ${
        isExpanded ? "bg-white" : "bg-black"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 md:py-12 px-4 md:px-8 lg:px-16 text-left hover:bg-opacity-90 transition-all duration-300"
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className={`mr-4 md:mr-8 lg:mr-12 transition-colors duration-500 flex-shrink-0 w-16 md:w-24 lg:w-32 flex items-center justify-center ${
              isExpanded ? "text-gray-300" : "text-gray-800 group-hover:text-gray-700"
            }`}
          >
            <div 
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full transition-colors duration-500"
              style={{ 
                backgroundColor: isExpanded ? '#d1d5db' : accentColor,
                transition: 'background-color 0.5s ease'
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-xl md:text-3xl lg:text-5xl font-bold tracking-wide mb-2 md:mb-3 transition-colors duration-500 ${
                isExpanded ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {title.toUpperCase()}
            </h3>
            <p
              className={`text-sm md:text-base lg:text-lg leading-relaxed transition-colors duration-500 ${
                isExpanded ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="ml-4 md:ml-8 flex-shrink-0">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isExpanded ? "border-black" : "border-white hover:bg-white/10"
            }`}
            style={{
              backgroundColor: isExpanded ? accentColor : undefined,
              borderColor: isExpanded ? accentColor : undefined,
              transition: 'all 0.3s ease'
            }}
          >
            {isExpanded ? (
              <Minus size={iconSize} className="text-white" />
            ) : (
              <Plus size={iconSize} className="text-white" />
            )}
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? "max-h-[600px] md:max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-8 lg:px-16 pb-8 md:pb-12">
          <div className="ml-12 md:ml-16 lg:ml-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start group/item">
                  <div 
                    className="w-2 h-2 rounded-full mr-3 md:mr-4 mt-2 flex-shrink-0 group-hover/item:opacity-80 transition-colors"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed group-hover/item:text-black transition-colors">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-300">
              <button className="bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm md:text-base">
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
      <div className="text-center py-12 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16">
        <h2
          className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-wide mb-4 md:mb-6"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          NUESTROS SERVICIOS
        </h2>
        <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
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
          />
        ))}
      </div>
    </section>
  )
}