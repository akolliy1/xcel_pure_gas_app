import { NextResponse } from "next/server"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactRequestBody {
  name?: string
  email?: string
  phone?: string
  company?: string
  subject?: string
  message?: string
  service?: string
}

export async function POST(request: Request) {
  let body: ContactRequestBody

  try {
    body = (await request.json()) as ContactRequestBody
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body.",
        error: "Invalid request body.",
      },
      { status: 400 },
    )
  }

  const name = body.name?.trim() || ""
  const email = body.email?.trim() || ""
  const phone = body.phone?.trim() || ""
  const subject = body.subject?.trim() || ""
  const message = body.message?.trim() || ""
  const company = body.company?.trim() || undefined
  const service = body.service?.trim() || undefined

  if (!name || !email || !phone || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        message: "Please complete all required fields.",
        error: "Missing required contact form fields.",
      },
      { status: 400 },
    )
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email address.",
        error: "Invalid email address.",
      },
      { status: 400 },
    )
  }

  console.info("Contact form submission received", {
    name,
    email,
    phone,
    company,
    subject,
    service,
  })

  return NextResponse.json({
    success: true,
    message:
      subject.toLowerCase().includes("quote")
        ? "Your quote request has been sent successfully. Our team will contact you shortly."
        : "Your message has been sent successfully. Our team will get back to you shortly.",
  })
}
