"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileCheck, Eye, Download, CheckCheck, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeworkReviewDialog } from "@/components/homework-review-dialog"
import { apiRequest } from "@/lib/api"

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

export function HomeworkNotifications() {
  const [homeworkSubmissions, setHomeworkSubmissions] = useState<HomeworkSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<HomeworkSubmission | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await apiRequest<HomeworkSubmission[]>('/api/facilitator/homework-submissions')
        setHomeworkSubmissions(data)
      } catch (e) {
        console.error("Failed to load homework submissions", e)
        setHomeworkSubmissions([]) // No fake data
      } finally {
        setLoading(false)
      }
    }
    fetchSubmissions()
  }, [])

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
          {loading ? (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading submissions...
            </div>
          ) : homeworkSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground border-dashed border rounded-md">
              <FileCheck className="h-8 w-8 mb-2 opacity-50" />
              <p>No new homework submissions</p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {homeworkSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${submission.status === "new" ? "border-accent/50 bg-accent/10" : ""
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
            </>
          )}
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
