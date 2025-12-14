"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Edit2 } from "lucide-react"

interface Session {
  id: number
  number: number
  title: string
  date: string
  time: string
  location: string
}

interface EditScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  sessions: Session[]
}

export function EditScheduleModal({ open, onOpenChange, programName, sessions }: EditScheduleModalProps) {
  const [notifyParticipants, setNotifyParticipants] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [editDate, setEditDate] = useState("")
  const [editTime, setEditTime] = useState("")
  const [editLocation, setEditLocation] = useState("")

  const handleSaveEdit = () => {
    // Handle saving edited session
    setEditingSession(null)
  }

  const handleNotifyAndSave = () => {
    console.log({
      programName,
      notifyParticipants,
      customMessage,
      changesApplied: true,
    })
    onOpenChange(false)
  }

  if (editingSession) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Edit Session</DialogTitle>
                <DialogDescription>Update time, location, or cancel this session</DialogDescription>
              </div>
              <button onClick={() => setEditingSession(null)} className="rounded-full hover:bg-muted p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{editingSession.title}</h3>
              <p className="text-sm text-muted-foreground">Session {editingSession.number}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="border-teal-200 focus:border-teal-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="border-teal-200 focus:border-teal-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="border-teal-200 focus:border-teal-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingSession(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{programName} - Edit Schedule</DialogTitle>
              <DialogDescription>Update class times, locations, or cancel sessions for holidays</DialogDescription>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sessions List */}
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{session.title}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        📅 {session.date} at {session.time}
                      </span>
                      <span className="flex items-center gap-1">📍 {session.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSession(session)
                        setEditDate(session.date)
                        setEditTime(session.time)
                        setEditLocation(session.location)
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notify Participants Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold text-lg">Notify Participants</h3>
            <p className="text-sm text-muted-foreground">All participants will be notified of this schedule change.</p>

            <div className="flex items-center gap-2">
              <Checkbox
                id="apply-all"
                checked={notifyParticipants}
                onCheckedChange={(checked) => setNotifyParticipants(checked as boolean)}
              />
              <label htmlFor="apply-all" className="text-sm cursor-pointer">
                Apply time and location changes to all remaining sessions
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Message (Optional)</label>
              <Textarea
                placeholder="Add a custom message to participants about this schedule change..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="border-teal-200 focus:border-teal-600 min-h-24"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotifyAndSave} className="bg-teal-600 hover:bg-teal-700">
              <span className="mr-2">✈️</span>
              Save & Notify Participants
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
