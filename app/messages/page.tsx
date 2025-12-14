"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageReplyDialog } from "@/components/message-reply-dialog"
import { Search, Reply, Clock, Archive, Trash2 } from "lucide-react"

type Message = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  message: string
  timestamp: string
  unread: boolean
  priority: "normal" | "urgent"
  archived: boolean
}

const allMessages: Message[] = [
  {
    id: 1,
    participantName: "Sarah Johnson",
    participantInitials: "SJ",
    program: "Prime Solutions",
    message: "I have a question about the homework assignment for this week. Can you clarify the requirements?",
    timestamp: "15 min ago",
    unread: true,
    priority: "normal",
    archived: false,
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
    archived: false,
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
    archived: false,
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
    archived: false,
  },
  {
    id: 5,
    participantName: "Michael Chen",
    participantInitials: "MC",
    program: "Prime Solutions",
    message: "I found the cognitive restructuring exercise very helpful. Are there additional resources you recommend?",
    timestamp: "Yesterday",
    unread: false,
    priority: "normal",
    archived: false,
  },
  {
    id: 6,
    participantName: "James Brown",
    participantInitials: "JB",
    program: "CoDA Recovery Program",
    message: "Can you review my boundary setting assignment from last week? I haven't received feedback yet.",
    timestamp: "2 days ago",
    unread: false,
    priority: "normal",
    archived: false,
  },
  {
    id: 7,
    participantName: "Robert Taylor",
    participantInitials: "RT",
    program: "Anger Management",
    message: "I'm having trouble identifying my triggers. Could we discuss this in our next session?",
    timestamp: "3 days ago",
    unread: false,
    priority: "urgent",
    archived: false,
  },
  {
    id: 8,
    participantName: "Jennifer Lee",
    participantInitials: "JL",
    program: "Substance Abuse Prevention",
    message: "The relapse prevention plan template was really useful. Thank you for sharing that resource.",
    timestamp: "1 week ago",
    unread: false,
    priority: "normal",
    archived: true,
  },
]

export default function AllMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [messages, setMessages] = useState(allMessages)

  const handleReply = (message: Message) => {
    setSelectedMessage(message)
    setReplyDialogOpen(true)
  }

  const handleArchive = (messageId: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, archived: true, unread: false } : msg)))
  }

  const handleDelete = (messageId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const filteredMessages = (archived: boolean) => {
    return messages
      .filter((msg) => msg.archived === archived)
      .filter(
        (msg) =>
          msg.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.program.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  const unreadCount = messages.filter((m) => m.unread && !m.archived).length

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Messages</h1>
            <p className="text-muted-foreground">View and manage all participant communications</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-8 px-3 text-base">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages by participant, program, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Messages Tabs */}
        <Tabs defaultValue="inbox" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inbox" className="gap-2">
              Inbox
              {unreadCount > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="archived" className="gap-2">
              <Archive className="h-4 w-4" />
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-4">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pr-4">
                {filteredMessages(false).length === 0 ? (
                  <div className="rounded-lg border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">No messages found</p>
                  </div>
                ) : (
                  filteredMessages(false).map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
                        msg.unread ? "border-primary/50 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {msg.participantInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">{msg.participantName}</h3>
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
                              <p className="text-sm text-muted-foreground">{msg.program}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {msg.timestamp}
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed text-foreground">{msg.message}</p>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 text-xs bg-transparent"
                              onClick={() => handleReply(msg)}
                            >
                              <Reply className="h-3 w-3" />
                              Reply
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs"
                              onClick={() => handleArchive(msg.id)}
                            >
                              <Archive className="h-3 w-3" />
                              Archive
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs text-destructive hover:text-destructive"
                              onClick={() => handleDelete(msg.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pr-4">
                {filteredMessages(true).length === 0 ? (
                  <div className="rounded-lg border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">No archived messages</p>
                  </div>
                ) : (
                  filteredMessages(true).map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-lg border bg-muted/30 p-4 transition-colors hover:bg-accent/50"
                    >
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12 opacity-70">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {msg.participantInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{msg.participantName}</h3>
                              <p className="text-sm text-muted-foreground">{msg.program}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {msg.timestamp}
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed text-muted-foreground">{msg.message}</p>

                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs"
                              onClick={() => handleDelete(msg.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>

      <MessageReplyDialog message={selectedMessage} open={replyDialogOpen} onOpenChange={setReplyDialogOpen} />
    </div>
  )
}
