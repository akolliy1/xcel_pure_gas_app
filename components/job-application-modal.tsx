"use client"

import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { submitJobApplication } from "@/lib/api"
import { CheckCircle, FileText, Send, Upload, X } from "lucide-react"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  positions: string[]
  defaultPosition?: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  position: string
  coverLetter: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  position?: string
  coverLetter?: string
  cvFile?: string
}

const allowedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

function createInitialFormData(position = ""): FormData {
  return {
    fullName: "",
    email: "",
    phone: "",
    position,
    coverLetter: "",
  }
}

export function JobApplicationModal({
  isOpen,
  onClose,
  positions,
  defaultPosition = "",
}: JobApplicationModalProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData>(() => createInitialFormData(defaultPosition))
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setFormData(createInitialFormData(defaultPosition))
    setCvFile(null)
    setErrors({})
    setIsSubmitted(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [defaultPosition, isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.position.trim()) {
      newErrors.position = "Please select a position"
    }

    if (!cvFile) {
      newErrors.cvFile = "Please upload your CV"
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required"
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!allowedCvTypes.includes(file.type)) {
      setCvFile(null)
      setErrors((prev) => ({ ...prev, cvFile: "Please upload a PDF or Word document" }))
      event.target.value = ""
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setCvFile(null)
      setErrors((prev) => ({ ...prev, cvFile: "File size should be less than 5MB" }))
      event.target.value = ""
      return
    }

    setCvFile(file)
    setErrors((prev) => ({ ...prev, cvFile: undefined }))
  }

  const removeFile = () => {
    setCvFile(null)
    setErrors((prev) => ({ ...prev, cvFile: undefined }))

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePositionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, position: value }))

    if (errors.position) {
      setErrors((prev) => ({ ...prev, position: undefined }))
    }
  }

  const resetModalState = () => {
    setFormData(createInitialFormData())
    setCvFile(null)
    setErrors({})
    setIsSubmitted(false)
    setIsSubmitting(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await submitJobApplication({
        ...formData,
        cvFile: cvFile || undefined,
      })

      if (!response.success) {
        throw new Error(response.error || response.message || "Failed to submit application")
      }

      setIsSubmitted(true)
      toast({
        title: "Application Submitted",
        description: response.message,
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetModalState()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-[600px]">
        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-foreground">Application Submitted!</h3>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Thank you for applying for the {formData.position} position. Our HR team will review
              your application and contact you soon.
            </p>
            <Button onClick={handleClose} size="lg">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Apply for Position</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit your application. All fields marked with * are
                required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={errors.email ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className={errors.phone ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position Applying For *</Label>
                {defaultPosition ? (
                  <Input id="position" value={formData.position} readOnly disabled />
                ) : (
                  <Select
                    value={formData.position}
                    onValueChange={handlePositionChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={errors.position ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.position && <p className="text-xs text-destructive">{errors.position}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv-upload">Upload CV *</Label>
                <div className="rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary/50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                    disabled={isSubmitting}
                  />
                  {cvFile ? (
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{cvFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="cv-upload"
                      className="flex cursor-pointer flex-col items-center justify-center py-4"
                    >
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload your CV
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        PDF, DOC, DOCX (max 5MB)
                      </span>
                    </label>
                  )}
                </div>
                {errors.cvFile && <p className="text-xs text-destructive">{errors.cvFile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows={5}
                  className={errors.coverLetter ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.coverLetter && (
                  <p className="text-xs text-destructive">{errors.coverLetter}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
