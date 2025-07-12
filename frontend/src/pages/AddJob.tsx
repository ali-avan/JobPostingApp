import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import JobForm from "@/components/JobForm"
import BackButton from "@/components/ui/BackButton"
import { useAddJobForm } from "@/hooks/useAddJobForm"

export default function AddJob() {
  const {
    form,
    error,
    loading,
    handleChange,
    handleJobTypeChange,
    handleSubmit,
  } = useAddJobForm()

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
        <BackButton />
        <JobForm
          form={form}
          error={error}
          loading={loading}
          onChange={handleChange}
          onJobTypeChange={handleJobTypeChange}
          onSubmit={handleSubmit}
          title="Add New Job"
        />
      </div>
    </>
  )
}
