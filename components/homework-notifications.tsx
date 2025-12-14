"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileCheck, Eye, Download, CheckCheck } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeworkReviewDialog } from "@/components/homework-review-dialog"

type HomeworkSubmission = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  assignmentTitle: string
  submittedAt: string
  status: "new" | "reviewed"
  sessionNumber: number
  content: string
}

const homeworkSubmissions: HomeworkSubmission[] = [
  {
    id: 1,
    participantName: "Michael Chen",
    participantInitials: "MC",
    program: "Prime Solutions",
    assignmentTitle: "Cognitive Restructuring Worksheet",
    submittedAt: "10 min ago",
    status: "new",
    sessionNumber: 4,
    content:
      "I identified three negative thought patterns this week: catastrophizing, all-or-nothing thinking, and mind reading. For each one, I challenged the thought with evidence and created a more balanced alternative. The catastrophizing was the hardest to overcome, but I used the 'What's the worst that could happen?' technique and realized my fears were often exaggerated.",
  },
  {
    id: 2,
    participantName: "Sarah Johnson",
    participantInitials: "SJ",
    program: "Prime Solutions",
    assignmentTitle: "Decision Making Exercise",
    submittedAt: "25 min ago",
    status: "new",
    sessionNumber: 4,
    content:
      "I practiced the decision-making framework on three real-life situations this week. I listed pros and cons, considered short and long-term consequences, and identified my values. The framework helped me make more thoughtful choices instead of reacting impulsively.",
  },
  {
    id: 3,
    participantName: "Lisa Anderson",
    participantInitials: "LA",
    program: "Anger Management",
    assignmentTitle: "Trigger Identification Journal",
    submittedAt: "1 hour ago",
    status: "new",
    sessionNumber: 6,
    content:
      "This week I tracked my anger responses and identified my main triggers: feeling disrespected, being interrupted, and running late. I noticed that my anger level is highest in the mornings when I'm rushed. I also recognized early warning signs like muscle tension and faster breathing.",
  },
  {
    id: 4,
    participantName: "Emily Wilson",
    participantInitials: "EW",
    program: "CoDA Recovery Program",
    assignmentTitle: "Boundary Setting Scenarios",
    submittedAt: "2 hours ago",
    status: "reviewed",
    sessionNumber: 2,
    content:
      "I completed all five boundary-setting scenarios and practiced saying no without over-explaining. The hardest scenario was with family members. I realized I often prioritize others' needs over my own to avoid conflict. I'm working on being more direct about my limits.",
  },
  {
    id: 5,
    participantName: "James Brown",
    participantInitials: "JB",
    program: "CoDA Recovery Program",
    assignmentTitle: "Self-Reflection Questions",
    submittedAt: "3 hours ago",
    status: "new",
    sessionNumber: 2,
    content:
      "Reflecting on my codependent patterns, I recognize that I frequently seek validation from others and struggle with being alone. I tend to take on responsibility for other people's emotions and problems. This week I practiced sitting with uncomfortable feelings instead of immediately seeking reassurance.",
  },
]

export function HomeworkNotifications() {
  const [selectedSubmission, setSelectedSubmission] = useState<HomeworkSubmission | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)

  const newSubmissions = homeworkSubmissions.filter((h) => h.status === "new").length

  const handleReview = (submission: HomeworkSubmission) => {
    setSelectedSubmission(submission)
    setReviewDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Homework Submissions</CardTitle>
              <CardDescription>Recent assignments turned in by participants</CardDescription>
            </div>
            {newSubmissions > 0 && (
              <Badge variant="default" className="h-6 bg-accent text-accent-foreground">
                {newSubmissions} New
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {homeworkSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
                    submission.status === "new" ? "border-accent/50 bg-accent/10" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {submission.participantInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{submission.participantName}</h4>
                            {submission.status === "new" ? (
                              <Badge variant="default" className="h-5 bg-accent text-xs text-accent-foreground">
                                New
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="h-5 gap-1 text-xs">
                                <CheckCheck className="h-3 w-3" />
                                Reviewed
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {submission.program} - Session {submission.sessionNumber}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{submission.submittedAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">{submission.assignmentTitle}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1 text-xs bg-transparent"
                          onClick={() => handleReview(submission)}
                        >
                          <Eye className="h-3 w-3" />
                          Review
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileCheck className="h-4 w-4" />
              View All Submissions
            </Button>
          </div>
        </CardContent>
      </Card>

      <HomeworkReviewDialog
        submission={selectedSubmission}
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
      />
    </>
  )
}
