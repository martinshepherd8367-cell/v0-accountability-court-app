"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, MoreVertical, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { EditScheduleModal } from "./edit-schedule-modal"
import { useState } from "react"

interface ActiveProgramsListProps {
  programs: Array<{
    id: number
    program: string
    currentSession: number
    totalSessions: number
    nextClass: {
      session: number
      topic: string
      date: string
      location: string
      participants: number
    }
    progress: number
    sessions: Array<{
      id: number
      number: number
      title: string
      date: string
      time: string
      location: string
    }>
  }>
  onDeleteProgram?: (id: number) => void
}

export function ActiveProgramsList({ programs, onDeleteProgram }: ActiveProgramsListProps) {
  const [editScheduleOpen, setEditScheduleOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<(typeof programs)[0] | null>(null)

  const handleEditSchedule = (program: (typeof programs)[0]) => {
    setSelectedProgram(program)
    setEditScheduleOpen(true)
  }

  console.log("[v0] ActiveProgramsList rendering with programs:", programs)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Program Runs</CardTitle>
          <CardDescription>All your ongoing program sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programs.map((program) => (
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
                        <DropdownMenuItem>View All Sessions</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSchedule(program)}>Edit Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Manage Participants</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDeleteProgram?.(program.id)}
                        >
                          End Program
                        </DropdownMenuItem>
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
                  <a href={`/facilitator/program/${program.id}/schedule`}>
                    <Button variant="link" className="h-auto p-0 text-xs text-primary">
                      View full schedule
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProgram && (
        <EditScheduleModal
          open={editScheduleOpen}
          onOpenChange={setEditScheduleOpen}
          programName={selectedProgram.program}
          sessions={selectedProgram.sessions}
        />
      )}
    </>
  )
}
