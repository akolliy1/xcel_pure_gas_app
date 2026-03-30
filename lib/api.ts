export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
  service?: string
}

export interface JobApplicationData {
  fullName: string
  email: string
  phone: string
  position: string
  coverLetter: string
  cvFile?: File
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: string
}

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again."

async function parseApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  let payload: ApiResponse<T> | null = null

  try {
    payload = (await response.json()) as ApiResponse<T>
  } catch {
    payload = null
  }

  if (!response.ok) {
    const errorMessage = payload?.error || payload?.message || DEFAULT_ERROR_MESSAGE

    return {
      success: false,
      message: payload?.message || errorMessage,
      error: errorMessage,
      data: payload?.data,
    }
  }

  return {
    success: payload?.success ?? true,
    message: payload?.message || "Request completed successfully.",
    data: payload?.data,
  }
}

async function handleRequestError(error: unknown): Promise<ApiResponse> {
  return {
    success: false,
    message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
    error: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
  }
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return parseApiResponse(response)
  } catch (error) {
    return handleRequestError(error)
  }
}

export async function submitJobApplication(data: JobApplicationData): Promise<ApiResponse> {
  try {
    const formData = new FormData()

    formData.append("fullName", data.fullName)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("position", data.position)
    formData.append("coverLetter", data.coverLetter)

    if (data.cvFile) {
      formData.append("cv", data.cvFile)
    }

    const response = await fetch("/api/job-application", {
      method: "POST",
      body: formData,
    })

    return parseApiResponse(response)
  } catch (error) {
    return handleRequestError(error)
  }
}

export async function submitQuoteRequest(
  data: Omit<ContactFormData, "subject">,
): Promise<ApiResponse> {
  return submitContactForm({
    ...data,
    subject: "Quote Request",
  })
}

export async function submitProjectInquiry(data: {
  projectType: string
  contact: Omit<ContactFormData, "subject" | "service">
}): Promise<ApiResponse> {
  return submitContactForm({
    ...data.contact,
    subject: "Project Inquiry",
    service: data.projectType,
  })
}
