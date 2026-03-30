"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timeout = setTimeout(() => {
      setIsAnimating(false)
    }, 50)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div
      className={`transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  )
}
