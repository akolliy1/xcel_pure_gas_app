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

      <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/88 via-[#1565c0]/74 to-[#2e7d32]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_38%)]" />

      <div className="relative flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl pt-16 md:pt-20">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white opacity-0 animate-fade-in-up md:text-5xl lg:text-6xl">
              <span className="text-balance">
                Leading Provider of High-Purity Nitrogen Gas Solutions in Nigeria
              </span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-8 text-white/90 opacity-0 animate-fade-in-up animation-delay-200 md:text-xl">
              Delivering innovation, safety, and reliability across industries
            </p>
            <div className="flex flex-col gap-4 opacity-0 animate-fade-in-up animation-delay-400 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary px-8 text-lg font-semibold text-white shadow-xl shadow-primary/30"
              >
                <Link href="/contact?subject=quote">Get a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/70 bg-white/5 px-8 text-lg text-white hover:border-white hover:bg-white hover:text-secondary"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={prevSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="origin-center translate-y-8 rotate-90 text-sm font-medium tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="mt-12 h-16 w-px bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  )
}
