"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, MessageSquare } from "lucide-react"

interface Participant {
  id: number
  name: string
  email: string
  status: "Active" | "Inactive"
}

interface ClassProgram {
  name: string
  participants: Participant[]
}

interface ParticipantsByClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ParticipantsByClassModal({ open, onOpenChange }: ParticipantsByClassModalProps) {
  const [classPrograms, setClassPrograms] = useState<Record<string, ClassProgram>>({
    "prime-solutions": {
      name: "Prime Solutions",
      participants: [
        { id: 1, name: "Sarah Johnson", email: "sarah@example.com", status: "Active" },
        { id: 2, name: "Michael Chen", email: "michael@example.com", status: "Active" },
        { id: 3, name: "David Martinez", email: "david@example.com", status: "Inactive" },
      ],
    },
    coda: {
      name: "CoDA Recovery Program",
      participants: [
        { id: 4, name: "Emily Wilson", email: "emily@example.com", status: "Active" },
        { id: 5, name: "James Brown", email: "james@example.com", status: "Active" },
      ],
    },
    "anger-mgmt": {
      name: "Anger Management",
      participants: [
        { id: 6, name: "Lisa Anderson", email: "lisa@example.com", status: "Active" },
        { id: 7, name: "Robert Taylor", email: "robert@example.com", status: "Active" },
      ],
    },
  })

  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [showMessageModal, setShowMessageModal] = useState(false)

  const handleRemoveParticipant = (programKey: string, participantId: number) => {
    setClassPrograms((prev) => ({
      ...prev,
      [programKey]: {
        ...prev[programKey],
        participants: prev[programKey].participants.filter((p) => p.id !== participantId),
      },
    }))
  }

  const handleSendMessageToAll = () => {
    if (selectedClass && messageText.trim()) {
      console.log(`Message sent to all in ${classPrograms[selectedClass].name}:`, messageText)
      setMessageText("")
      setShowMessageModal(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-96 flex flex-col">
        <DialogHeader>
          <DialogTitle>{selectedClass ? classPrograms[selectedClass].name : "Participants by Class"}</DialogTitle>
          <DialogDescription>
            {selectedClass ? "View and manage participants in this class" : "Select a class to view participants"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="px-6">
            {!selectedClass ? (
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(classPrograms).map(([key, program]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedClass(key)}
                    className="text-left p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{program.name}</h3>
                        <p className="text-sm text-muted-foreground">{program.participants.length} participants</p>
                      </div>
                      <div className="text-teal-600 font-semibold">→</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-4"
                >
                  ← Back to classes
                </button>

                <div className="space-y-2">
                  {classPrograms[selectedClass].participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600 flex-shrink-0">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{participant.email}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          participant.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {participant.status}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveParticipant(selectedClass, participant.id)}
                        className="text-red-600 hover:bg-red-100 ml-2"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={() => setShowMessageModal(true)} className="w-full bg-teal-600 hover:bg-teal-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message to All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {showMessageModal && selectedClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Message All Participants</h3>
                <button onClick={() => setShowMessageModal(false)} className="rounded-full hover:bg-muted p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <textarea
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full border rounded-lg p-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessageToAll} className="bg-teal-600 hover:bg-teal-700">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
