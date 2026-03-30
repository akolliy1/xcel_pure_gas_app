"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/images/hero-1.jpg",
    alt: "Industrial nitrogen gas plant",
  },
  {
    image: "/images/hero-2.jpg",
    alt: "Oil and gas pipeline operations",
  },
  {
    image: "/images/hero-3.jpg",
    alt: "Industrial gas cylinders",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/85 via-[#1565c0]/70 to-[#2e7d32]/75" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 opacity-0 animate-fade-in-up">
            <span className="text-balance">
              Leading Provider of High-Purity Nitrogen Gas Solutions in Nigeria
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl opacity-0 animate-fade-in-up animation-delay-200">
            Delivering innovation, safety, and reliability across industries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-400">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg px-8"
            >
              <Link href="/contact?subject=Request a Quote">Get a Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-secondary text-lg px-8"
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm font-medium rotate-90 origin-center translate-y-8">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white/70 to-transparent mt-12" />
        </div>
      </div>
    </section>
  )
}
