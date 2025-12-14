"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real data
const classes = [
  {
    id: 1,
    name: "Prime for Life - Monday Group",
    nextSession: "Today, 2:00 PM",
    progress: 6,
    totalSessions: 12,
    hasHomework: true,
    homeworkDue: "Tomorrow",
  },
  {
    id: 2,
    name: "Cognitive Restructuring",
    nextSession: "Wednesday, 10:00 AM",
    progress: 3,
    totalSessions: 8,
    hasHomework: false,
  },
  {
    id: 3,
    name: "CoDA Recovery Program",
    nextSession: "Friday, 3:00 PM",
    progress: 10,
    totalSessions: 16,
    hasHomework: true,
    homeworkDue: "In 3 days",
  },
]

export function ClassList() {
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
