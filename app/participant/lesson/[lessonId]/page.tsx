"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Play, FileText } from "lucide-react"
import Link from "next/link"

export default function ParticipantLessonPage() {
  const params = useParams()

  const lessonData = {
    title: "Cognitive Restructuring Basics",
    program: "Prime for Life - Monday Group",
    date: "Jan 29, 2025",
    duration: "2 hours",
    facilitator: "Dr. Sarah Mitchell",
  }

  const content = [
    {
      title: "Introduction to Cognitive Restructuring",
      description: "Understanding how our thoughts influence our feelings and behaviors",
      keyPoints: [
        "Automatic thoughts happen instantly and unconsciously",
        "Thoughts are not facts - they can be challenged",
        "The ABC model: Activating event → Belief → Consequence",
      ],
      video: {
        title: "Cognitive Restructuring Explained",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
    {
      title: "Common Cognitive Distortions",
      description: "Recognizing patterns of negative thinking",
      keyPoints: [
        "All-or-nothing thinking: Seeing things as only good or bad",
        "Catastrophizing: Expecting the worst possible outcome",
        "Personalization: Blaming yourself for things outside your control",
        "Mind reading: Assuming you know what others think",
      ],
    },
    {
      title: "The Thought Record Technique",
      description: "A structured approach to challenging negative thoughts",
      keyPoints: [
        "Step 1: Identify the triggering situation",
        "Step 2: Notice automatic thoughts",
        "Step 3: Rate emotional intensity",
        "Step 4: Find evidence for and against the thought",
        "Step 5: Create a balanced alternative thought",
      ],
    },
    {
      title: "Practice Exercise",
      description: "Apply what you learned with a real-life example",
      keyPoints: [
        "Think of a recent situation that upset you",
        "Write down your automatic thoughts",
        "Challenge those thoughts with evidence",
        "Develop a more balanced perspective",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/participant/class/1">
            <Button variant="ghost" size="sm" className="mb-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Class
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{lessonData.title}</h1>
              <p className="text-sm text-muted-foreground">
                {lessonData.program} • {lessonData.date}
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <FileText className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Lesson Info */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Facilitator: <span className="font-medium text-foreground">{lessonData.facilitator}</span>
              </span>
              <span className="text-muted-foreground">
                Duration: <span className="font-medium text-foreground">{lessonData.duration}</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Lesson Content
            </CardTitle>
            <CardDescription>Review the material from this session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.map((section, index) => (
              <div key={index} className="rounded-lg border p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                </div>

                {section.keyPoints && (
                  <ul className="space-y-2 text-sm">
                    {section.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.video && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Play className="h-4 w-4" />
                      {section.video.title}
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                      <iframe
                        src={section.video.url}
                        title={section.video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
