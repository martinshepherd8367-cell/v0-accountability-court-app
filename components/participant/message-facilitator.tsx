"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send } from "lucide-react"

export function MessageFacilitator() {
  const [selectedFacilitator, setSelectedFacilitator] = useState<string>("")
  const [newMessage, setNewMessage] = useState("")

  // Mock data - will be replaced with real data
  const facilitators = [
    {
      id: "1",
      name: "Sarah Johnson",
      class: "Prime Solutions",
      messages: [
        { from: "facilitator", content: "Great progress this week!", timestamp: "2 days ago" },
        { from: "participant", content: "Thank you! I have a question about homework.", timestamp: "1 day ago" },
      ],
    },
    {
      id: "2",
      name: "Michael Chen",
      class: "CoDA Recovery",
      messages: [
        { from: "participant", content: "Can we review boundaries?", timestamp: "3 days ago" },
        { from: "facilitator", content: "Let's discuss in next session.", timestamp: "3 days ago" },
      ],
    },
  ]

  const selectedFacilitatorData = facilitators.find((f) => f.id === selectedFacilitator)

  const handleSend = () => {
    if (!newMessage.trim()) return
    // TODO: Send message
    console.log("Message sent:", { facilitatorId: selectedFacilitator, message: newMessage })
    setNewMessage("")
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-secondary/10">
          <MessageSquare className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Messages</h3>
          <p className="text-sm text-muted-foreground mt-1">Contact your facilitators</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Unread</span>
          <span className="font-medium">2 messages</span>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4 bg-transparent" variant="outline" size="sm">
            View Messages
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[700px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
            <DialogDescription>Contact your facilitators and view message history</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Facilitator</Label>
              <Select value={selectedFacilitator} onValueChange={setSelectedFacilitator}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a facilitator..." />
                </SelectTrigger>
                <SelectContent>
                  {facilitators.map((fac) => (
                    <SelectItem key={fac.id} value={fac.id}>
                      {fac.name} - {fac.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedFacilitatorData && (
              <>
                <div className="space-y-2">
                  <Label>Message History</Label>
                  <div className="max-h-[300px] space-y-3 overflow-y-auto rounded-lg border p-4">
                    {selectedFacilitatorData.messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.from === "participant" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-[80%] space-y-1">
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              msg.from === "participant"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground px-2">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>New Message</Label>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[100px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                    />
                    <Button onClick={handleSend} size="icon" className="shrink-0 h-10 w-10">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
