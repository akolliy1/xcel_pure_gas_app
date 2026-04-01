"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

interface CTABannerProps {
  title?: string
  description?: string
  primaryText?: string
  primaryHref?: string
  secondaryText?: string
  secondaryHref?: string
}

export function CTABanner({
  title = "Ready to Get Started?",
  description = "Contact us today to discuss your nitrogen gas requirements and receive a customized quote.",
  primaryText = "Get a Quote",
  primaryHref = "/contact?subject=quote",
  secondaryText = "Call Us Now",
  secondaryHref = "tel:+2348064975518",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[url('/images/hero-2.jpg')] bg-cover bg-center bg-no-repeat md:bg-fixed" />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/15 bg-white/10 px-6 py-12 text-center shadow-[0_30px_120px_-35px_rgba(15,23,42,0.75)] backdrop-blur-md md:px-12 md:py-16">
          <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
            Build with confidence
          </span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white text-balance md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            {description}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-w-[220px] bg-primary text-white shadow-xl shadow-primary/30"
            >
              <Link href={primaryHref}>
                {primaryText}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white/30 bg-white/10 text-white hover:border-white hover:bg-white hover:text-secondary"
            >
              <a href={secondaryHref}>
                <Phone className="h-5 w-5" />
                {secondaryText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
