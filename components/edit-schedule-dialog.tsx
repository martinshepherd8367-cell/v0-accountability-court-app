"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, XCircle, Save, Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface EditScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programId: number
}

interface SessionData {
  session: number
  topic: string
  date: string
  time: string
  location: string
  status: string
}

export function EditScheduleDialog({ open, onOpenChange, programName, programId }: EditScheduleDialogProps) {
  const { toast } = useToast()
  const [editingSession, setEditingSession] = useState<number | null>(null)
  const [editedValues, setEditedValues] = useState<Record<number, Partial<SessionData>>>({})
  const [applyToAllRemaining, setApplyToAllRemaining] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [showNotificationOptions, setShowNotificationOptions] = useState(false)
  const [pendingSaveSession, setPendingSaveSession] = useState<number | null>(null)

  const [sessions, setSessions] = useState<SessionData[]>([
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
  ])

  const getSessionValue = (sessionNum: number, field: keyof SessionData) => {
    if (editedValues[sessionNum]?.[field]) {
      return editedValues[sessionNum][field] as string
    }
    const session = sessions.find((s) => s.session === sessionNum)
    return session?.[field] || ""
  }

  const handleValueChange = (sessionNum: number, field: keyof SessionData, value: string) => {
    setEditedValues((prev) => ({
      ...prev,
      [sessionNum]: {
        ...prev[sessionNum],
        [field]: value,
      },
    }))
  }

  const handleCancelSession = (sessionNum: number) => {
    setSessions((prev) => prev.map((s) => (s.session === sessionNum ? { ...s, status: "cancelled" } : s)))
    toast({
      title: "Session Cancelled",
      description: `Session ${sessionNum} has been marked as cancelled.`,
    })
  }

  const handleSaveClick = (sessionNum: number) => {
    setPendingSaveSession(sessionNum)
    setShowNotificationOptions(true)
  }

  const handleConfirmSave = () => {
    if (pendingSaveSession === null) return

    const sessionNum = pendingSaveSession
    const changes = editedValues[sessionNum]

    // Apply changes to the current session
    setSessions((prev) =>
      prev.map((s) => {
        if (s.session === sessionNum) {
          return { ...s, ...changes }
        }
        // If applying to all remaining, update all future sessions
        if (applyToAllRemaining && s.session > sessionNum && changes) {
          return {
            ...s,
            time: changes.time || s.time,
            location: changes.location || s.location,
          }
        }
        return s
      }),
    )

    // Clear editing state
    setEditingSession(null)
    setEditedValues((prev) => {
      const updated = { ...prev }
      delete updated[sessionNum]
      return updated
    })

    // Send notification to participants
    const session = sessions.find((s) => s.session === sessionNum)
    const newDate = changes?.date || session?.date
    const newTime = changes?.time || session?.time
    const newLocation = changes?.location || session?.location

    const notificationMessage =
      customMessage ||
      `Schedule Update: ${applyToAllRemaining ? "All remaining sessions" : `Session ${sessionNum}`} ${
        changes?.date ? `will now be on ${new Date(newDate!).toLocaleDateString()}` : ""
      } ${changes?.time ? `at ${newTime}` : ""} ${changes?.location ? `in ${newLocation}` : ""}. Please update your calendar accordingly.`

    console.log("[v0] Sending notification to all participants:", notificationMessage)

    toast({
      title: "Schedule Updated",
      description: applyToAllRemaining
        ? `Session ${sessionNum} and all remaining sessions updated. Notifications sent to all participants.`
        : `Session ${sessionNum} updated. Notifications sent to all participants.`,
    })

    // Reset notification state
    setShowNotificationOptions(false)
    setPendingSaveSession(null)
    setApplyToAllRemaining(false)
    setCustomMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{programName} - Edit Schedule</DialogTitle>
          <DialogDescription>Update class times, locations, or cancel sessions for holidays</DialogDescription>
        </DialogHeader>

        {showNotificationOptions ? (
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Notify Participants</h3>
              <p className="text-sm text-muted-foreground">
                All participants will be notified of this schedule change.
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apply-all"
                  checked={applyToAllRemaining}
                  onCheckedChange={(checked) => setApplyToAllRemaining(checked as boolean)}
                />
                <Label htmlFor="apply-all" className="text-sm font-normal cursor-pointer">
                  Apply time and location changes to all remaining sessions
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">Custom Message (Optional)</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Add a custom message to participants about this schedule change..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNotificationOptions(false)
                    setPendingSaveSession(null)
                    setApplyToAllRemaining(false)
                    setCustomMessage("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmSave}>
                  <Send className="mr-2 h-4 w-4" />
                  Save & Notify Participants
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {sessions.map((session) => (
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingSession(null)
                              // Clear unsaved changes
                              setEditedValues((prev) => {
                                const updated = { ...prev }
                                delete updated[session.session]
                                return updated
                              })
                            }}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleSaveClick(session.session)}>
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
                          <Input
                            id={`date-${session.session}`}
                            type="date"
                            value={getSessionValue(session.session, "date")}
                            onChange={(e) => handleValueChange(session.session, "date", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`time-${session.session}`}>
                            <Clock className="mr-2 inline h-4 w-4" />
                            Time
                          </Label>
                          <Input
                            id={`time-${session.session}`}
                            type="time"
                            value={getSessionValue(session.session, "time")}
                            onChange={(e) => handleValueChange(session.session, "time", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${session.session}`}>
                          <MapPin className="mr-2 inline h-4 w-4" />
                          Location
                        </Label>
                        <Select
                          value={getSessionValue(session.session, "location")}
                          onValueChange={(value) => handleValueChange(session.session, "location", value)}
                        >
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
                        <Select
                          value={getSessionValue(session.session, "status")}
                          onValueChange={(value) => handleValueChange(session.session, "status", value)}
                        >
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
        )}
      </DialogContent>
    </Dialog>
  )
}
