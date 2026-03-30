import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { ProjectDetailContent } from "./project-detail-content"
import { getProjectBySlug, projects } from "@/lib/projects-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.category}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title }
        ]}
      />
      <ProjectDetailContent project={project} />
    </>
  )
}
