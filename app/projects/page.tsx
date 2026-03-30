import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProjectsContent } from "./projects-content"
import { CTABanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Projects & Resources",
  description: "Explore Xcel Pure Gas LTD's successful projects and access valuable resources including technical documents and safety guidelines.",
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects & Resources"
        description="Explore our successful projects and access valuable technical resources."
        breadcrumbs={[{ label: "Projects" }]}
      />
      <ProjectsContent />
      <CTABanner
        title="Have a Project in Mind?"
        description="Let's discuss how we can support your next project with our nitrogen gas solutions."
        primaryText="Discuss Your Project"
        primaryHref="/contact?subject=Project Inquiry"
      />
    </>
  )
}
