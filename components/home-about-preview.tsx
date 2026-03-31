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
    <section ref={sectionRef} className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
              <Image
                src="/images/about.jpg"
                alt="Xcel Pure Gas engineers at work"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-48 w-48 rounded-2xl bg-primary/10 blur-sm" />
            <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-2xl bg-secondary/10 blur-sm" />
          </div>

          <div className={isVisible ? "animate-slide-in-right" : "opacity-0"}>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              About Us
            </span>
            <h2 className="mt-3 mb-6 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Your Trusted Partner in Nitrogen Gas Solutions
            </h2>
            <div className="space-y-6">
              <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                Xcel Pure Gas LTD is a Nigerian-based industrial gas company specializing in the
                production, supply, and distribution of high-purity nitrogen gas. With state-of-the-art
                facilities and a team of experienced professionals, we deliver innovative solutions
                that meet the highest industry standards.
              </p>
              <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                Our commitment to safety, quality, and customer satisfaction has made us a preferred
                partner for businesses across multiple industries.
              </p>
            </div>

            <Button asChild size="lg" className="mt-10 bg-primary text-white shadow-lg shadow-primary/25">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
