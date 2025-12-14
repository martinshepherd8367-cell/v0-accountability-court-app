"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, CheckCircle2, Circle, PlayCircle, BookOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { primeSolutionsCurriculum } from "@/lib/curriculum-data"
import { useState } from "react"
import { SessionContentViewer } from "@/components/session-content-viewer"

interface ViewSessionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programId: number
}

const programSessions = {
  1: [
    // Prime Solutions
    {
      session: 1,
      topic: "Introduction & Orientation",
      date: "Nov 15, 2024",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "completed",
    },
    {
      session: 2,
      topic: "Understanding Thinking Patterns",
      date: "Nov 22, 2024",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "completed",
    },
    {
      session: 3,
      topic: "Identifying Cognitive Distortions",
      date: "Nov 29, 2024",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "completed",
    },
    {
      session: 4,
      topic: "Cognitive Restructuring",
      date: "Dec 14, 2024",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "active",
    },
    {
      session: 5,
      topic: "Emotional Regulation Techniques",
      date: "Dec 21, 2024",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 6,
      topic: "Building Healthy Relationships",
      date: "Jan 4, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 7,
      topic: "Communication Skills",
      date: "Jan 11, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 8,
      topic: "Problem-Solving Strategies",
      date: "Jan 18, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 9,
      topic: "Stress Management",
      date: "Jan 25, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 10,
      topic: "Relapse Prevention Planning",
      date: "Feb 1, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 11,
      topic: "Life Skills & Goal Setting",
      date: "Feb 8, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
    {
      session: 12,
      topic: "Graduation & Completion",
      date: "Feb 15, 2025",
      time: "2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
      status: "upcoming",
    },
  ],
  2: [
    // CoDA
    {
      session: 1,
      topic: "What is Codependency?",
      date: "Dec 5, 2024",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "completed",
    },
    {
      session: 2,
      topic: "Understanding Codependency",
      date: "Dec 19, 2024",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "active",
    },
    {
      session: 3,
      topic: "Setting Healthy Boundaries",
      date: "Dec 26, 2024",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
    {
      session: 4,
      topic: "Self-Care Practices",
      date: "Jan 2, 2025",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
    {
      session: 5,
      topic: "Building Self-Esteem",
      date: "Jan 9, 2025",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
    {
      session: 6,
      topic: "Communication in Relationships",
      date: "Jan 16, 2025",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
    {
      session: 7,
      topic: "Breaking Codependent Patterns",
      date: "Jan 23, 2025",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
    {
      session: 8,
      topic: "Moving Forward with Confidence",
      date: "Jan 30, 2025",
      time: "10:00 AM",
      location: "Meeting Room B",
      participants: 12,
      status: "upcoming",
    },
  ],
  3: [
    // Anger Management
    {
      session: 1,
      topic: "Understanding Anger",
      date: "Oct 25, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "completed",
    },
    {
      session: 2,
      topic: "Triggers and Warning Signs",
      date: "Nov 1, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "completed",
    },
    {
      session: 3,
      topic: "The Anger Cycle",
      date: "Nov 8, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "completed",
    },
    {
      session: 4,
      topic: "Relaxation Techniques",
      date: "Nov 15, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "completed",
    },
    {
      session: 5,
      topic: "Cognitive Strategies",
      date: "Nov 22, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "completed",
    },
    {
      session: 6,
      topic: "Conflict Resolution Skills",
      date: "Dec 20, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "active",
    },
    {
      session: 7,
      topic: "Assertive Communication",
      date: "Dec 27, 2024",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "upcoming",
    },
    {
      session: 8,
      topic: "Forgiveness and Letting Go",
      date: "Jan 3, 2025",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "upcoming",
    },
    {
      session: 9,
      topic: "Managing Stress",
      date: "Jan 10, 2025",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "upcoming",
    },
    {
      session: 10,
      topic: "Maintaining Progress",
      date: "Jan 17, 2025",
      time: "3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
      status: "upcoming",
    },
  ],
}

export function ViewSessionsDialog({ open, onOpenChange, programName, programId }: ViewSessionsDialogProps) {
  const sessions = programSessions[programId as keyof typeof programSessions] || []
  const [selectedSession, setSelectedSession] = useState<number | null>(null)

  if (selectedSession !== null) {
    const curriculumData = primeSolutionsCurriculum.find((s) => s.id === selectedSession)

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <Button variant="ghost" size="sm" onClick={() => setSelectedSession(null)} className="w-fit mb-2">
              ← Back to All Sessions
            </Button>
            <DialogTitle>Session {selectedSession} Details</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-120px)] pr-4">
            {curriculumData ? (
              <SessionContentViewer session={curriculumData} isFacilitator={true} />
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No curriculum content available for this session.
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{programName} - All Sessions</DialogTitle>
          <DialogDescription>Complete schedule for this program run</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.session}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                {/* Status Icon */}
                <div className="mt-1">
                  {session.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {session.status === "active" && <PlayCircle className="h-5 w-5 text-blue-600" />}
                  {session.status === "upcoming" && <Circle className="h-5 w-5 text-muted-foreground" />}
                </div>

                {/* Session Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          Session {session.session}: {session.topic}
                        </h4>
                        {session.status === "active" && (
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        )}
                        {session.status === "completed" && (
                          <Badge variant="secondary" className="text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {session.date} at {session.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      <span>{session.participants} participants</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {session.status === "active" && (
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Start Session
                      </Button>
                    )}
                    {programId === 1 && session.session <= 6 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedSession(session.session)}
                        className="gap-1.5"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        View Guide
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
