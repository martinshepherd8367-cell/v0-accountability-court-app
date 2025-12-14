"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Send } from "lucide-react"
import { useState, useEffect } from "react"
import { apiRequest } from "@/lib/api"

export default function HomeworkPage() {
  const params = useParams()
  const router = useRouter()
  const [homework, setHomework] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // TODO: Real API
        const data = await apiRequest<any>(`/api/participant/homework/${params.homeworkId}`)
        setHomework(data)
      } catch (e) {
        console.error("Failed to fetch homework:", e)
        // Fallback
        setHomework({
          id: params.homeworkId,
          title: "Thought Record Exercise",
          class: "Prime For Life - Session 4",
          dueDate: "March 20, 2024",
          instructions:
            "Complete the thought record for 3 situations this week where you experienced strong emotions or urges.",
          questions: [
            {
              id: "q1",
              type: "textarea",
              label: "Situation 1: Describe the situation",
              placeholder: "What happened? Where were you? Who was involved?",
            },
            {
              id: "q2",
              type: "textarea",
              label: "Situation 1: What automatic thoughts came up?",
              placeholder: "What went through your mind? What did you tell yourself?",
            },
            {
              id: "q3",
              type: "radio",
              label: "Situation 1: Emotion intensity (1-10)",
              options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            },
            {
              id: "q4",
              type: "textarea",
              label: "Situation 1: Alternative thought",
              placeholder: "What's a more balanced or realistic way to think about this situation?",
            },
            {
              id: "q5",
              type: "textarea",
              label: "Situation 2: Describe the situation",
              placeholder: "What happened? Where were you? Who was involved?",
            },
            {
              id: "q6",
              type: "textarea",
              label: "Situation 2: What automatic thoughts came up?",
              placeholder: "What went through your mind? What did you tell yourself?",
            },
          ],
        })
      } finally {
        setLoading(false)
      }
    }
    fetchHomework()
  }, [params.homeworkId])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await apiRequest(`/api/participant/homework/${params.homeworkId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers })
      })
      router.push("/participant/dashboard")
    } catch (e) {
      console.error("Failed to submit homework:", e)
      alert("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="p-8 text-center bg-background min-h-screen">Loading assignment...</div>

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Class
          </Button>
          <h1 className="text-xl font-semibold">{homework.title}</h1>
          <p className="text-sm text-muted-foreground">
            {homework.class} • Due {homework.dueDate}
          </p>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Homework</CardTitle>
            <CardDescription>{homework.instructions}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {homework.questions.map((question: any) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id} className="text-base font-medium">
                  {question.label}
                </Label>

                {question.type === "textarea" && (
                  <Textarea
                    id={question.id}
                    placeholder={question.placeholder}
                    value={answers[question.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="min-h-[100px]"
                  />
                )}

                {question.type === "input" && (
                  <Input
                    id={question.id}
                    placeholder={question.placeholder}
                    value={answers[question.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                  />
                )}

                {question.type === "radio" && question.options && (
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(val) => setAnswers({ ...answers, [question.id]: val })}
                  >
                    <div className="flex gap-2">
                      {question.options.map((option: string) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer font-normal">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </div>
            ))}

            <Button onClick={handleSubmit} className="w-full gap-2 bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
              Submit Homework
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
