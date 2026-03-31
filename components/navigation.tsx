"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isSolidHeader = isScrolled || !isHomePage

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isSolidHeader
          ? "border-border/60 bg-background/80 py-2 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.55)] backdrop-blur-xl"
          : "border-white/10 bg-black/10 py-4 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="relative z-10">
            <Image
              src="/images/logo.jpeg"
              alt="Xcel Pure Gas LTD"
              width={180}
              height={60}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          <div
            className={`hidden lg:flex items-center gap-2 rounded-full border px-2 py-2 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${
              isSolidHeader
                ? "border-border/70 bg-background/75"
                : "border-white/15 bg-white/10"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isSolidHeader
                        ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15"
                        : "bg-white/14 text-white shadow-sm ring-1 ring-white/25"
                      : isSolidHeader
                        ? "text-foreground/80 hover:bg-muted hover:text-foreground"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Button asChild className="rounded-full px-5 shadow-lg shadow-primary/25">
              <Link href="/contact?subject=quote">Get a Quote</Link>
            </Button>
          </div>

          <button
            className={`relative z-10 rounded-full border p-2.5 transition-all duration-300 lg:hidden ${
              isSolidHeader
                ? "border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur-xl"
                : "border-white/20 bg-black/10 text-white backdrop-blur-md"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <div
          className={`fixed inset-0 top-0 z-0 bg-background/92 pt-20 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-4 p-8">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full max-w-xs rounded-full px-5 py-3 text-center text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Button asChild className="mt-2 w-full max-w-xs rounded-full shadow-lg shadow-primary/25">
              <Link href="/contact?subject=quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
