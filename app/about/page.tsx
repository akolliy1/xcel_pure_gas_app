import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { AboutContent } from "./about-content"
import { CTABanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Xcel Pure Gas LTD - Nigeria's leading provider of high-purity nitrogen gas solutions. Our mission, vision, values, and the industries we serve.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn about our journey, values, and commitment to excellence in nitrogen gas solutions."
        breadcrumbs={[{ label: "About" }]}
      />
      <AboutContent />
      <CTABanner />
    </>
  )
}
