import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { CareersContent } from "./careers-content"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Xcel Pure Gas LTD team. Explore exciting career opportunities in the industrial gas industry with competitive benefits and growth potential.",
}

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers"
        description="Join our growing team and build a rewarding career in the industrial gas industry."
        breadcrumbs={[{ label: "Careers" }]}
      />
      <CareersContent />
    </>
  )
}
