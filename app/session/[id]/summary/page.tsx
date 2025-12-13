import { SummaryHeader } from "@/components/summary-header"
import { FacilitatorNotesCard } from "@/components/facilitator-notes-card"
import { TakeawaysList } from "@/components/takeaways-list"
import { SessionStats } from "@/components/session-stats"

export default function SessionSummaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SummaryHeader />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <SessionStats />
          <FacilitatorNotesCard />
          <TakeawaysList />
        </div>
      </main>
    </div>
  )
}
