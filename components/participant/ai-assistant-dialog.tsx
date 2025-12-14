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
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIAssistantDialog() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([])
  const [showHistory, setShowHistory] = useState(false)

  // Mock chat history
  const chatHistory = [
    {
      id: "1",
      title: "What is cognitive distortion?",
      date: "Yesterday",
      preview: "A cognitive distortion is an exaggerated or irrational thought pattern...",
    },
    {
      id: "2",
      title: "DBT emotion regulation",
      date: "2 days ago",
      preview: "DBT emotion regulation involves several skills including...",
    },
    {
      id: "3",
      title: "Trigger identification",
      date: "1 week ago",
      preview: "Triggers are situations, people, or events that cause...",
    },
  ]

  const handleAsk = () => {
    if (!question.trim()) return

    setMessages([...messages, { role: "user", content: question }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I'm here to help explain concepts from your class. Could you tell me more about what you'd like to understand better?",
        },
      ])
    }, 500)

    setQuestion("")
  }

  const loadChat = (chatId: string) => {
    // TODO: Load previous chat
    setShowHistory(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2 bg-transparent">
          <MessageCircle className="h-4 w-4" />
          Ask AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[700px] max-w-2xl flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>AI Assistant</DialogTitle>
              <DialogDescription>
                Ask questions about concepts, terms, or anything you don't understand
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
              <Clock className="h-4 w-4 mr-2" />
              {showHistory ? "Current Chat" : "History"}
            </Button>
          </div>
        </DialogHeader>

        {showHistory ? (
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-medium mb-3">Past Conversations</h3>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 pr-4">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className="w-full text-left rounded-lg border p-3 hover:bg-muted transition-colors"
                  >
                    <h4 className="font-medium text-sm mb-1">{chat.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{chat.preview}</p>
                    <p className="text-xs text-muted-foreground">{chat.date}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-4">
            <ScrollArea className="flex-1 max-h-[400px]">
              <div className="space-y-3 rounded-lg border p-4">
                {messages.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    Ask me anything about today's class, homework, or concepts you're learning
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Textarea
                placeholder="Ask your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAsk()
                  }
                }}
              />
              <Button onClick={handleAsk} size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
