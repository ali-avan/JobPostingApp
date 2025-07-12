import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/modeToggle"

export default function TopHeader() {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Job Listings
      </h1>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button onClick={() => navigate("/add")}>+ Add Job</Button>
      </div>
    </div>
  )
}
