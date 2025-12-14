import { AddCurriculumDialog } from "@/components/add-curriculum-dialog"
import { AIAssistantDialog } from "@/components/ai-assistant-dialog"
import { ParticipantsByClassDialog } from "@/components/participants-by-class-dialog"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Accountability Court Programs</p>
        </div>

        <div className="flex items-center gap-2">
          <ParticipantsByClassDialog />
          <AIAssistantDialog />
          <AddCurriculumDialog />
        </div>
      </div>
    </header>
  )
}
