"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Cylinder, 
  Pipette, 
  Factory, 
  Package, 
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Cylinder,
    title: "Nitrogen Gas Supply",
    description: "High-purity nitrogen gas production with bulk supply and cylinder distribution.",
  },
  {
    icon: Pipette,
    title: "Oil & Gas Services",
    description: "Pipeline purging, pressure testing, leak detection, and inerting services.",
  },
  {
    icon: Factory,
    title: "Industrial Applications",
    description: "Nitrogen solutions for food packaging, metal fabrication, and chemical processing.",
  },
  {
    icon: Package,
    title: "Equipment Leasing",
    description: "Flexible equipment leasing including tanks, storage units, and mobile units.",
  },
]

export function HomeServicesPreview() {
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
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-muted"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Comprehensive Nitrogen Gas Solutions
          </h2>
          <p className="text-muted-foreground">
            From production to delivery, we offer end-to-end nitrogen gas services tailored to 
            meet the diverse needs of industries across Nigeria.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group bg-card rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"}`}>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
