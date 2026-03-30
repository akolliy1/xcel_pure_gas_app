"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeAboutPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={`relative ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/about.jpg"
                alt="Xcel Pure Gas engineers at work"
                fill
                className="object-cover"
              />
            </div>
            {/* Accent Box */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-lg -z-10" />
          </div>

          {/* Content Column */}
          <div
            className={`${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
              Your Trusted Partner in Nitrogen Gas Solutions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Xcel Pure Gas LTD is a Nigerian-based industrial gas company specializing in the 
              production, supply, and distribution of high-purity nitrogen gas. With state-of-the-art 
              facilities and a team of experienced professionals, we deliver innovative solutions 
              that meet the highest industry standards.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our commitment to safety, quality, and customer satisfaction has made us a preferred 
              partner for businesses across multiple industries.
            </p>

            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
