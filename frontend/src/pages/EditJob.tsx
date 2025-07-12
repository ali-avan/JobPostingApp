import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import JobForm from "@/components/JobForm"
import BackButton from "@/components/ui/BackButton"
import { useEditJobForm } from "@/hooks/useEditJobForm"

export default function EditJob() {
  const {
    form,
    loading,
    submitting,
    error,
    handleChange,
    handleJobTypeChange,
    handleSubmit,
  } = useEditJobForm()

  if (loading)
    return <p className="p-6 text-muted-foreground">Loading job details...</p>

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
        <BackButton />
        <JobForm
          form={form}
          error={error}
          loading={submitting}
          onChange={handleChange}
          onJobTypeChange={handleJobTypeChange}
          onSubmit={handleSubmit}
          title="Edit Job"
        />
      </div>
    </>
  )
}
