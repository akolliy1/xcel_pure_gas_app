// API abstraction layer for form submissions
// This module provides a clean interface for backend integration
// Currently uses placeholder implementations that can be easily swapped with real API calls

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  inquiryType: string
  message: string
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

// Contact Form API
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Placeholder implementation - replace with actual API call
  // Example with EmailJS:
  // const response = await emailjs.send(
  //   'YOUR_SERVICE_ID',
  //   'YOUR_TEMPLATE_ID',
  //   { ...data },
  //   'YOUR_PUBLIC_KEY'
  // )

  // Example with Resend:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })

  // Simulate success for now
  console.log('Contact form submission:', data)
  
  return {
    success: true,
    message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
  }
}

// Job Application API
export async function submitJobApplication(data: JobApplicationData): Promise<ApiResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For file uploads, you would typically:
  // 1. Upload the CV to a storage service (S3, Cloudinary, etc.)
  // 2. Send the application data along with the file URL

  // Example implementation:
  // const formData = new FormData()
  // formData.append('fullName', data.fullName)
  // formData.append('email', data.email)
  // formData.append('phone', data.phone)
  // formData.append('position', data.position)
  // formData.append('coverLetter', data.coverLetter)
  // if (data.cvFile) {
  //   formData.append('cv', data.cvFile)
  // }
  //
  // const response = await fetch('/api/careers/apply', {
  //   method: 'POST',
  //   body: formData,
  // })

  // Simulate success for now
  console.log('Job application submission:', { ...data, cvFile: data.cvFile?.name })
  
  return {
    success: true,
    message: `Thank you for applying for the ${data.position} position. We have received your application and will review it shortly.`,
  }
}

// Quote Request API
export async function submitQuoteRequest(data: ContactFormData & { service?: string }): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log('Quote request submission:', data)
  
  return {
    success: true,
    message: 'Your quote request has been received. Our team will prepare a customized quote and contact you within 24-48 hours.',
  }
}

// Project Inquiry API
export async function submitProjectInquiry(data: { projectType: string; contact: ContactFormData }): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log('Project inquiry submission:', data)
  
  return {
    success: true,
    message: 'Thank you for your interest. A specialist will contact you to discuss your project requirements.',
  }
}
