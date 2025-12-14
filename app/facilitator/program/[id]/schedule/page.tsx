import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"

export default function ProgramSchedulePage({ params }: { params: { id: string } }) {
  const programId = params.id

  // Mock schedule data
  const schedule = [
    {
      sessionNum: 1,
      topic: "Introduction & Self-Assessment",
      date: "Dec 2, 2024",
      location: "Courtroom 3A",
      status: "completed",
    },
    {
      sessionNum: 2,
      topic: "Understanding Risk Factors",
      date: "Dec 9, 2024",
      location: "Courtroom 3A",
      status: "completed",
    },
    {
      sessionNum: 3,
      topic: "Trigger Identification",
      date: "Dec 16, 2024",
      location: "Courtroom 3A",
      status: "completed",
    },
    {
      sessionNum: 4,
      topic: "Cognitive Restructuring",
      date: "Today, 2:00 PM",
      location: "Courtroom 3A",
      status: "upcoming",
    },
    {
      sessionNum: 5,
      topic: "Problem Solving Skills",
      date: "Dec 30, 2024",
      location: "Courtroom 3A",
      status: "scheduled",
    },
    {
      sessionNum: 6,
      topic: "Building Support Systems",
      date: "Jan 6, 2025",
      location: "Courtroom 3A",
      status: "scheduled",
    },
    { sessionNum: 7, topic: "Relapse Prevention", date: "Jan 13, 2025", location: "Courtroom 3A", status: "scheduled" },
    {
      sessionNum: 8,
      topic: "Consolidation & Planning",
      date: "Jan 20, 2025",
      location: "Courtroom 3A",
      status: "scheduled",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Up Next</Badge>
      default:
        return <Badge variant="outline">Scheduled</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Prime Solutions - Full Schedule</h1>
              <p className="text-sm text-muted-foreground">8 sessions total</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl lg:px-8">
        <div className="space-y-3">
          {schedule.map((session) => (
            <Card key={session.sessionNum}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">Session {session.sessionNum}</Badge>
                      {getStatusBadge(session.status)}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{session.topic}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {session.location}
                      </div>
                    </div>
                  </div>
                  {session.status === "upcoming" && (
                    <Link href={`/session/ps-session-${session.sessionNum}`}>
                      <Button>Start Session</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
