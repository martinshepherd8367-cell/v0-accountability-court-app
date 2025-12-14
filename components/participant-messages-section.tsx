"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import { ReplyToMessageModal } from "@/components/reply-to-message-modal"

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    initials: "SJ",
    program: "Prime Solutions",
    message: "I have a question about the homework assignment for this week. Can you clarify the requirements?",
    timestamp: "15 min ago",
    isNew: true,
  },
  {
    id: 2,
    sender: "David Martinez",
    initials: "DM",
    program: "Prime Solutions",
    message: "I won't be able to attend tomorrow's session due to a medical appointment. Is there a way to make it up?",
    timestamp: "1 hour ago",
    isNew: true,
    isUrgent: true,
  },
  {
    id: 3,
    sender: "Emily Wilson",
    initials: "EW",
    program: "CoDA Recovery Program",
    message: "Thank you for the feedback on my last assignment. It really helped me understand the concepts better.",
    timestamp: "3 hours ago",
    isNew: false,
  },
  {
    id: 4,
    sender: "Lisa Anderson",
    initials: "LA",
    program: "Anger Management",
    message: "Could we schedule a one-on-one session to discuss my progress?",
    timestamp: "5 hours ago",
    isNew: true,
  },
]

export function ParticipantMessagesSection() {
  const [replyOpen, setReplyOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<(typeof messages)[0] | null>(null)

  const handleReply = (msg: (typeof messages)[0]) => {
    setSelectedMessage(msg)
    setReplyOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Participant Messages
              </CardTitle>
              <CardDescription>Recent messages from your participants</CardDescription>
            </div>
            <Badge variant="default" className="ml-auto">
              {messages.filter((m) => m.isNew).length} New
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600">
                {msg.initials}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{msg.sender}</span>
                  {msg.isNew && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                  {msg.isUrgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{msg.program}</p>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleReply(msg)}>
                Reply
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            View All Messages
          </Button>
        </CardContent>
      </Card>

      <ReplyToMessageModal
        open={replyOpen}
        onOpenChange={setReplyOpen}
        message={
          selectedMessage
            ? {
                sender: selectedMessage.sender,
                program: selectedMessage.program,
                text: selectedMessage.message,
                timestamp: selectedMessage.timestamp,
              }
            : undefined
        }
      />
    </>
  )
}
