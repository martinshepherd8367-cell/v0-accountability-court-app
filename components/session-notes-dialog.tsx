"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Save, FileText, CheckCircle2 } from "lucide-react"

interface SessionNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionTitle: string
  sessionNumber: number
}

export function SessionNotesDialog({ open, onOpenChange, sessionTitle, sessionNumber }: SessionNotesDialogProps) {
  const [saved, setSaved] = useState(false)
  const [notes, setNotes] = useState({
    dateTime: "",
    summary: "",
    groupDynamics: "",
    nextSessionPreview: "",
    courtQuestion: "",
    courtAnswer: "",
    teamExplanation: "",
  })

  const handleSave = () => {
    console.log("[v0] Saving session notes:", notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Session {sessionNumber} Notes
          </DialogTitle>
          <DialogDescription>Complete the session documentation for: {sessionTitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date/Time */}
          <div className="space-y-2">
            <Label htmlFor="dateTime">Date/Time</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={notes.dateTime}
              onChange={(e) => setNotes({ ...notes, dateTime: e.target.value })}
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Session Summary</Label>
            <Textarea
              id="summary"
              placeholder="Provide an overview of what was covered in this session, key concepts discussed, and activities completed..."
              value={notes.summary}
              onChange={(e) => setNotes({ ...notes, summary: e.target.value })}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Describe the session focus, concepts taught, and participant activities.
            </p>
          </div>

          {/* Group Dynamics */}
          <div className="space-y-2">
            <Label htmlFor="groupDynamics">Group Dynamics</Label>
            <Textarea
              id="groupDynamics"
              placeholder="Describe participant engagement, cooperation, concerns raised, and overall group interaction..."
              value={notes.groupDynamics}
              onChange={(e) => setNotes({ ...notes, groupDynamics: e.target.value })}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Note participant attentiveness, cooperation, and interaction patterns.
            </p>
          </div>

          {/* Next Session Preview */}
          <div className="space-y-2">
            <Label htmlFor="nextSession">Next Session Preview</Label>
            <Textarea
              id="nextSession"
              placeholder="Briefly describe what will be covered in the next session..."
              value={notes.nextSessionPreview}
              onChange={(e) => setNotes({ ...notes, nextSessionPreview: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Court Q&A Section */}
          <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
            <h3 className="font-semibold text-sm">Court Question and Answer</h3>

            <div className="space-y-2">
              <Label htmlFor="courtQuestion">Question (What the court might ask)</Label>
              <Textarea
                id="courtQuestion"
                placeholder="What question might the court or probation officer ask about this session?"
                value={notes.courtQuestion}
                onChange={(e) => setNotes({ ...notes, courtQuestion: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courtAnswer">Answer (Expected participant response)</Label>
              <Textarea
                id="courtAnswer"
                placeholder="What should participants be able to say about what they learned?"
                value={notes.courtAnswer}
                onChange={(e) => setNotes({ ...notes, courtAnswer: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamExplanation">Explanation for Team Member</Label>
              <Textarea
                id="teamExplanation"
                placeholder="Brief explanation of session objectives for court personnel or case managers..."
                value={notes.teamExplanation}
                onChange={(e) => setNotes({ ...notes, teamExplanation: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              {saved ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Notes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
