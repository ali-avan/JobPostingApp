import type { Filters } from "../api"

interface Props {
  filters: Filters
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onReset: () => void
}

export default function FilterSort({ filters, onChange, onReset }: Props) {
  return (
    <div className="bg-gray-200 dark:bg-zinc-900 p-6 rounded-xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 mb-6 space-y-4">

      <input
        name="q"
        value={filters.q}
        onChange={onChange}
        placeholder="Search keyword..."
        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <input
          name="title"
          value={filters.title}
          onChange={onChange}
          placeholder="Job title"
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="company"
          value={filters.company}
          onChange={onChange}
          placeholder="Company"
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          name="job_type"
          value={filters.job_type}
          onChange={onChange}
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All job types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          name="location"
          value={filters.location}
          onChange={onChange}
          placeholder="Location"
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="tag"
          value={filters.tag}
          onChange={onChange}
          placeholder="Tag"
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          name="sort"
          value={filters.sort}
          onChange={onChange}
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="posting_date_desc">Newest First</option>
          <option value="posting_date_asc">Oldest First</option>
        </select>

        <button
          onClick={onReset}
          className="col-span-full sm:col-span-1 flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-white rounded-md bg-green-400 hover:bg-green-500 dark:hover:bg-green-500 transition"
          title="Reset filters"
        >
          
          <span className="text-black">Reset</span>
        </button>
      </div>
    </div>
  )
}
