import { NextResponse } from "next/server"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const maxCvSize = 5 * 1024 * 1024

export async function POST(request: Request) {
  const formData = await request.formData()

  const fullName = formData.get("fullName")?.toString().trim() || ""
  const email = formData.get("email")?.toString().trim() || ""
  const phone = formData.get("phone")?.toString().trim() || ""
  const position = formData.get("position")?.toString().trim() || ""
  const coverLetter = formData.get("coverLetter")?.toString().trim() || ""
  const cvEntry = formData.get("cv")
  const cvFile = cvEntry instanceof File ? cvEntry : null

  if (!fullName || !email || !phone || !position || !coverLetter || !cvFile) {
    return NextResponse.json(
      {
        success: false,
        message: "Please complete all required application fields.",
        error: "Missing required job application fields.",
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

  if (coverLetter.length < 50) {
    return NextResponse.json(
      {
        success: false,
        message: "Your cover letter should be at least 50 characters.",
        error: "Cover letter is too short.",
      },
      { status: 400 },
    )
  }

  if (!allowedCvTypes.includes(cvFile.type)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please upload your CV as a PDF or Word document.",
        error: "Invalid CV file type.",
      },
      { status: 400 },
    )
  }

  if (cvFile.size > maxCvSize) {
    return NextResponse.json(
      {
        success: false,
        message: "Your CV must be smaller than 5MB.",
        error: "CV file is too large.",
      },
      { status: 400 },
    )
  }

  console.info("Job application received", {
    fullName,
    email,
    phone,
    position,
    cvFileName: cvFile.name,
  })

  return NextResponse.json({
    success: true,
    message: `Thank you for applying for the ${position} role. We have received your application and will review it shortly.`,
  })
}
