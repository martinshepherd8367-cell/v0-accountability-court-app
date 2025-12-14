"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, XCircle, FileText, Download } from "lucide-react"

type HomeworkSubmission = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  assignmentTitle: string
  submittedAt: string
  sessionNumber: number
  content: string
}

const predefinedFeedback = [
  "Excellent work! Your responses demonstrate a clear understanding of the concepts.",
  "Good effort. Please review the session materials and resubmit with more detail.",
  "Well done. Your insights show thoughtful reflection on the material.",
  "Please expand on your answers with specific examples from your experience.",
  "Outstanding! This assignment meets all the requirements and shows deep understanding.",
  "Needs improvement. Let's schedule time to discuss this assignment further.",
]

type HomeworkReviewDialogProps = {
  submission: HomeworkSubmission | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HomeworkReviewDialog({ submission, open, onOpenChange }: HomeworkReviewDialogProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<string>("")
  const [customMessage, setCustomMessage] = useState("")
  const [judgement, setJudgement] = useState<"approved" | "needs-revision" | null>(null)

  const handleSubmit = () => {
    console.log("[v0] Submitting homework review:", {
      judgement,
      feedback: selectedFeedback || customMessage,
    })
    // Reset form
    setJudgement(null)
    setSelectedFeedback("")
    setCustomMessage("")
    onOpenChange(false)
  }

  if (!submission) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Review Homework Submission</DialogTitle>
          <DialogDescription>Evaluate the assignment and provide feedback to the participant</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            {/* Participant Info */}
            <div className="flex items-center gap-3 rounded-lg border bg-accent/20 p-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {submission.participantInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{submission.participantName}</h3>
                <p className="text-sm text-muted-foreground">
                  {submission.program} - Session {submission.sessionNumber}
                </p>
              </div>
              <Badge variant="outline">{submission.submittedAt}</Badge>
            </div>

            {/* Assignment Details */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{submission.assignmentTitle}</h4>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="leading-relaxed">{submission.content}</p>
                </div>
              </div>
            </div>

            {/* Judgement */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Assignment Evaluation</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={judgement === "approved" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setJudgement("approved")}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  type="button"
                  variant={judgement === "needs-revision" ? "destructive" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setJudgement("needs-revision")}
                >
                  <XCircle className="h-4 w-4" />
                  Needs Revision
                </Button>
              </div>
            </div>

            {/* Feedback Selection */}
            <div className="space-y-3">
              <Label htmlFor="feedback" className="text-base font-semibold">
                Feedback to Participant
              </Label>
              <Select value={selectedFeedback} onValueChange={setSelectedFeedback}>
                <SelectTrigger id="feedback">
                  <SelectValue placeholder="Select a pre-written message or write your own below" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedFeedback.map((feedback, index) => (
                    <SelectItem key={index} value={feedback}>
                      {feedback}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Message */}
            <div className="space-y-3">
              <Label htmlFor="custom-message" className="text-base font-semibold">
                Or Write a Custom Message
              </Label>
              <Textarea
                id="custom-message"
                placeholder="Write your own feedback message here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!judgement || (!selectedFeedback && !customMessage)}>
            Send Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
