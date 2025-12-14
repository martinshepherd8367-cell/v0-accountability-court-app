"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Reply, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageReplyDialog } from "@/components/message-reply-dialog"

type Message = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  message: string
  timestamp: string
  unread: boolean
  priority: "normal" | "urgent"
}

const messages: Message[] = [
  {
    id: 1,
    participantName: "Sarah Johnson",
    participantInitials: "SJ",
    program: "Prime Solutions",
    message: "I have a question about the homework assignment for this week. Can you clarify the requirements?",
    timestamp: "15 min ago",
    unread: true,
    priority: "normal",
  },
  {
    id: 2,
    participantName: "David Martinez",
    participantInitials: "DM",
    program: "Prime Solutions",
    message: "I won't be able to attend tomorrow's session due to a medical appointment. Is there a way to make it up?",
    timestamp: "1 hour ago",
    unread: true,
    priority: "urgent",
  },
  {
    id: 3,
    participantName: "Emily Wilson",
    participantInitials: "EW",
    program: "CoDA Recovery Program",
    message: "Thank you for the feedback on my last assignment. It really helped me understand the concepts better.",
    timestamp: "3 hours ago",
    unread: false,
    priority: "normal",
  },
  {
    id: 4,
    participantName: "Lisa Anderson",
    participantInitials: "LA",
    program: "Anger Management",
    message: "Could we schedule a one-on-one session to discuss my progress?",
    timestamp: "5 hours ago",
    unread: true,
    priority: "normal",
  },
]

export function ParticipantMessages() {
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)

  const unreadCount = messages.filter((m) => m.unread).length

  const handleReply = (message: Message) => {
    setSelectedMessage(message)
    setReplyDialogOpen(true)
  }

  const handleViewAll = () => {
    router.push("/messages")
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Participant Messages</CardTitle>
              <CardDescription>Recent messages from your participants</CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-6">
                {unreadCount} New
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
                    msg.unread ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {msg.participantInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{msg.participantName}</h4>
                            {msg.unread && (
                              <Badge variant="outline" className="h-5 text-xs">
                                New
                              </Badge>
                            )}
                            {msg.priority === "urgent" && (
                              <Badge variant="destructive" className="h-5 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{msg.program}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {msg.timestamp}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-foreground">{msg.message}</p>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 px-2 text-xs"
                        onClick={() => handleReply(msg)}
                      >
                        <Reply className="h-3 w-3" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleViewAll}>
              <MessageSquare className="h-4 w-4" />
              View All Messages
            </Button>
          </div>
        </CardContent>
      </Card>

      <MessageReplyDialog message={selectedMessage} open={replyDialogOpen} onOpenChange={setReplyDialogOpen} />
    </>
  )
}
