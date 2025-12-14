"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Search, Mail, Phone, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParticipantScoreBadge } from "@/components/participant-score-badge"

type Participant = {
  id: number
  name: string
  email: string
  phone: string
  status: "active" | "at-risk" | "pending"
  attendance: number
  homeworkCompleted: number
  lastActivity: string
  score: number
  scoreTrend: "up" | "down" | "stable"
}

const participantsByClass = {
  "Prime Solutions": [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      status: "active" as const,
      attendance: 95,
      homeworkCompleted: 3,
      lastActivity: "2 hours ago",
      score: 87,
      scoreTrend: "up" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      status: "active" as const,
      attendance: 100,
      homeworkCompleted: 4,
      lastActivity: "1 day ago",
      score: 92,
      scoreTrend: "stable" as const,
    },
    {
      id: 3,
      name: "David Martinez",
      email: "d.martinez@email.com",
      phone: "(555) 345-6789",
      status: "at-risk" as const,
      attendance: 70,
      homeworkCompleted: 1,
      lastActivity: "5 days ago",
      score: 58,
      scoreTrend: "down" as const,
    },
  ],
  "CoDA Recovery Program": [
    {
      id: 4,
      name: "Emily Wilson",
      email: "e.wilson@email.com",
      phone: "(555) 456-7890",
      status: "active" as const,
      attendance: 90,
      homeworkCompleted: 2,
      lastActivity: "3 hours ago",
      score: 84,
      scoreTrend: "up" as const,
    },
    {
      id: 5,
      name: "James Brown",
      email: "j.brown@email.com",
      phone: "(555) 567-8901",
      status: "pending" as const,
      attendance: 50,
      homeworkCompleted: 0,
      lastActivity: "1 week ago",
      score: 45,
      scoreTrend: "down" as const,
    },
  ],
  "Anger Management": [
    {
      id: 6,
      name: "Lisa Anderson",
      email: "l.anderson@email.com",
      phone: "(555) 678-9012",
      status: "active" as const,
      attendance: 85,
      homeworkCompleted: 5,
      lastActivity: "4 hours ago",
      score: 89,
      scoreTrend: "up" as const,
    },
  ],
}

export function ParticipantsByClassDialog() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusIcon = (status: Participant["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "at-risk":
        return <AlertCircle className="h-4 w-4 text-amber-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusBadge = (status: Participant["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>
      case "at-risk":
        return <Badge variant="destructive">At Risk</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const filterParticipants = (participants: Participant[]) => {
    if (!searchQuery) return participants
    return participants.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Users className="h-4 w-4" />
          View Participants
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-4xl">
        <DialogHeader>
          <DialogTitle>Participants by Class</DialogTitle>
          <DialogDescription>View and manage participants across all your programs</DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search participants by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs by Class */}
        <Tabs defaultValue="Prime Solutions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Prime Solutions">Prime Solutions</TabsTrigger>
            <TabsTrigger value="CoDA Recovery Program">CoDA</TabsTrigger>
            <TabsTrigger value="Anger Management">Anger Mgmt</TabsTrigger>
          </TabsList>

          {Object.entries(participantsByClass).map(([className, participants]) => (
            <TabsContent key={className} value={className} className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3 pr-4">
                  {filterParticipants(participants).map((participant) => (
                    <div key={participant.id} className="rounded-lg border bg-card p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{participant.name}</h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3.5 w-3.5" />
                                  {participant.email}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3.5 w-3.5" />
                                  {participant.phone}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(participant.status)}
                              <ParticipantScoreBadge score={participant.score} trend={participant.scoreTrend} />
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Overall Score</p>
                              <p className="font-medium text-foreground">{participant.score}/100</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Attendance</p>
                              <p className="font-medium text-foreground">{participant.attendance}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Homework Done</p>
                              <p className="font-medium text-foreground">{participant.homeworkCompleted} tasks</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Active</p>
                              <p className="font-medium text-foreground">{participant.lastActivity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filterParticipants(participants).length === 0 && (
                    <div className="flex h-32 items-center justify-center text-muted-foreground">
                      No participants found matching your search
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
