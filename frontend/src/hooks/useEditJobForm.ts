import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getJobById, updateJob } from "@/api"
import { toast } from "react-toastify"

export function useEditJobForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full-time",
    tags: "",
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadJob = async () => {
      try {
        const job = await getJobById(Number(id))
        setForm({
          title: job.title,
          company: job.company,
          location: job.location,
          job_type: job.job_type,
          tags: (job.tags || []).join(", "),
        })
      } catch (err) {
        toast.error("Job not found.")
        navigate("/jobs")
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleJobTypeChange = (value: string) => {
    setForm((prev) => ({ ...prev, job_type: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { title, company, location, job_type, tags } = form

    if (!title || !company || !location || !job_type) {
      setError("Please fill all required fields.")
      return
    }

    const updatedJob = {
      title,
      company,
      location,
      job_type,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    }

    try {
      setSubmitting(true)
      await updateJob(Number(id), updatedJob)
      toast.success("Job updated successfully!")
      setTimeout(() => navigate("/jobs"), 1500)
    } catch {
      toast.error("Failed to update job.")
    } finally {
      setSubmitting(false)
    }
  }

  return {
    form,
    loading,
    submitting,
    error,
    handleChange,
    handleJobTypeChange,
    handleSubmit,
  }
}
