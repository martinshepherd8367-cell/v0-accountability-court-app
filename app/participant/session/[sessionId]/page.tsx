"use client"

import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SessionAgenda } from "@/components/session-agenda"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function ParticipantSessionPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [showTakeaway, setShowTakeaway] = useState(false)
  const [takeaway, setTakeaway] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(42) // minutes

  useEffect(() => {
    if (timeRemaining <= 10 && timeRemaining > 0) {
      setShowTakeaway(true)
    }
  }, [timeRemaining])

  const sessionData = {
    title: "Prime For Life - Session 4: Cognitive Restructuring",
    program: "Prime Solutions",
    facilitator: "Dr. Sarah Mitchell",
    date: "Today, 2:00 PM - 4:00 PM",
  }

  const handleSubmitTakeaway = () => {
    console.log("Takeaway submitted:", takeaway)
    // Submit takeaway logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{sessionData.title}</h1>
              <p className="text-sm text-muted-foreground">
                {sessionData.program} • {sessionData.facilitator}
              </p>
            </div>
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              <Clock className="h-3 w-3" />
              In Progress
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Time Remaining Notice */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 py-4">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-primary">Class in progress</p>
              <p className="text-sm text-muted-foreground">{timeRemaining} minutes remaining</p>
            </div>
          </CardContent>
        </Card>

        {/* Takeaway Submission - Shows 10 min before end */}
        {showTakeaway && (
          <Card className="mb-6 border-secondary/50 bg-secondary/5">
            <CardContent className="space-y-4 pt-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Share Your Takeaway</h3>
                <p className="text-sm text-muted-foreground">What did you learn or find helpful in today's session?</p>
              </div>
              <Textarea
                placeholder="Share your key learning, insight, or reflection from today's class..."
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={handleSubmitTakeaway} className="w-full bg-primary hover:bg-primary/90">
                Submit Takeaway
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Session Agenda */}
        <SessionAgenda userRole="participant" sessionId={sessionId} />
      </main>
    </div>
  )
}
