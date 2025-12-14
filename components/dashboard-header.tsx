"use client"

import { useState } from "react"
import { ProgramLibraryDropdown } from "@/components/program-library-dropdown"
import { ParticipantsByClassModal } from "@/components/participants-by-class-modal"
import { FacilitatorAIAssistant } from "@/components/facilitator-ai-assistant"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onAddProgram?: (program: any) => void
}

export function DashboardHeader({ onAddProgram }: DashboardHeaderProps) {
  const [showParticipants, setShowParticipants] = useState(false)
  const [showAI, setShowAI] = useState(false)

  return (
    <>
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Accountability Court Programs</p>
          </div>

          <div className="flex gap-4">
            <Button variant="default" onClick={() => setShowParticipants(true)}>
              View Participants
            </Button>
            <Button variant="default" onClick={() => setShowAI(true)}>
              AI Assistant
            </Button>
            <ProgramLibraryDropdown onAddProgram={onAddProgram} />
          </div>
        </div>
      </header>

      <ParticipantsByClassModal open={showParticipants} onOpenChange={setShowParticipants} />
      <FacilitatorAIAssistant open={showAI} onOpenChange={setShowAI} />
    </>
  )
}
