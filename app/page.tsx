import { HeroSection } from "@/components/hero-section"
import { HomeAboutPreview } from "@/components/home-about-preview"
import { HomeServicesPreview } from "@/components/home-services-preview"
import { HomeMissionPreview } from "@/components/home-mission-preview"
import { CTABanner } from "@/components/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeAboutPreview />
      <HomeServicesPreview />
      <HomeMissionPreview />
      <CTABanner />
    </>
  )
}
