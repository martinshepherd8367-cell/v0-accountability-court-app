import { ParticipantHeader } from "@/components/participant/participant-header"
import { ClassList } from "@/components/participant/class-list"
import { DailyJournal } from "@/components/participant/daily-journal"
import { MessageFacilitator } from "@/components/participant/message-facilitator"
import { AIAssistantDialog } from "@/components/participant/ai-assistant-dialog"

export default function ParticipantDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <ParticipantHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">My Classes</h1>
            <p className="text-sm text-muted-foreground">Track your progress and complete assignments</p>
          </div>

          <ClassList />

          <div className="grid gap-6 md:grid-cols-3">
            <DailyJournal />
            <MessageFacilitator />
            <AIAssistantDialog />
          </div>
        </div>
      </main>
    </div>
  )
}
