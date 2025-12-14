"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, MessageSquare } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  timestamp: number
}

interface FacilitatorAIAssistantProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FacilitatorAIAssistant({ open, onOpenChange }: FacilitatorAIAssistantProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Lesson Planning - Session 5",
      messages: [
        { role: "assistant", content: "How can I help with your lesson planning?" },
        { role: "user", content: "What are good ice breakers for cognitive restructuring?" },
        {
          role: "assistant",
          content:
            "Here are some effective ice breakers: 1) Think-Pair-Share about personal challenges, 2) Small group discussions on thinking patterns, 3) Interactive scenarios with positive reinforcement.",
        },
      ],
      timestamp: Date.now() - 3600000,
    },
  ])

  const [currentSessionId, setCurrentSessionId] = useState<string>("new")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you with lesson planning, participant questions, and program management. What can I assist you with?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const updatedMessages = [...messages, { role: "user", content: input }]
    setMessages(updatedMessages)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm processing your request. In a production environment, this would be connected to an AI service for real-time assistance.",
        },
      ])
    }, 500)
  }

  const handleNewChat = () => {
    if (messages.length > 1) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: messages[1]?.content?.substring(0, 50) || "New Chat",
        messages,
        timestamp: Date.now(),
      }
      setChatSessions([newSession, ...chatSessions])
    }

    setCurrentSessionId("new")
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm here to help you with lesson planning, participant questions, and program management. What can I assist you with?",
      },
    ])
  }

  const handleSelectChat = (session: ChatSession) => {
    setCurrentSessionId(session.id)
    setMessages(session.messages)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b flex items-center justify-between">
          <DialogTitle>AI Assistant</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat History Sidebar */}
          <div className="w-64 border-r bg-muted/30 flex flex-col">
            <div className="p-4 border-b">
              <Button onClick={handleNewChat} className="w-full bg-teal-600 hover:bg-teal-700">
                New Chat
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {chatSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSelectChat(session)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSessionId === session.id ? "bg-teal-100 text-teal-900" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(session.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-md p-4 rounded-lg ${
                        msg.role === "user"
                          ? "bg-teal-600 text-white"
                          : "bg-muted text-foreground border border-muted-foreground/20"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="border-muted-foreground/30 focus:border-teal-600"
                />
                <Button onClick={handleSend} className="bg-teal-600 hover:bg-teal-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
