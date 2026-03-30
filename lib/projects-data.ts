// Centralized project data for use across the application
// This makes it easy to manage projects and their dynamic routes

export interface Project {
  slug: string
  image: string
  title: string
  category: string
  location: string
  date: string
  description: string
  highlights: string[]
  fullDescription?: string
  challenge?: string
  solution?: string
  results?: string[]
  specifications?: { label: string; value: string }[]
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: "oil-field-nitrogen-supply",
    image: "/images/project-1.jpg",
    title: "Oil Field Nitrogen Supply",
    category: "Oil & Gas",
    location: "Niger Delta Region",
    date: "2024",
    description: "Large-scale nitrogen supply project for major oil field operations, providing continuous high-purity nitrogen for well maintenance and pipeline purging.",
    highlights: ["24/7 supply coverage", "99.9% purity achieved", "Zero safety incidents"],
    fullDescription: "This flagship project involved establishing a comprehensive nitrogen supply infrastructure for one of Nigeria's largest oil field operations. Our team worked around the clock to ensure uninterrupted supply of high-purity nitrogen essential for well maintenance, enhanced oil recovery operations, and critical pipeline purging activities.",
    challenge: "The client required a reliable nitrogen supply system capable of operating continuously in a challenging offshore environment while maintaining the highest purity standards and safety protocols.",
    solution: "We deployed our state-of-the-art mobile nitrogen generation units along with redundant supply systems to ensure zero downtime. Our team established multiple supply points strategically located across the field to minimize delivery times.",
    results: [
      "Achieved 99.99% uptime over the project duration",
      "Supplied over 50,000 cubic meters of nitrogen monthly",
      "Reduced client's operational costs by 35%",
      "Maintained perfect safety record throughout"
    ],
    specifications: [
      { label: "Project Duration", value: "Ongoing (Started Jan 2024)" },
      { label: "Nitrogen Purity", value: "99.9% - 99.999%" },
      { label: "Daily Supply Volume", value: "1,500+ cubic meters" },
      { label: "Supply Points", value: "8 locations across the field" },
      { label: "Response Time", value: "Under 4 hours" },
    ],
    gallery: ["/images/project-1.jpg", "/images/hero-1.jpg", "/images/hero-2.jpg"]
  },
  {
    slug: "pipeline-testing-project",
    image: "/images/project-2.jpg",
    title: "Pipeline Testing Project",
    category: "Pipeline Services",
    location: "Lagos - Ibadan Corridor",
    date: "2023",
    description: "Comprehensive pipeline pressure testing and purging services for a national gas distribution network spanning over 200km.",
    highlights: ["200+ km pipeline tested", "Completed ahead of schedule", "Industry-leading safety standards"],
    fullDescription: "This major infrastructure project involved the complete testing and commissioning of a new natural gas distribution pipeline connecting Lagos to Ibadan. Our scope included pre-commissioning cleaning, hydrostatic pressure testing, dewatering, and nitrogen purging operations.",
    challenge: "The project required coordinated testing of multiple pipeline segments across varied terrain while meeting strict regulatory requirements and an aggressive timeline.",
    solution: "We mobilized our specialized pipeline services team with multiple nitrogen generation units positioned along the pipeline route. Our engineering team developed a detailed testing protocol that allowed for parallel operations while maintaining stringent safety standards.",
    results: [
      "Completed all testing 2 weeks ahead of schedule",
      "Zero safety incidents during the entire project",
      "All pipeline segments passed pressure tests on first attempt",
      "Received commendation from regulatory authorities"
    ],
    specifications: [
      { label: "Pipeline Length", value: "217 kilometers" },
      { label: "Pipe Diameter", value: "24 inches" },
      { label: "Test Pressure", value: "1.5x operating pressure" },
      { label: "Project Duration", value: "6 months" },
      { label: "Nitrogen Volume Used", value: "75,000+ cubic meters" },
    ],
    gallery: ["/images/project-2.jpg", "/images/hero-3.jpg", "/images/about.jpg"]
  },
  {
    slug: "industrial-manufacturing-support",
    image: "/images/project-3.jpg",
    title: "Industrial Manufacturing Support",
    category: "Industrial",
    location: "Lagos Industrial Zone",
    date: "Ongoing",
    description: "Ongoing nitrogen supply and technical support for leading manufacturing facilities, supporting food packaging and metal fabrication processes.",
    highlights: ["Multiple facility support", "Customized delivery schedule", "Technical training provided"],
    fullDescription: "We provide comprehensive nitrogen supply services to a cluster of manufacturing facilities in the Lagos Industrial Zone. Our services support various applications including modified atmosphere packaging for food products, laser cutting operations, and heat treatment processes for metal fabrication.",
    challenge: "Each manufacturing facility had unique nitrogen requirements in terms of purity, pressure, and delivery schedules. Coordinating supply across multiple sites while maintaining cost efficiency was essential.",
    solution: "We implemented a hub-and-spoke distribution model with a central nitrogen storage facility serving multiple clients. Custom delivery schedules were developed for each facility based on their production patterns, ensuring just-in-time supply.",
    results: [
      "Supporting 12+ manufacturing facilities",
      "Reduced client inventory costs by 40%",
      "Achieved 99.5% on-time delivery rate",
      "Trained 50+ client personnel on nitrogen safety"
    ],
    specifications: [
      { label: "Facilities Served", value: "12 manufacturing plants" },
      { label: "Industries Covered", value: "Food, Metal, Electronics" },
      { label: "Monthly Supply", value: "25,000+ cubic meters" },
      { label: "Delivery Frequency", value: "Daily to weekly (customized)" },
      { label: "Purity Range", value: "99.5% - 99.999%" },
    ],
    gallery: ["/images/project-3.jpg", "/images/hero-1.jpg", "/images/hero-2.jpg"]
  },
  {
    slug: "pharmaceutical-facility-setup",
    image: "/images/hero-1.jpg",
    title: "Pharmaceutical Facility Setup",
    category: "Pharmaceuticals",
    location: "Abuja",
    date: "2023",
    description: "Complete nitrogen generation system installation for a pharmaceutical manufacturing facility, ensuring compliance with GMP standards.",
    highlights: ["GMP compliant installation", "99.999% purity system", "Full staff training"],
    fullDescription: "We designed and installed a turnkey nitrogen generation system for a new pharmaceutical manufacturing facility in Abuja. The system provides ultra-high purity nitrogen for various pharmaceutical processes including blanketing, purging, and packaging operations.",
    challenge: "The pharmaceutical industry requires extremely high purity nitrogen with strict documentation and traceability. The system needed to meet international GMP standards while being cost-effective for the client.",
    solution: "We specified and installed a membrane-based nitrogen generation system with inline purification to achieve 99.999% purity. The system includes comprehensive monitoring and documentation features required for pharmaceutical compliance.",
    results: [
      "Passed all regulatory inspections on first attempt",
      "System achieving 99.999% purity consistently",
      "Reduced client's nitrogen costs by 60% vs cylinder supply",
      "Zero production stoppages due to nitrogen supply"
    ],
    specifications: [
      { label: "System Type", value: "Membrane + Purifier" },
      { label: "Output Capacity", value: "500 cubic meters/day" },
      { label: "Purity Achieved", value: "99.999%" },
      { label: "Compliance", value: "GMP, WHO-PQS" },
      { label: "Installation Time", value: "8 weeks" },
    ],
    gallery: ["/images/hero-1.jpg", "/images/about.jpg", "/images/project-3.jpg"]
  },
  {
    slug: "food-processing-plant",
    image: "/images/hero-2.jpg",
    title: "Food Processing Plant",
    category: "Food & Beverage",
    location: "Port Harcourt",
    date: "2024",
    description: "Modified atmosphere packaging system setup for a large-scale food processing plant, extending product shelf life significantly.",
    highlights: ["50% shelf life increase", "Energy efficient system", "Ongoing maintenance support"],
    fullDescription: "We implemented a comprehensive nitrogen supply solution for a major food processing facility specializing in packaged snacks and beverages. The project included installation of nitrogen generation equipment specifically designed for food-grade applications.",
    challenge: "The client needed food-grade nitrogen for modified atmosphere packaging (MAP) to extend product shelf life while maintaining product quality and taste.",
    solution: "We installed PSA nitrogen generators with food-grade certification, providing a continuous supply of high-purity nitrogen directly to packaging lines. The system includes automatic purity monitoring and integration with the client's production control systems.",
    results: [
      "Extended average product shelf life by 50%",
      "Reduced product waste by 30%",
      "Energy costs 40% lower than previous system",
      "ROI achieved in under 18 months"
    ],
    specifications: [
      { label: "Application", value: "Modified Atmosphere Packaging" },
      { label: "Output Capacity", value: "200 cubic meters/hour" },
      { label: "Purity", value: "99.5% (food-grade)" },
      { label: "Integration", value: "6 packaging lines" },
      { label: "Certification", value: "Food-grade, HACCP compliant" },
    ],
    gallery: ["/images/hero-2.jpg", "/images/project-1.jpg", "/images/hero-3.jpg"]
  },
  {
    slug: "power-generation-support",
    image: "/images/hero-3.jpg",
    title: "Power Generation Support",
    category: "Energy",
    location: "Calabar",
    date: "2023",
    description: "Emergency nitrogen supply during power plant maintenance operations, ensuring safe working conditions during critical repairs.",
    highlights: ["48-hour response time", "Zero downtime achieved", "Safety protocols exceeded"],
    fullDescription: "We provided emergency nitrogen supply services during scheduled maintenance of a major gas-fired power plant. Our services included turbine purging, fire prevention inerting, and pipeline maintenance support operations.",
    challenge: "The power plant maintenance had a tight window during which the facility needed to be safely inerted and purged. Any delays would result in significant financial losses and potential grid instability.",
    solution: "We mobilized our rapid response team with mobile nitrogen generation units within 48 hours of notification. A dedicated supply chain was established to ensure continuous nitrogen availability throughout the maintenance period.",
    results: [
      "Responded within 48 hours of emergency call",
      "Supplied nitrogen continuously for 72-hour maintenance window",
      "Zero safety incidents during operations",
      "Plant returned to service on schedule"
    ],
    specifications: [
      { label: "Response Time", value: "48 hours" },
      { label: "Supply Duration", value: "72 hours continuous" },
      { label: "Volume Supplied", value: "15,000 cubic meters" },
      { label: "Application", value: "Turbine purging, Inerting" },
      { label: "Safety Record", value: "Zero incidents" },
    ],
    gallery: ["/images/hero-3.jpg", "/images/project-2.jpg", "/images/about.jpg"]
  },
]

export const categories = ["All", "Oil & Gas", "Pipeline Services", "Industrial", "Pharmaceuticals", "Food & Beverage", "Energy"]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getRelatedProjects(currentSlug: string, category: string, limit = 3): Project[] {
  return projects
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
}
