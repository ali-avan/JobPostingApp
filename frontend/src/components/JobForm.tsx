import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface JobFormProps {
  form: {
    title: string
    company: string
    location: string
    job_type: string
    tags: string
  }
  error?: string
  loading: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onJobTypeChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  title?: string
}

export default function JobForm({
  form,
  error,
  loading,
  onChange,
  onJobTypeChange,
  onSubmit,
  title = "Add Job",
}: JobFormProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0 mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={form.company}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="job_type">Job Type</Label>
              <Select value={form.job_type} onValueChange={onJobTypeChange}>
                <SelectTrigger id="job_type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={form.tags}
                onChange={onChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
