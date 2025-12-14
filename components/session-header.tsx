"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

interface SessionHeaderProps {
  title?: string
  subtitle?: string // Make subtitle optional
  status?: "scheduled" | "in-progress" | "completed"
  startTime?: string
  participantCount?: number
  totalParticipants?: number // Optional
  sessionId?: string // For the end session link
}

export function SessionHeader({
  title = "Session Details",
  subtitle,
  status = "in-progress",
  participantCount = 0,
  totalParticipants = 0,
  sessionId = "1"
}: SessionHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {status === "in-progress" ? "In Progress" : status}
                </Badge>
              </div>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Session Timer */}
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">--:--</span> {/* Dynamic timer would be a larger task, placeholder for now */}
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{participantCount}{totalParticipants > 0 ? `/${totalParticipants}` : ''}</span>
            </div>

            {/* End Session Button */}
            <Link href={`/session/${sessionId}/summary`}>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CheckCircle className="h-4 w-4" />
                End Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
