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
    <section className="bg-gradient-to-r from-primary to-primary/80 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            {title}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              <Link href={primaryHref}>
                {primaryText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8"
            >
              <a href={secondaryHref}>
                <Phone className="mr-2 h-5 w-5" />
                {secondaryText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
