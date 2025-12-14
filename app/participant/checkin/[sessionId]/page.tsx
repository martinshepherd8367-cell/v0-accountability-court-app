import { CheckInForm } from "@/components/participant/checkin-form"

export default function CheckInPage({ params }: { params: { sessionId: string } }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <CheckInForm sessionId={params.sessionId} />
    </div>
  )
}
