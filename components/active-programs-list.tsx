"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, MoreVertical, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ViewSessionsDialog } from "./view-sessions-dialog"
import { EditScheduleDialog } from "./edit-schedule-dialog"
import { ManageParticipantsDialog } from "./manage-participants-dialog"

const activePrograms = [
  {
    id: 1,
    program: "Prime Solutions",
    currentSession: 4,
    totalSessions: 12,
    nextClass: {
      session: 4,
      topic: "Cognitive Restructuring",
      date: "Today, 2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
    },
    progress: 33,
  },
  {
    id: 2,
    program: "CoDA Recovery Program",
    currentSession: 2,
    totalSessions: 8,
    nextClass: {
      session: 2,
      topic: "Understanding Codependency",
      date: "Thu, Dec 19 at 10:00 AM",
      location: "Meeting Room B",
      participants: 12,
    },
    progress: 25,
  },
  {
    id: 3,
    program: "Anger Management",
    currentSession: 6,
    totalSessions: 10,
    nextClass: {
      session: 6,
      topic: "Conflict Resolution Skills",
      date: "Fri, Dec 20 at 3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
    },
    progress: 60,
  },
]

export function ActiveProgramsList() {
  const [viewSessionsOpen, setViewSessionsOpen] = useState(false)
  const [editScheduleOpen, setEditScheduleOpen] = useState(false)
  const [manageParticipantsOpen, setManageParticipantsOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<{ id: number; name: string } | null>(null)

  const handleOpenDialog = (
    programId: number,
    programName: string,
    dialogType: "sessions" | "schedule" | "participants",
  ) => {
    setSelectedProgram({ id: programId, name: programName })

    if (dialogType === "sessions") {
      setViewSessionsOpen(true)
    } else if (dialogType === "schedule") {
      setEditScheduleOpen(true)
    } else if (dialogType === "participants") {
      setManageParticipantsOpen(true)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Program Runs</CardTitle>
          <CardDescription>All your ongoing program sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePrograms.map((program) => (
              <div
                key={program.id}
                className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex-1 space-y-3">
                  {/* Program Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{program.program}</h3>
                        <Badge variant="outline" className="text-xs">
                          Session {program.currentSession} of {program.totalSessions}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Next: {program.nextClass.topic}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDialog(program.id, program.program, "sessions")}>
                          View All Sessions
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDialog(program.id, program.program, "schedule")}>
                          Edit Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDialog(program.id, program.program, "participants")}>
                          Manage Participants
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">End Program</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <Progress value={program.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{program.progress}% Complete</p>
                  </div>

                  {/* Next Class Details */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{program.nextClass.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{program.nextClass.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      <span>{program.nextClass.participants} participants</span>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-primary"
                    onClick={() => handleOpenDialog(program.id, program.program, "sessions")}
                  >
                    View full schedule
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProgram && (
        <>
          <ViewSessionsDialog
            open={viewSessionsOpen}
            onOpenChange={setViewSessionsOpen}
            programName={selectedProgram.name}
            programId={selectedProgram.id}
          />
          <EditScheduleDialog
            open={editScheduleOpen}
            onOpenChange={setEditScheduleOpen}
            programName={selectedProgram.name}
            programId={selectedProgram.id}
          />
          <ManageParticipantsDialog
            open={manageParticipantsOpen}
            onOpenChange={setManageParticipantsOpen}
            programName={selectedProgram.name}
            programId={selectedProgram.id}
          />
        </>
      )}
    </>
  )
}
