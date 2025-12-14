

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Play, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiRequest } from "@/lib/api"

interface NextClass {
  id: string
  programName: string
  sessionNumber: number
  topic: string
  date: string
  location: string
  participantCount: number
  startTime: string // Formatted string or timestamp
}

export function NextClassCard() {
  const [nextClass, setNextClass] = useState<NextClass | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNextClass = async () => {
      try {
        const data = await apiRequest<NextClass>('/api/facilitator/next-class')
        setNextClass(data)
      } catch (e) {
        console.error("Failed to fetch next class", e)
        // No fake data fallback
        setNextClass(null)
      } finally {
        setLoading(false)
      }
    }
    fetchNextClass()
  }, [])

  if (loading) {
    return (
      <Card className="border-primary/20 bg-primary/5 h-[300px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    )
  }

  if (!nextClass) {
    return (
      <Card className="border-dashed border-2 h-full flex flex-col items-center justify-center p-8 text-center bg-muted/20">
        <div className="text-muted-foreground mb-4">No upcoming classes scheduled</div>
        <Button variant="outline" disabled>Schedule a Class</Button>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">Next Class</Badge>
              <CardTitle className="text-xl">{nextClass.programName} - Session {nextClass.sessionNumber}</CardTitle>
            </div>
            <CardDescription>{nextClass.topic}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Class Details */}
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{nextClass.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{nextClass.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{nextClass.participantCount} Participants Expected</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium text-foreground">Starts at {nextClass.startTime}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full gap-2" size="lg" asChild>
            <Link href={`/session/${nextClass.id}`}>
              <Play className="h-4 w-4" />
              Start Class Session
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
