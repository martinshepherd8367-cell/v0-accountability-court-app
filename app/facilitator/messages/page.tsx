"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  participant: string
  program: string
  content: string
  timestamp: string
  unread: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      participant: "Sarah Johnson",
      program: "Prime Solutions",
      content: "I have a question about the homework...",
      timestamp: "15 min ago",
      unread: true,
    },
    {
      id: 2,
      participant: "Michael Chen",
      program: "Prime Solutions",
      content: "Can we reschedule class?",
      timestamp: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      participant: "Emily Wilson",
      program: "CoDA",
      content: "Thank you for the feedback",
      timestamp: "2 hours ago",
      unread: false,
    },
  ])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sendToClass, setSendToClass] = useState(false)

  const handleSendReply = () => {
    if (!replyText.trim()) return
    setReplyText("")
    // Handle reply
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          <div>
            <Link href="/" className="text-teal-600 hover:text-teal-700 text-sm mb-2">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">All Messages</h1>
            <p className="text-sm text-muted-foreground">View and manage all participant communications</p>
          </div>
          <div className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold">3 Unread</div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-teal-200 focus:border-teal-600"
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="inbox" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inbox">
                  Inbox <span className="ml-1 bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full">3</span>
                </TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <TabsContent value="inbox" className="space-y-2 mt-4">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedMessage?.id === msg.id ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{msg.participant}</p>
                        <p className="text-xs text-muted-foreground">{msg.program}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">{msg.content}</p>
                      </div>
                      {msg.unread && <div className="h-2 w-2 rounded-full bg-teal-600 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{msg.timestamp}</p>
                  </button>
                ))}
              </TabsContent>

              <TabsContent value="archived" className="space-y-2 mt-4">
                <p className="text-sm text-muted-foreground">No archived messages</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="space-y-4 bg-card border rounded-lg p-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold">{selectedMessage.participant}</h2>
                  <p className="text-sm text-muted-foreground">{selectedMessage.program}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedMessage.timestamp}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedMessage.content}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="send-to-class"
                      checked={sendToClass}
                      onChange={(e) => setSendToClass(e.target.checked)}
                    />
                    <label htmlFor="send-to-class" className="text-sm cursor-pointer">
                      Send to entire class
                    </label>
                  </div>

                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="border-teal-200 focus:border-teal-600"
                    rows={4}
                  />

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendReply} className="bg-teal-600 hover:bg-teal-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                Select a message to view and reply
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
