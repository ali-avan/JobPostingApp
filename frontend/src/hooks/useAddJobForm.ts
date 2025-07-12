import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { addJob } from "@/api"

export function useAddJobForm() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full-time",
    tags: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleJobTypeChange = (value: string) => {
    setForm(prev => ({ ...prev, job_type: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { title, company, location, job_type, tags } = form

    if (!title || !company || !location) {
      setError("Please fill in all required fields.")
      return
    }

    const jobData = {
      title,
      company,
      location,
      job_type,
      posting_date: new Date().toISOString().split("T")[0],
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    }

    try {
      setLoading(true)
      await addJob(jobData)
      toast.success("Job added successfully!")

      setForm({
        title: "",
        company: "",
        location: "",
        job_type: "Full-time",
        tags: "",
      })

      setTimeout(() => {
        navigate("/jobs")
      }, 1500)
    } catch {
      setError("Failed to add job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    error,
    loading,
    handleChange,
    handleJobTypeChange,
    handleSubmit,
  }
}
