import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  to?: string // optional path if you want custom routing
}

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <Button
      variant="outline"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="flex items-center gap-2"
    >
      <ArrowLeft size={16} />
      Back
    </Button>
  )
}
