import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

import type { Job, Filters } from "@/api"
import { fetchJobs, deleteJob } from "@/api"

export function useHomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState<Filters>({
    title: searchParams.get("title") || "",
    company: searchParams.get("company") || "",
    job_type: searchParams.get("job_type") || "",
    location: searchParams.get("location") || "",
    tag: searchParams.get("tag") || "",
    sort: searchParams.get("sort") || "posting_date_desc",
    q: searchParams.get("q") || "",
    page: parseInt(searchParams.get("page") || "1"),
    limit: 10, 
  })

  const loadJobs = async () => {
    setLoading(true)
    try {
      const { jobs, total } = await fetchJobs(filters)
      setJobs(jobs)
      setTotal(total)
    } catch {
      toast.error("Failed to fetch jobs.")
    } finally {
      setLoading(false)
    }
  }

  const updateSearchParams = (updated: Partial<Filters>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updated).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value))
      else newParams.delete(key)
    })
    setSearchParams(newParams)
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const updated = { ...filters, [name]: value, page: 1 } 
    setFilters(updated)
    updateSearchParams(updated)
  }

  const resetFilters = () => {
    const defaultFilters: Filters = {
      title: "",
      company: "",
      job_type: "",
      location: "",
      tag: "",
      sort: "posting_date_desc",
      q: "",
      page: 1,
      limit: 10,
    }
    setFilters(defaultFilters)
    setSearchParams({})
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id)
      setJobs(prev => prev.filter(j => j.id !== id))
      toast.success("Job deleted successfully!")
    } catch {
      toast.error("Failed to delete job.")
    }
  }

  const handlePageChange = (newPage: number) => {
    const updated = { ...filters, page: newPage }
    setFilters(updated)
    updateSearchParams({ page: newPage })
  }

  useEffect(() => {
    loadJobs()
  }, [filters])

  useEffect(() => {
    const urlFilters: Filters = {
      title: searchParams.get("title") || "",
      company: searchParams.get("company") || "",
      job_type: searchParams.get("job_type") || "",
      location: searchParams.get("location") || "",
      tag: searchParams.get("tag") || "",
      sort: searchParams.get("sort") || "posting_date_desc",
      q: searchParams.get("q") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: 10,
    }
    setFilters(urlFilters)
  }, [searchParams])

  return {
    filters,
    jobs,
    loading,
    total,
    handleFilterChange,
    resetFilters,
    handleDelete,
    handlePageChange,
  }
}
