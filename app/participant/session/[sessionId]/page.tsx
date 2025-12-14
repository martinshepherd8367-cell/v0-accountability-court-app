"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock, BookOpen, MessageCircle, Play, CheckSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function ParticipantSessionPage() {
  const params = useParams()
  const [showTakeaway, setShowTakeaway] = useState(false)
  const [takeaway, setTakeaway] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(42) // minutes
  const [questionResponses, setQuestionResponses] = useState<Record<string, string>>({})
  const [activityChecks, setActivityChecks] = useState<Record<string, boolean>>({})

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

  const agenda = [
    {
      title: "Check-In & Welcome",
      duration: "10 min",
      description: "Brief welcome and group check-in",
    },
    {
      title: "Cognitive Restructuring Introduction",
      duration: "20 min",
      description: "Understanding thought patterns and their impact on behavior",
      keyPoints: [
        "Identifying automatic thoughts",
        "Understanding cognitive distortions",
        "The ABC model: Activating event, Belief, Consequence",
      ],
      video: {
        title: "Introduction to Cognitive Restructuring",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      question: {
        id: "cog-reflect",
        text: "Think about a recent situation where you had an automatic negative thought. What was the thought?",
        type: "text",
      },
    },
    {
      title: "Group Exercise: Thought Records",
      duration: "25 min",
      description: "Practice identifying and challenging negative thought patterns",
      activity: {
        title: "Complete Your Thought Record",
        steps: [
          { id: "step1", text: "Identify the situation that triggered the thought" },
          { id: "step2", text: "Write down the automatic thought" },
          { id: "step3", text: "Rate your emotional intensity (1-10)" },
          { id: "step4", text: "Challenge the thought with evidence" },
          { id: "step5", text: "Create a balanced alternative thought" },
        ],
      },
    },
    {
      title: "Discussion: Real-World Applications",
      duration: "20 min",
      description: "How to apply cognitive restructuring in daily situations",
      question: {
        id: "application",
        text: "Which cognitive distortion involves seeing things as only black or white?",
        type: "multiple",
        options: ["Catastrophizing", "All-or-nothing thinking", "Personalization", "Mind reading"],
      },
    },
    {
      title: "Homework Assignment & Closing",
      duration: "10 min",
      description: "Review homework and closing reflections",
    },
  ]

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
            <CardHeader>
              <CardTitle className="text-lg">Share Your Takeaway</CardTitle>
              <CardDescription>What did you learn or find helpful in today's session?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Today's Agenda
            </CardTitle>
            <CardDescription>Follow along with the session outline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {agenda.map((item, index) => (
              <div key={index} className="rounded-lg border p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {item.duration}
                  </Badge>
                </div>

                {item.keyPoints && (
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {item.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {item.video && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Play className="h-4 w-4 text-primary" />
                      {item.video.title}
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                      <iframe
                        src={item.video.url}
                        title={item.video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {item.activity && (
                  <div className="rounded-lg bg-secondary/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckSquare className="h-4 w-4 text-primary" />
                      {item.activity.title}
                    </div>
                    <div className="space-y-2">
                      {item.activity.steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-3">
                          <Checkbox
                            id={step.id}
                            checked={activityChecks[step.id] || false}
                            onCheckedChange={(checked) =>
                              setActivityChecks((prev) => ({ ...prev, [step.id]: checked as boolean }))
                            }
                          />
                          <Label htmlFor={step.id} className="text-sm cursor-pointer">
                            {step.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.question && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">{item.question.text}</p>
                    {item.question.type === "text" && (
                      <Textarea
                        placeholder="Your response..."
                        value={questionResponses[item.question.id] || ""}
                        onChange={(e) =>
                          setQuestionResponses((prev) => ({
                            ...prev,
                            [item.question.id]: e.target.value,
                          }))
                        }
                        className="min-h-[100px]"
                      />
                    )}
                    {item.question.type === "multiple" && item.question.options && (
                      <RadioGroup
                        value={questionResponses[item.question.id] || ""}
                        onValueChange={(value) =>
                          setQuestionResponses((prev) => ({
                            ...prev,
                            [item.question.id]: value,
                          }))
                        }
                      >
                        {item.question.options.map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${item.question.id}-${i}`} />
                            <Label htmlFor={`${item.question.id}-${i}`} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Help Button */}
        <Card className="mt-6">
          <CardContent className="py-4">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              Ask AI for Help with Questions or Concepts
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
