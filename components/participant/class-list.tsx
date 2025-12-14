"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiRequest } from "@/lib/api"

interface ClassItem {
  id: number | string
  name: string
  nextSession: string
  progress: number
  totalSessions: number
  hasHomework: boolean
  homeworkDue?: string
}

export function ClassList() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // TODO: Validate this endpoint with the backend team
        const data = await apiRequest<ClassItem[]>('/api/participant/classes')
        setClasses(data)
      } catch (err) {
        console.error("Failed to fetch classes:", err)
        setError("Could not load classes. Please try again later.")
        // Fallback to mock data for demonstration if API fails/doesn't exist yet
        // Fallback to empty to respect "remove fake data"
        setClasses([])
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  if (error && classes.length === 0) {
    return <div className="text-destructive p-4 border border-destructive/20 rounded-md bg-destructive/10">{error}</div>
  }

  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <Link key={classItem.id} href={`/participant/class/${classItem.id}`}>
          <Card className="p-5 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{classItem.name}</h3>
                  {classItem.hasHomework && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Homework Due
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{classItem.nextSession}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {classItem.progress} of {classItem.totalSessions} completed
                    </span>
                  </div>
                </div>

                {classItem.hasHomework && classItem.homeworkDue && (
                  <p className="text-xs text-destructive mt-2">Due: {classItem.homeworkDue}</p>
                )}
              </div>

              {/* Progress Circle */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-16 h-16">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(classItem.progress / classItem.totalSessions) * 175.93} 175.93`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {Math.round((classItem.progress / classItem.totalSessions) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
