import { ClassDetails } from "@/components/participant/class-details"

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <ClassDetails classId={params.id} />
    </div>
  )
}
