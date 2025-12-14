"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Download, FileText } from "lucide-react"

interface ReviewHomeworkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission?: {
    participant: string
    assignment: string
    program: string
    timestamp: string
    content: string
  }
}

export function ReviewHomeworkModal({ open, onOpenChange, submission }: ReviewHomeworkModalProps) {
  const [feedback, setFeedback] = useState("")
  const [completionScore, setCompletionScore] = useState(0)

  const handleSendFeedback = () => {
    console.log({
      feedback,
      completionScore,
      participant: submission?.participant,
    })
    onOpenChange(false)
    setFeedback("")
    setCompletionScore(0)
  }

  if (!submission) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Review Homework Submission</DialogTitle>
              <DialogDescription>Evaluate the assignment and provide feedback to the participant</DialogDescription>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Submission Header */}
          <div className="rounded-lg bg-teal-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white font-semibold">
                {submission.participant
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{submission.participant}</p>
                <p className="text-sm text-muted-foreground">{submission.program}</p>
                <p className="text-xs text-muted-foreground mt-1">{submission.timestamp}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Assignment Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <p className="font-semibold">{submission.assignment}</p>
            </div>
          </div>

          {/* Submission Content */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Submission Content</p>
            <div className="rounded-lg border bg-muted p-4 text-sm space-y-3 max-h-48 overflow-y-auto">
              <p>{submission.content}</p>
            </div>
          </div>

          {/* Completion Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assignment Completion</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => setCompletionScore(score)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    completionScore === score ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-teal-200"
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">1 = Incomplete, 5 = Excellent</p>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Feedback</label>
            <Textarea
              placeholder="Provide constructive feedback on the assignment..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border-teal-200 focus:border-teal-600 min-h-32"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendFeedback} className="bg-teal-600 hover:bg-teal-700">
              Send Feedback
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
