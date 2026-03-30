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
  Send
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
      {/* Why Join Us */}
      <section ref={sectionRef} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Why Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
                Build Your Career with a Growing Industry Leader
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Xcel Pure Gas LTD, we believe our people are our greatest asset. We&apos;re 
                committed to creating an environment where talented individuals can thrive, 
                innovate, and grow. Join us and be part of shaping the future of industrial 
                gas solutions in Nigeria.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`text-center p-4 bg-muted rounded-lg ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className={`grid sm:grid-cols-2 gap-4 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`bg-card rounded-lg p-5 border border-border hover:border-primary/50 hover:shadow-md transition-all ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <benefit.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Open Positions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
              Current Job Openings
            </h2>
            <p className="text-muted-foreground">
              Explore our available positions and find the perfect fit for your skills and career goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {openRoles.map((role, index) => (
              <div
                key={role.title}
                className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => setSelectedRole(selectedRole === index ? null : index)}
                  className="w-full flex flex-col sm:flex-row sm:items-center gap-4 p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{role.title}</h3>
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

                {/* Expanded Content */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  selectedRole === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <p className="text-muted-foreground mb-4">{role.description}</p>
                    <h4 className="font-medium text-foreground mb-2">Requirements:</h4>
                    <ul className="space-y-1 mb-6">
                      {role.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-secondary to-secondary/90">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Users className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Don&apos;t See a Perfect Match?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              We&apos;re always looking for talented individuals. Send us your CV and we&apos;ll 
              keep you in mind for future opportunities.
            </p>
            <Button
              size="lg"
              className="bg-white text-secondary hover:bg-white/90 text-lg px-8"
              onClick={() => handleApplyClick("")}
            >
              Send Your CV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        positions={allPositions}
        defaultPosition={selectedPosition}
      />
    </>
  )
}
