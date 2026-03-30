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
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-br from-secondary/95 to-secondary"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 text-balance">
            Our Mission & Vision
          </h2>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <div
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To deliver high-quality nitrogen gas solutions that empower industries with 
              safe, reliable, and innovative services while maintaining the highest standards 
              of operational excellence.
            </p>
          </div>

          {/* Vision */}
          <div
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
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
