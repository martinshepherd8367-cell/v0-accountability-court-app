import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileCheck, Eye, Download, CheckCheck } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

type HomeworkSubmission = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  assignmentTitle: string
  submittedAt: string
  status: "new" | "reviewed"
  sessionNumber: number
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
  },
]

export function HomeworkNotifications() {
  const newSubmissions = homeworkSubmissions.filter((h) => h.status === "new").length

  return (
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
                      <Button variant="outline" size="sm" className="h-8 gap-1 text-xs bg-transparent">
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
  )
}
