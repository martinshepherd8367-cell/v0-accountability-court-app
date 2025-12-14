"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Download } from "lucide-react"
import { ReviewHomeworkModal } from "@/components/review-homework-modal"

const submissions = [
  {
    id: 1,
    participant: "Michael Chen",
    initials: "MC",
    assignment: "Cognitive Restructuring Worksheet",
    program: "Prime Solutions - Session 4",
    timestamp: "10 min ago",
    status: "new",
    content:
      "I identified three negative thought patterns this week: catastrophizing, all-or-nothing thinking, and mind reading. For each one, I challenged the thought with evidence and created a more balanced alternative. The catastrophizing was the hardest to overcome, but I used the 'What's the worst that could happen?' technique and realized my fears were often exaggerated.",
  },
  {
    id: 2,
    participant: "Sarah Johnson",
    initials: "SJ",
    assignment: "Decision Making Exercise",
    program: "Prime Solutions - Session 4",
    timestamp: "25 min ago",
    status: "new",
    content:
      "I worked through the decision-making process for choosing whether to reach out to my support network. I listed the pros and cons, identified my values, and made a decision aligned with my recovery goals.",
  },
  {
    id: 3,
    participant: "Lisa Anderson",
    initials: "LA",
    assignment: "Trigger Identification Journal",
    program: "Anger Management - Session 6",
    timestamp: "1 hour ago",
    status: "new",
    content:
      "Triggers I identified: 1) Feeling disrespected at work, 2) Being told 'no' by family members, 3) Traffic delays. I documented my physical responses and what thoughts came up.",
  },
  {
    id: 4,
    participant: "Emily Wilson",
    initials: "EW",
    assignment: "Boundary Setting Scenarios",
    program: "CoDA Recovery Program - Session 2",
    timestamp: "2 hours ago",
    status: "reviewed",
    content: "Completed all three boundary-setting scenarios with clear, respectful communication.",
  },
]

export function HomeworkSubmissionsSection() {
  const [reviewOpen, setReviewOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof submissions)[0] | null>(null)

  const handleReview = (submission: (typeof submissions)[0]) => {
    setSelectedSubmission(submission)
    setReviewOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Homework Submissions
              </CardTitle>
              <CardDescription>Recent assignments turned in by participants</CardDescription>
            </div>
            <Badge variant="default" className="ml-auto">
              {submissions.filter((s) => s.status === "new").length} New
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600">
                {sub.initials}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{sub.participant}</span>
                  {sub.status === "new" && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                  {sub.status === "reviewed" && (
                    <Badge variant="outline" className="text-xs">
                      Reviewed
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{sub.assignment}</p>
                <p className="text-xs text-muted-foreground">{sub.program}</p>
                <p className="text-xs text-muted-foreground">{sub.timestamp}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleReview(sub)}>
                  Review
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            View All Submissions
          </Button>
        </CardContent>
      </Card>

      <ReviewHomeworkModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        submission={
          selectedSubmission
            ? {
                participant: selectedSubmission.participant,
                assignment: selectedSubmission.assignment,
                program: selectedSubmission.program,
                timestamp: selectedSubmission.timestamp,
                content: selectedSubmission.content,
              }
            : undefined
        }
      />
    </>
  )
}
