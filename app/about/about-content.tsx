"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { 
  Droplets, 
  Factory, 
  Utensils, 
  Pill, 
  Zap,
  Target,
  Eye,
  Shield, 
  Award, 
  Users, 
  Lightbulb, 
  Heart,
  CheckCircle,
  BookOpen
} from "lucide-react"

const industries = [
  { icon: Droplets, name: "Oil & Gas", description: "Pipeline operations & testing" },
  { icon: Factory, name: "Manufacturing", description: "Industrial processes" },
  { icon: Utensils, name: "Food & Beverage", description: "Packaging & preservation" },
  { icon: Pill, name: "Pharmaceuticals", description: "Clean room applications" },
  { icon: Zap, name: "Energy", description: "Power generation support" },
]

const values = [
  { icon: Shield, name: "Integrity", description: "Honest and ethical in all dealings" },
  { icon: Award, name: "Excellence", description: "Commitment to highest standards" },
  { icon: CheckCircle, name: "Safety", description: "Prioritizing safety in operations" },
  { icon: Lightbulb, name: "Innovation", description: "Embracing new technologies" },
  { icon: Heart, name: "Customer Focus", description: "Putting clients first always" },
  { icon: Users, name: "Reliability", description: "Dependable service delivery" },
]

export function AboutContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [valuesVisible, setValuesVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const valuesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (valuesRef.current) valuesObserver.observe(valuesRef.current)

    return () => {
      observer.disconnect()
      valuesObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* Company Overview */}
      <section ref={sectionRef} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/about.jpg"
                  alt="Xcel Pure Gas engineers at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-lg -z-10" />
            </div>

            {/* Content Column */}
            <div className={isVisible ? "animate-slide-in-right" : "opacity-0"}>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Company Overview
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
                partner for businesses across multiple industries. We pride ourselves on our ability 
                to provide customized solutions that address the unique needs of each client.
              </p>

              {/* Industries Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {industries.map((industry, index) => (
                  <div
                    key={industry.name}
                    className={`flex flex-col items-center p-4 bg-muted rounded-lg hover:bg-accent transition-colors duration-300 ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <industry.icon className="h-8 w-8 text-primary mb-2" />
                    <span className="font-medium text-sm text-foreground text-center">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Philosophy */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-secondary/95 to-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To deliver high-quality nitrogen gas solutions that empower industries with 
                safe, reliable, and innovative services. We are committed to exceeding customer 
                expectations while maintaining the highest standards of operational excellence 
                and environmental responsibility.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To become the leading provider of industrial gas solutions in Africa, 
                recognized for our commitment to quality, innovation, and sustainable 
                practices. We envision a future where our solutions drive industrial 
                growth while preserving our environment for generations to come.
              </p>
            </div>

            {/* Philosophy */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Philosophy</h3>
              <p className="text-white/90 leading-relaxed">
                We believe in building lasting partnerships through transparency, innovation, 
                and unwavering commitment to safety. Our approach combines technical expertise 
                with personalized service to deliver solutions that truly make a difference 
                in our clients&apos; operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${valuesVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.name}
                className={`bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  valuesVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.name}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
