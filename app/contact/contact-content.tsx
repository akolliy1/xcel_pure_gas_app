"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Building,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "@/lib/api"

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    content: "Festac, Lagos, Nigeria",
    subtext: "Visit us Monday - Friday",
    link: "https://maps.google.com/?q=Festac+Lagos+Nigeria",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+234 806 497 5518",
    subtext: "24/7 Emergency Line Available",
    link: "tel:+2348064975518",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@xcelpuregas.com",
    subtext: "admin@xcelpuregas.com",
    link: "mailto:info@xcelpuregas.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Fri: 8:00 AM - 6:00 PM",
    subtext: "Sat: 9:00 AM - 2:00 PM",
  },
] as const

function formatSubjectValue(subject: string | null) {
  if (!subject) {
    return ""
  }

  const normalized = subject.trim().toLowerCase()
  const subjectMap: Record<string, string> = {
    quote: "Quote Request",
    "get-a-quote": "Quote Request",
    "get a quote": "Quote Request",
    service: "Service Request",
    "request-service": "Service Request",
    "request service": "Service Request",
    project: "Project Inquiry",
    "project-inquiry": "Project Inquiry",
    "project inquiry": "Project Inquiry",
    technical: "Technical Support",
    "technical-support": "Technical Support",
    careers: "Careers",
  }

  if (subjectMap[normalized]) {
    return subjectMap[normalized]
  }

  return subject
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function buildPrefilledMessage(service: string | null) {
  return service ? `I am interested in learning more about: ${service}\n\n` : ""
}

export function ContactContent() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const prefilledSubject = useMemo(
    () => formatSubjectValue(searchParams.get("subject")),
    [searchParams],
  )
  const prefilledService = useMemo(() => searchParams.get("service") || "", [searchParams])
  const prefilledMessage = useMemo(
    () => buildPrefilledMessage(searchParams.get("service")),
    [searchParams],
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: prefilledSubject,
    message: prefilledMessage,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: prefilledSubject,
      message: prefilledMessage,
    })
    setErrors({})
    setIsSubmitted(false)
  }, [prefilledMessage, prefilledSubject])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        service: prefilledService || undefined,
      })

      if (!response.success) {
        throw new Error(response.error || response.message || "Failed to send message")
      }

      setIsSubmitted(true)
      toast({
        title: "Message Sent",
        description: response.message,
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: prefilledSubject,
      message: prefilledMessage,
    })
    setErrors({})
  }

  return (
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"} lg:col-span-2`}>
            <div className="mb-8 space-y-4">
              {contactInfo.map((item, index) => {
                const cardClassName = `flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all ${
                  item.link ? "cursor-pointer hover:border-primary/50 hover:shadow-md" : "cursor-default"
                } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`

                const cardContent = (
                  <>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-foreground">{item.content}</p>
                      {item.subtext && (
                        <p className="mt-1 text-sm text-muted-foreground">{item.subtext}</p>
                      )}
                    </div>
                  </>
                )

                if (!item.link) {
                  return (
                    <div
                      key={item.title}
                      className={cardClassName}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      {cardContent}
                    </div>
                  )
                }

                return (
                  <a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cardClassName}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    {cardContent}
                  </a>
                )
              })}
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9535449688626!2d3.2833!3d6.4661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b88d47c5f0b57%3A0x4a7b9f1c8b8c8b8c!2sFestac%20Town%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Xcel Pure Gas Location"
              />
            </div>
          </div>

          <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"} lg:col-span-3`}>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-foreground">Message Sent!</h3>
                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Thank you for contacting us. Our team will review your message and get back to
                    you within 24 hours.
                  </p>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.name ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className={errors.phone ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="pl-10"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className={errors.subject ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your nitrogen gas requirements..."
                      rows={6}
                      className={errors.message ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our privacy policy. We will only use your
                    information to respond to your inquiry.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-lg hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
