"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Target,
  Lightbulb,
  TrendingUp,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CTABanner } from "@/components/cta-banner"
import { Project, getRelatedProjects } from "@/lib/projects-data"

interface ProjectDetailContentProps {
  project: Project
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const gallery = project.gallery || [project.image]
  const relatedProjects = getRelatedProjects(project.slug, project.category, 3)

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

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <>
      {/* Main Content */}
      <section ref={sectionRef} className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className={`lg:col-span-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={gallery[activeImageIndex]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeImageIndex 
                              ? "bg-white w-6" 
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Project Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {project.date}
                </span>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {project.challenge && (
                    <div className="bg-muted rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Target className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">The Challenge</h3>
                      </div>
                      <p className="text-muted-foreground">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="bg-muted rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Our Solution</h3>
                      </div>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Key Results</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className={`lg:col-span-1 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
              {/* Project Highlights */}
              <div className="bg-card rounded-xl p-6 border border-border mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Project Highlights</h3>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              {project.specifications && project.specifications.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
                  </div>
                  <div className="space-y-3">
                    {project.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-start gap-2 py-2 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <span className="text-sm font-medium text-foreground text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Need a Similar Solution?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Contact us to discuss how we can help with your project requirements.
                </p>
                <Button 
                  asChild 
                  className="w-full bg-white text-primary hover:bg-white/90"
                >
                  <Link href={`/contact?subject=service&service=${encodeURIComponent(project.title)}`}>
                    Request Similar Service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Related Projects
              </h2>
              <p className="text-muted-foreground">
                Explore more projects in the {project.category} category
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((related, index) => (
                <Link
                  key={related.slug}
                  href={`/projects/${related.slug}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white font-semibold">
                      {related.title}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {related.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Start Your Project?"
        description="Contact our team to discuss your nitrogen gas requirements and get a customized solution."
        primaryText="Get a Quote"
        primaryHref="/contact?subject=quote"
      />
    </>
  )
}
