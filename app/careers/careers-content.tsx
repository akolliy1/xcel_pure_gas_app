"use client"

import { useEffect, useRef, useState } from "react"
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Heart,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Shield,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobApplicationModal } from "@/components/job-application-modal"

const benefits = [
  { icon: DollarSign, title: "Competitive Salary", description: "Industry-leading compensation packages with performance bonuses" },
  { icon: TrendingUp, title: "Career Growth", description: "Clear advancement paths and leadership development programs" },
  { icon: GraduationCap, title: "Training & Development", description: "Continuous learning opportunities and professional certifications" },
  { icon: Heart, title: "Health Benefits", description: "Comprehensive health insurance for you and your family" },
  { icon: Clock, title: "Work-Life Balance", description: "Flexible schedules and paid time off policies" },
  { icon: Shield, title: "Safety First", description: "Industry-best safety standards and equipment provided" },
]

const openRoles = [
  {
    title: "Process Engineer",
    department: "Operations",
    location: "Lagos",
    type: "Full-time",
    description: "Design and optimize nitrogen production processes. Requires 3+ years experience in chemical/process engineering.",
    requirements: ["B.Sc in Chemical Engineering", "3+ years process experience", "Knowledge of PSA systems"]
  },
  {
    title: "Safety Officer",
    department: "HSE",
    location: "Port Harcourt",
    type: "Full-time",
    description: "Ensure compliance with safety regulations and conduct regular audits. HSE certification required.",
    requirements: ["HSE certification", "5+ years safety experience", "Knowledge of Nigerian regulations"]
  },
  {
    title: "Technical Sales Manager",
    department: "Sales",
    location: "Lagos",
    type: "Full-time",
    description: "Drive business growth through technical sales in the industrial gas sector.",
    requirements: ["Technical background", "Proven sales track record", "Client relationship skills"]
  },
  {
    title: "Maintenance Technician",
    department: "Operations",
    location: "Lagos",
    type: "Full-time",
    description: "Maintain and repair nitrogen generation equipment. Technical diploma required.",
    requirements: ["Technical diploma", "Equipment maintenance experience", "Problem-solving skills"]
  },
  {
    title: "Logistics Coordinator",
    department: "Supply Chain",
    location: "Lagos",
    type: "Full-time",
    description: "Coordinate delivery schedules and manage fleet operations for nitrogen distribution.",
    requirements: ["Logistics experience", "Fleet management knowledge", "Excellent organizational skills"]
  },
  {
    title: "Laboratory Technician",
    department: "Quality Control",
    location: "Lagos",
    type: "Full-time",
    description: "Conduct quality tests and ensure nitrogen purity standards are maintained.",
    requirements: ["Chemistry background", "Lab experience", "Attention to detail"]
  },
]

const stats = [
  { value: "50+", label: "Team Members" },
  { value: "10+", label: "Years in Business" },
  { value: "95%", label: "Employee Retention" },
  { value: "100%", label: "Safety Record" },
]

export function CareersContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState("")
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

  const handleApplyClick = (position: string) => {
    setSelectedPosition(position)
    setIsModalOpen(true)
  }

  const allPositions = openRoles.map(role => role.title)

  return (
    <>
      <section ref={sectionRef} className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Why Join Us
              </span>
              <h2 className="mt-2 mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
                Build Your Career with a Growing Industry Leader
              </h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                At Xcel Pure Gas LTD, we believe our people are our greatest asset. We&apos;re
                committed to creating an environment where talented individuals can thrive,
                innovate, and grow. Join us and be part of shaping the future of industrial
                gas solutions in Nigeria.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`rounded-lg bg-muted p-4 text-center ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`grid gap-4 sm:grid-cols-2 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <benefit.icon className="mb-3 h-8 w-8 text-primary" />
                  <h4 className="mb-1 font-semibold text-foreground">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Open Positions
            </span>
            <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground text-balance md:text-4xl">
              Current Job Openings
            </h2>
            <p className="text-muted-foreground">
              Explore our available positions and find the perfect fit for your skills and career goals.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {openRoles.map((role, index) => (
              <div
                key={role.title}
                className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => setSelectedRole(selectedRole === index ? null : index)}
                  className="flex w-full flex-col gap-4 p-6 text-left transition-colors hover:bg-muted/50 sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl font-semibold text-foreground">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    selectedRole === index ? "rotate-90" : ""
                  }`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  selectedRole === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="border-t border-border px-6 pt-2 pb-6">
                    <p className="mb-4 text-muted-foreground">{role.description}</p>
                    <h4 className="mb-2 font-medium text-foreground">Requirements:</h4>
                    <ul className="mb-6 space-y-1">
                      {role.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="bg-primary text-white hover:bg-primary/90"
                      onClick={() => handleApplyClick(role.title)}
                    >
                      Apply Now
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/images/hero-3.jpg')] bg-cover bg-center bg-no-repeat md:bg-fixed" />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_38%)]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/15 bg-white/10 px-6 py-12 text-center shadow-[0_30px_120px_-35px_rgba(15,23,42,0.75)] backdrop-blur-md md:px-12 md:py-16">
            <Users className="mx-auto mb-4 h-12 w-12 text-white/80" />
            <h2 className="mb-4 text-3xl font-bold text-white text-balance md:text-4xl">
              Don&apos;t See a Perfect Match?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              We&apos;re always looking for talented individuals. Send us your CV and we&apos;ll
              keep you in mind for future opportunities.
            </p>
            <Button
              size="lg"
              className="bg-primary px-8 text-white shadow-lg shadow-primary/25"
              onClick={() => handleApplyClick("")}
            >
              Send Your CV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        positions={allPositions}
        defaultPosition={selectedPosition}
      />
    </>
  )
}
