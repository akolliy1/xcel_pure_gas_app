"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowRight, 
  FileText, 
  Folder,
  Calendar,
  MapPin,
  Download,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects, categories } from "@/lib/projects-data"

const resources = [
  {
    title: "Nitrogen Safety Guidelines",
    type: "PDF Document",
    size: "2.4 MB",
    description: "Complete safety protocols for handling, storing, and transporting nitrogen gas. Essential reading for all personnel.",
  },
  {
    title: "Equipment Specifications Catalog",
    type: "Technical Document",
    size: "5.1 MB",
    description: "Detailed specifications for our nitrogen generation equipment, storage tanks, and delivery systems.",
  },
  {
    title: "Industry Best Practices Guide",
    type: "White Paper",
    size: "1.8 MB",
    description: "Best practices for nitrogen applications across various industries including food, pharma, and manufacturing.",
  },
  {
    title: "Nitrogen Purity Standards",
    type: "Reference Guide",
    size: "850 KB",
    description: "Understanding nitrogen purity grades and their applications in different industrial processes.",
  },
  {
    title: "Emergency Response Procedures",
    type: "Safety Manual",
    size: "3.2 MB",
    description: "Step-by-step emergency response procedures for nitrogen-related incidents.",
  },
  {
    title: "Maintenance Schedule Template",
    type: "Excel Template",
    size: "450 KB",
    description: "Downloadable maintenance schedule template for nitrogen equipment and systems.",
  },
]

type TabType = "projects" | "resources"

export function ProjectsContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("projects")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className={`flex justify-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "projects"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Folder className="h-5 w-5" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "resources"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <FileText className="h-5 w-5" />
            Resources
          </button>
        </div>

        {/* Projects Content */}
        {activeTab === "projects" && (
          <>
            {/* Category Filter */}
            <div className={`flex flex-wrap justify-center gap-2 mb-12 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {project.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      View Project Details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <Folder className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-4">
                  No projects match the selected category.
                </p>
                <Button variant="outline" onClick={() => setSelectedCategory("All")}>
                  View All Projects
                </Button>
              </div>
            )}
          </>
        )}

        {/* Resources Content */}
        {activeTab === "resources" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div
                key={resource.title}
                className={`group bg-card rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <FileText className="h-6 w-6 text-secondary group-hover:text-secondary-foreground" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {resource.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({resource.size})
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {resource.description}
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/contact?subject=Resource Preview Request">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/contact?subject=Resource Download Request">
                      <Download className="h-4 w-4 mr-1" />
                      Request
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
