"use client"

import { useState, useRef } from "react"
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
import { 
  Upload, 
  CheckCircle, 
  X, 
  FileText,
  Send 
} from "lucide-react"

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

export function JobApplicationModal({ 
  isOpen, 
  onClose, 
  positions, 
  defaultPosition = "" 
}: JobApplicationModalProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    position: defaultPosition,
    coverLetter: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

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
    
    if (!formData.position) {
      newErrors.position = "Please select a position"
    }
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required"
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cvFile: "Please upload a PDF or Word document" }))
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: "File size should be less than 5MB" }))
        return
      }
      setCvFile(file)
      setErrors(prev => ({ ...prev, cvFile: undefined }))
    }
  }

  const removeFile = () => {
    setCvFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({ ...prev, position: value }))
    if (errors.position) {
      setErrors(prev => ({ ...prev, position: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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

      if (response.success) {
        setIsSubmitted(true)
        toast({
          title: "Application Submitted",
          description: response.message,
        })
      } else {
        throw new Error(response.error || "Failed to submit application")
      }
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
    // Reset form when closing
    if (isSubmitted) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        coverLetter: "",
      })
      setCvFile(null)
      setIsSubmitted(false)
    }
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Application Submitted!
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for applying for the {formData.position} position. 
              Our HR team will review your application and contact you soon.
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
                Fill out the form below to submit your application. All fields marked with * are required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Full Name */}
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
                {errors.fullName && (
                  <p className="text-destructive text-xs">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
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
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
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
                {errors.phone && (
                  <p className="text-destructive text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">Position Applying For *</Label>
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
                {errors.position && (
                  <p className="text-destructive text-xs">{errors.position}</p>
                )}
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <Label>Upload CV (PDF or Word, max 5MB)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 transition-colors hover:border-primary/50">
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
                    <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{cvFile.name}</p>
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
                      className="flex flex-col items-center justify-center py-4 cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX (max 5MB)
                      </span>
                    </label>
                  )}
                </div>
                {errors.cvFile && (
                  <p className="text-destructive text-xs">{errors.cvFile}</p>
                )}
              </div>

              {/* Cover Letter */}
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
                  <p className="text-destructive text-xs">{errors.coverLetter}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
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
