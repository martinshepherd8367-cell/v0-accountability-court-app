import { use } from "react"
import { ClassDetails } from "@/components/participant/class-details"

export default function ClassDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  return (
    <div className="min-h-screen bg-background">
      <ClassDetails classId={resolvedParams.id} />
    </div>
  )
}
