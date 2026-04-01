"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

const services = [
  { href: "/services", label: "Nitrogen Gas Supply" },
  { href: "/services", label: "Pipeline Services" },
  { href: "/services", label: "Equipment Leasing" },
  { href: "/services", label: "Technical Support" },
  { href: "/services", label: "Consulting" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.jpeg"
              alt="Xcel Pure Gas LTD"
              width={160}
              height={50}
              className="h-12 w-auto mb-6" {/* brightness-0 invert"*/}
            />
            <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-6">
              Leading provider of high-purity nitrogen gas solutions in Nigeria, 
              serving industries with innovation, safety, and reliability.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80 text-sm">
                  Festac, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+2348064975518"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  +234 806 497 5518
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:info@xcelpuregas.com"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    info@xcelpuregas.com
                  </a>
                  <a
                    href="mailto:admin@xcelpuregas.com"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    admin@xcelpuregas.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/70 text-sm text-center md:text-left">
              &copy; {currentYear} Xcel Pure Gas LTD. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
