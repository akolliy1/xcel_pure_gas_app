"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Cylinder, 
  Pipette, 
  Factory, 
  Package, 
  HeadsetIcon,
  ChevronDown,
  CheckCircle
} from "lucide-react"

const services = [
  {
    icon: Cylinder,
    title: "Nitrogen Gas Production & Supply",
    description: "High-purity nitrogen gas production with comprehensive supply solutions for all your industrial needs.",
    color: "primary",
    details: [
      "High-purity nitrogen gas production (99.5% - 99.999%)",
      "Bulk liquid nitrogen supply via tanker delivery",
      "Cylinder distribution for smaller volume needs",
      "On-site nitrogen generation systems",
      "24/7 emergency supply services",
      "Flexible delivery schedules"
    ],
    subServices: [
      { name: "Bulk Supply", desc: "Large volume deliveries via specialized tankers" },
      { name: "Cylinder Distribution", desc: "Various sizes from 10L to 50L cylinders" },
      { name: "On-Site Generation", desc: "PSA and membrane systems for continuous supply" },
    ]
  },
  {
    icon: Pipette,
    title: "Oil & Gas Services",
    description: "Comprehensive support services for the oil and gas industry, ensuring safe and efficient operations.",
    color: "secondary",
    details: [
      "Pipeline purging and inerting",
      "Pressure testing services",
      "Leak detection and repair",
      "Well stimulation support",
      "Tank blanketing services",
      "Flare stack purging"
    ],
    subServices: [
      { name: "Pipeline Purging", desc: "Safe displacement of flammable gases" },
      { name: "Pressure Testing", desc: "Hydrostatic and pneumatic testing" },
      { name: "Inerting Services", desc: "Creating safe, oxygen-free environments" },
    ]
  },
  {
    icon: Factory,
    title: "Industrial Applications",
    description: "Specialized nitrogen solutions for diverse industrial processes across multiple sectors.",
    color: "primary",
    details: [
      "Food packaging and preservation",
      "Metal heat treatment and annealing",
      "Chemical process blanketing",
      "Electronics manufacturing support",
      "Pharmaceutical applications",
      "Laser cutting assist gas"
    ],
    subServices: [
      { name: "Food & Beverage", desc: "Modified atmosphere packaging (MAP)" },
      { name: "Metal Fabrication", desc: "Heat treatment and welding shield gas" },
      { name: "Chemical Processing", desc: "Reactor blanketing and transfer" },
    ]
  },
  {
    icon: Package,
    title: "Equipment Leasing",
    description: "Flexible equipment rental options to meet your temporary or long-term operational needs.",
    color: "secondary",
    details: [
      "Nitrogen storage tanks (various capacities)",
      "Mobile nitrogen generation units",
      "High-pressure compressors",
      "Vaporizers and regulators",
      "Flow control equipment",
      "Safety monitoring systems"
    ],
    subServices: [
      { name: "Tanks & Storage", desc: "From 1,000L to 50,000L capacity" },
      { name: "Mobile Units", desc: "Truck-mounted generation systems" },
      { name: "Support Equipment", desc: "Compressors, vaporizers, regulators" },
    ]
  },
  {
    icon: HeadsetIcon,
    title: "Consulting & Technical Support",
    description: "Expert guidance and support to optimize your nitrogen usage and improve operational efficiency.",
    color: "primary",
    details: [
      "System design and engineering",
      "Process optimization analysis",
      "Safety audits and compliance",
      "Training and certification",
      "24/7 technical support hotline",
      "Preventive maintenance programs"
    ],
    subServices: [
      { name: "System Design", desc: "Custom engineering solutions" },
      { name: "Safety Advisory", desc: "HSE compliance and best practices" },
      { name: "Training Programs", desc: "Operator certification courses" },
    ]
  },
]

export function ServicesContent() {
  const [expandedService, setExpandedService] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Comprehensive Service Categories
          </h2>
          <p className="text-muted-foreground">
            From production to delivery, we provide end-to-end solutions tailored to your specific needs.
            Click on each service to learn more.
          </p>
        </div>

        {/* Services Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 ${
                expandedService === index ? "shadow-lg" : "shadow-sm hover:shadow-md"
              } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedService(expandedService === index ? null : index)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  service.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
                }`}>
                  <service.icon className={`h-7 w-7 ${
                    service.color === "primary" ? "text-primary" : "text-secondary"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-1">{service.description}</p>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                  expandedService === index ? "rotate-180" : ""
                }`} />
              </button>

              {/* Expanded Content */}
              <div className={`transition-all duration-300 overflow-hidden ${
                expandedService === index ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-border">
                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    {/* Sub-services */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {service.subServices.map((sub) => (
                        <div key={sub.name} className="bg-muted rounded-lg p-4">
                          <h4 className="font-medium text-foreground mb-1">{sub.name}</h4>
                          <p className="text-muted-foreground text-sm">{sub.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Details List */}
                    <h4 className="font-medium text-foreground mb-3">Key Features:</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                            service.color === "primary" ? "text-primary" : "text-secondary"
                          }`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
