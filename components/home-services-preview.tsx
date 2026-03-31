"use client"

import { useEffect, useRef, useState } from "react"
import {
  Cylinder,
  Pipette,
  Factory,
  Package,
  ArrowRight,
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

const animationDelayClasses = [
  "",
  "animation-delay-100",
  "animation-delay-200",
  "animation-delay-300",
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
    <section ref={sectionRef} className="bg-muted/60 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className={`mx-auto mb-16 max-w-3xl text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Our Services
          </span>
          <h2 className="mt-3 mb-5 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            Comprehensive Nitrogen Gas Solutions
          </h2>
          <p className="text-base leading-8 text-muted-foreground md:text-lg">
            From production to delivery, we offer end-to-end nitrogen gas services tailored to
            meet the diverse needs of industries across Nigeria.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group rounded-2xl border border-border/70 bg-card/90 p-7 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-36px_rgba(15,23,42,0.45)] ${
                isVisible ? `animate-fade-in-up ${animationDelayClasses[index]}` : "opacity-0"
              }`}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                <service.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center ${isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"}`}>
          <Button asChild size="lg" className="bg-primary text-white shadow-lg shadow-primary/25">
            <Link href="/services">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
