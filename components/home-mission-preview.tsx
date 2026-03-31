"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Eye } from "lucide-react"

export function HomeMissionPreview() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-secondary/95 to-secondary py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%)]" />
      <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`mx-auto mb-14 max-w-3xl text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            What Drives Us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white text-balance md:text-4xl lg:text-5xl">
            Our Mission & Vision
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div
            className={`rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.7)] backdrop-blur-md ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">Our Mission</h3>
            <p className="text-white/85 leading-8">
              To deliver high-quality nitrogen gas solutions that empower industries with
              safe, reliable, and innovative services while maintaining the highest standards
              of operational excellence.
            </p>
          </div>

          <div
            className={`rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.7)] backdrop-blur-md ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">Our Vision</h3>
            <p className="text-white/85 leading-8">
              To become the leading provider of industrial gas solutions in Africa,
              recognized for our commitment to quality, innovation, and sustainable
              practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
