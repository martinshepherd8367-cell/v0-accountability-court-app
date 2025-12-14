"use client"

import { useState, useEffect } from "react"
import { apiRequest } from "@/lib/api"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParticipantHeader } from "./participant-header"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface ClassDetailsProps {
  classId: string
}

export function ClassDetails({ classId }: ClassDetailsProps) {
  const [classDetails, setClassDetails] = useState<any>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Real API
        const data = await apiRequest<any>(`/api/participant/classes/${classId}`)
        setClassDetails(data.classDetails)
        setSessions(data.sessions)
        setAssignments(data.assignments)
      } catch (e) {
        console.error("Failed to fetch class details:", e)
        // Fallback
        setClassDetails({
          name: "Prime for Life - Monday Group",
          progress: "6 of 12 sessions completed"
        })
        setSessions([
          { id: 1, title: "Introduction & Self-Assessment", date: "Jan 15, 2025", attended: true, sessionId: "101" },
          { id: 2, title: "Understanding Risk Factors", date: "Jan 22, 2025", attended: true, sessionId: "102" },
          { id: 3, title: "Cognitive Restructuring Basics", date: "Jan 29, 2025", attended: true, sessionId: "103" },
          { id: 4, title: "Identifying Triggers", date: "Feb 5, 2025", attended: true, sessionId: "104" },
          { id: 5, title: "Coping Strategies", date: "Feb 12, 2025", attended: true, sessionId: "105" },
          { id: 6, title: "Building Support Systems", date: "Feb 19, 2025", attended: true, sessionId: "106" },
        ])
        setAssignments([
          { id: 1, title: "Trigger Log - Week 3", dueDate: "Tomorrow", status: "pending" },
          { id: 2, title: "Reflection Journal", dueDate: "In 3 days", status: "pending" },
          { id: 3, title: "Support Network Map", dueDate: "Completed", status: "completed" },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [classId])

  if (loading) return <div className="p-8 text-center">Loading class details...</div>

  return (
    <>
      <ParticipantHeader />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/participant/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold mb-2">{classDetails?.name}</h1>
          <p className="text-muted-foreground">Progress: {classDetails?.progress}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Completed Sessions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Completed Sessions</h2>
            <div className="space-y-3">
              {sessions.map((session) => (
                <Link key={session.id} href={`/participant/lesson/${session.sessionId}`}>
                  <Card className="p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{session.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{session.date}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Homework */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Homework & Assignments</h2>
            <div className="space-y-3">
              {assignments.map((item) => (
                <Link key={item.id} href={`/participant/homework/${item.id}`}>
                  <Card className="p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item.status === "completed" ? (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Due: {item.dueDate}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
