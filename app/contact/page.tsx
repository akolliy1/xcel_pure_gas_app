import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { ContactContent } from "./contact-content"
import { Spinner } from "@/components/ui/spinner"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Xcel Pure Gas LTD. Contact us for quotes, inquiries, or to discuss your nitrogen gas requirements.",
}

function ContactContentFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team to discuss your nitrogen gas requirements."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Suspense fallback={<ContactContentFallback />}>
        <ContactContent />
      </Suspense>
    </>
  )
}
