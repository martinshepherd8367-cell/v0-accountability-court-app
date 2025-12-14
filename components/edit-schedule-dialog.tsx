"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, XCircle, Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EditScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programId: number
}

export function EditScheduleDialog({ open, onOpenChange, programName, programId }: EditScheduleDialogProps) {
  const [editingSession, setEditingSession] = useState<number | null>(null)

  // Sample upcoming sessions that can be edited
  const upcomingSessions = [
    {
      session: 5,
      topic: "Emotional Regulation Techniques",
      date: "2024-12-21",
      time: "14:00",
      location: "Courtroom 3A",
      status: "scheduled",
    },
    {
      session: 6,
      topic: "Building Healthy Relationships",
      date: "2025-01-04",
      time: "14:00",
      location: "Courtroom 3A",
      status: "scheduled",
    },
    {
      session: 7,
      topic: "Communication Skills",
      date: "2025-01-11",
      time: "14:00",
      location: "Courtroom 3A",
      status: "scheduled",
    },
    {
      session: 8,
      topic: "Problem-Solving Strategies",
      date: "2025-01-18",
      time: "14:00",
      location: "Courtroom 3A",
      status: "scheduled",
    },
  ]

  const handleCancelSession = (sessionNum: number) => {
    console.log("[v0] Cancelling session:", sessionNum)
    // Logic to cancel/mark session
  }

  const handleSaveChanges = (sessionNum: number) => {
    console.log("[v0] Saving changes for session:", sessionNum)
    setEditingSession(null)
    // Logic to save changes
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{programName} - Edit Schedule</DialogTitle>
          <DialogDescription>Update class times, locations, or cancel sessions for holidays</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.session} className="rounded-lg border p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">
                      Session {session.session}: {session.topic}
                    </h4>
                    {session.status === "cancelled" && (
                      <Badge variant="destructive" className="text-xs">
                        Cancelled
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editingSession === session.session ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingSession(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSaveChanges(session.session)}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingSession(session.session)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleCancelSession(session.session)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {editingSession === session.session ? (
                  <div className="grid gap-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`date-${session.session}`}>
                          <Calendar className="mr-2 inline h-4 w-4" />
                          Date
                        </Label>
                        <Input id={`date-${session.session}`} type="date" defaultValue={session.date} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`time-${session.session}`}>
                          <Clock className="mr-2 inline h-4 w-4" />
                          Time
                        </Label>
                        <Input id={`time-${session.session}`} type="time" defaultValue={session.time} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${session.session}`}>
                        <MapPin className="mr-2 inline h-4 w-4" />
                        Location
                      </Label>
                      <Select defaultValue={session.location}>
                        <SelectTrigger id={`location-${session.session}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Courtroom 3A">Courtroom 3A</SelectItem>
                          <SelectItem value="Courtroom 2B">Courtroom 2B</SelectItem>
                          <SelectItem value="Meeting Room A">Meeting Room A</SelectItem>
                          <SelectItem value="Meeting Room B">Meeting Room B</SelectItem>
                          <SelectItem value="Conference Room">Conference Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`status-${session.session}`}>Status</Label>
                      <Select defaultValue={session.status}>
                        <SelectTrigger id={`status-${session.session}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="cancelled">Cancelled (Holiday/Event)</SelectItem>
                          <SelectItem value="rescheduled">Rescheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
