import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ServicesContent } from "./services-content"
import { CTABanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Xcel Pure Gas LTD's comprehensive nitrogen gas services including gas production, oil & gas services, industrial applications, equipment leasing, and consulting.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Comprehensive nitrogen gas solutions tailored to meet your industry needs."
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServicesContent />
      <CTABanner
        title="Need a Custom Solution?"
        description="Our team of experts is ready to design a tailored nitrogen gas solution for your specific requirements."
        primaryText="Request Service"
        primaryHref="/contact?subject=service&service=Custom%20Nitrogen%20Solution"
      />
    </>
  )
}
