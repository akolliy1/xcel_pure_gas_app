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
          ? "border-border/60 bg-background/95 py-2 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.55)] lg:bg-background/80 lg:backdrop-blur-xl"
          : "border-white/10 bg-background/95 py-4 shadow-sm lg:border-transparent lg:bg-black/10 lg:shadow-none lg:backdrop-blur-md"
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
            className={`hidden items-center gap-2 rounded-full border px-2 py-2 shadow-lg shadow-black/5 transition-all duration-300 lg:flex lg:backdrop-blur-xl ${
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
                  aria-current={isActive ? "page" : undefined}
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
            className="relative z-10 rounded-full border border-border/70 bg-background/95 p-2.5 text-foreground shadow-sm transition-all duration-300 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <div
          id="mobile-navigation"
          className={`fixed inset-0 top-0 z-0 overflow-y-auto bg-background pt-24 pb-10 text-foreground shadow-[0_25px_100px_-35px_rgba(15,23,42,0.45)] transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mx-auto flex min-h-full max-w-sm flex-col items-stretch gap-3 px-6">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-2xl px-5 py-4 text-center text-base font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "border border-border bg-muted/40 text-foreground hover:border-primary/30 hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Button asChild size="lg" className="mt-4 w-full rounded-full px-6 shadow-lg shadow-primary/25">
              <Link href="/contact?subject=quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
