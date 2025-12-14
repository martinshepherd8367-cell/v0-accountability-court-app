"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageSquare } from "lucide-react"

type Message = {
  id: number
  participantName: string
  participantInitials: string
  program: string
  message: string
  timestamp: string
  priority: "normal" | "urgent"
}

const quickReplies = [
  "Thank you for reaching out. I'll review this and get back to you shortly.",
  "Great question! Please refer to the materials from Session X for more information.",
  "I understand your concern. Let's schedule a time to discuss this further.",
  "Your homework has been reviewed. Please check your feedback in the system.",
  "Please make sure to complete the assignment before the next session.",
  "Excellent work on your recent assignment! Keep up the good progress.",
  "I've noted your absence. Please reach out to reschedule your make-up session.",
]

type MessageReplyDialogProps = {
  message: Message | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageReplyDialog({ message, open, onOpenChange }: MessageReplyDialogProps) {
  const [selectedReply, setSelectedReply] = useState<string>("")
  const [customReply, setCustomReply] = useState("")

  const handleSend = () => {
    console.log("[v0] Sending reply:", {
      messageId: message?.id,
      reply: selectedReply || customReply,
    })
    // Reset form
    setSelectedReply("")
    setCustomReply("")
    onOpenChange(false)
  }

  if (!message) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Reply to Message</DialogTitle>
          <DialogDescription>Send a response to the participant</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            {/* Participant Info */}
            <div className="flex items-center gap-3 rounded-lg border bg-accent/20 p-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {message.participantInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{message.participantName}</h3>
                <p className="text-sm text-muted-foreground">{message.program}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{message.timestamp}</Badge>
                {message.priority === "urgent" && <Badge variant="destructive">Urgent</Badge>}
              </div>
            </div>

            {/* Original Message */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Original Message</Label>
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start gap-2 text-sm">
                  <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <p className="leading-relaxed text-foreground">{message.message}</p>
                </div>
              </div>
            </div>

            {/* Quick Reply Selection */}
            <div className="space-y-3">
              <Label htmlFor="quick-reply" className="text-base font-semibold">
                Quick Replies
              </Label>
              <Select value={selectedReply} onValueChange={setSelectedReply}>
                <SelectTrigger id="quick-reply">
                  <SelectValue placeholder="Select a template reply or write your own below" />
                </SelectTrigger>
                <SelectContent>
                  {quickReplies.map((reply, index) => (
                    <SelectItem key={index} value={reply}>
                      {reply}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Reply */}
            <div className="space-y-3">
              <Label htmlFor="custom-reply" className="text-base font-semibold">
                Or Write a Custom Reply
              </Label>
              <Textarea
                id="custom-reply"
                placeholder="Type your reply here..."
                value={customReply}
                onChange={(e) => setCustomReply(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!selectedReply && !customReply} className="gap-2">
            <Send className="h-4 w-4" />
            Send Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
