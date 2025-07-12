import type { Job } from "@/api"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface Props {
  job: Job
  onDelete: (id: number) => void
}

export default function JobCard({ job, onDelete }: Props) {
  const navigate = useNavigate()

  return (
    <Card className="transition-all duration-300 transform bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-400">

      <CardHeader>
        <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
          {job.title}
        </CardTitle>
        <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
          {job.company} · {job.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">
          <strong className="text-zinc-700 dark:text-zinc-300">Job Type:</strong>{" "}
          {job.job_type}
        </p>
        <p className="text-muted-foreground">
          <strong className="text-zinc-700 dark:text-zinc-300">Posted:</strong>{" "}
          {new Date(job.posting_date).toLocaleDateString()}
        </p>

        {job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/edit/${job.id}`)}
          >
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(job.id)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
