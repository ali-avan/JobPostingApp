import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import TopHeader from "@/components/TopHeader"
import FilterSort from "@/components/FilterSort"
import Spinner from "@/components/Spinner"
import JobCard from "@/components/JobCard"
import PaginationControls from "@/components/PaginationControls"

import { useHomePage } from "@/hooks/useHomePage"

export default function Home() {
  const {
    filters,
    jobs,
    loading,
    total,
    handleFilterChange,
    resetFilters,
    handleDelete,
    handlePageChange,
  } = useHomePage()

  return (
    <div className="max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <TopHeader />

      <div className="p-6 space-y-6">
        <FilterSort
          filters={filters}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {loading ? (
          <Spinner />
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No jobs found with current filters.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} />
              ))}
            </div>
            <PaginationControls
              page={filters.page}
              limit={filters.limit}
              total={total}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  )
}
