"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Building
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
    link: "https://maps.google.com/?q=Festac+Lagos+Nigeria"
  },
  { 
    icon: Phone, 
    title: "Phone", 
    content: "+234 806 497 5518",
    subtext: "24/7 Emergency Line Available",
    link: "tel:+2348064975518"
  },
  { 
    icon: Mail, 
    title: "Email", 
    content: "info@xcelpuregas.com",
    subtext: "admin@xcelpuregas.com",
    link: "mailto:info@xcelpuregas.com"
  },
  { 
    icon: Clock, 
    title: "Business Hours", 
    content: "Mon - Fri: 8:00 AM - 6:00 PM",
    subtext: "Sat: 9:00 AM - 2:00 PM",
  },
]

const inquiryTypes = [
  "General Inquiry",
  "Request a Quote",
  "Technical Support",
  "Partnership Opportunity",
  "Careers",
  "Project Inquiry",
  "Other",
]

export function ContactContent() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const sectionRef = useRef<HTMLElement>(null)

  // Pre-fill form from URL parameters
  useEffect(() => {
    const subject = searchParams.get("subject")
    const service = searchParams.get("service")
    
    if (subject) {
      // Map subject to inquiry type
      let inquiryType = "General Inquiry"
      if (subject.toLowerCase().includes("quote")) {
        inquiryType = "Request a Quote"
      } else if (subject.toLowerCase().includes("project")) {
        inquiryType = "Project Inquiry"
      } else if (subject.toLowerCase().includes("technical")) {
        inquiryType = "Technical Support"
      }
      
      setFormData(prev => ({
        ...prev,
        inquiryType,
        message: service ? `I am interested in learning more about: ${service}\n\n` : ""
      }))
    }
  }, [searchParams])

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.inquiryType) newErrors.inquiryType = "Please select an inquiry type"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
        inquiryType: formData.inquiryType,
        message: formData.message,
      })

      if (response.success) {
        setIsSubmitted(true)
        toast({
          title: "Message Sent",
          description: response.message,
        })
      } else {
        throw new Error(response.error || "Failed to send message")
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", phone: "", company: "", inquiryType: "", message: "" })
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info & Map */}
          <div className={`lg:col-span-2 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <a
                  key={item.title}
                  href={item.link}
                  target={item.link?.startsWith("http") ? "_blank" : undefined}
                  rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all ${
                    item.link ? "cursor-pointer" : "cursor-default"
                  } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-foreground mt-1">{item.content}</p>
                    {item.subtext && (
                      <p className="text-muted-foreground text-sm mt-1">{item.subtext}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9535449688626!2d3.2833!3d6.4661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b88d47c5f0b57%3A0x4a7b9f1c8b8c8b8c!2sFestac%20Town%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Xcel Pure Gas Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-3 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for contacting us. Our team will review your message and 
                    get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
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
                      {errors.name && (
                        <p className="text-destructive text-xs">{errors.name}</p>
                      )}
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
                      {errors.email && (
                        <p className="text-destructive text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
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
                      {errors.phone && (
                        <p className="text-destructive text-xs">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.inquiryType ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select an inquiry type</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="text-destructive text-xs">{errors.inquiryType}</p>
                    )}
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
                    {errors.message && (
                      <p className="text-destructive text-xs">{errors.message}</p>
                    )}
                  </div>

                  {/* Privacy Note */}
                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our privacy policy. We will only use your 
                    information to respond to your inquiry.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-lg"
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
