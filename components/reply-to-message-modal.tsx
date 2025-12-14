"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Send } from "lucide-react"

const quickReplies = [
  "Thanks for reaching out. I'll review this and get back to you soon.",
  "Great question! This is an important concept in the program.",
  "I understand your concern. Let's discuss this in our next session.",
  "Excellent work on this assignment. You're making great progress!",
]

interface ReplyToMessageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: {
    sender: string
    program: string
    text: string
    timestamp: string
  }
}

export function ReplyToMessageModal({ open, onOpenChange, message }: ReplyToMessageModalProps) {
  const [customReply, setCustomReply] = useState("")
  const [selectedQuickReply, setSelectedQuickReply] = useState("")

  const handleSend = () => {
    console.log({
      reply: customReply || selectedQuickReply,
      to: message?.sender,
    })
    onOpenChange(false)
    setCustomReply("")
    setSelectedQuickReply("")
  }

  if (!message) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Reply to Message</DialogTitle>
              <DialogDescription>Send a response to the participant</DialogDescription>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Participant Info */}
          <div className="rounded-lg bg-teal-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white font-semibold">
                {message.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{message.sender}</p>
                <p className="text-sm text-muted-foreground">{message.program}</p>
                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Original Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Original Message</label>
            <div className="rounded-lg border bg-muted p-4 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-lg">💬</span>
                <span>{message.text}</span>
              </p>
            </div>
          </div>

          {/* Quick Replies */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Replies</label>
            <Select value={selectedQuickReply} onValueChange={setSelectedQuickReply}>
              <SelectTrigger className="border-teal-200 focus:border-teal-600">
                <SelectValue placeholder="Select a template reply or write your own below" />
              </SelectTrigger>
              <SelectContent>
                {quickReplies.map((reply, idx) => (
                  <SelectItem key={idx} value={reply}>
                    {reply.substring(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Reply */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Or Write a Custom Reply</label>
            <Textarea
              placeholder="Type your reply here..."
              value={customReply}
              onChange={(e) => {
                setCustomReply(e.target.value)
                setSelectedQuickReply("")
              }}
              className="border-teal-200 focus:border-teal-600 min-h-32"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!customReply && !selectedQuickReply}
              className="bg-teal-600 hover:bg-teal-700 gap-2"
            >
              <Send className="h-4 w-4" />
              Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
