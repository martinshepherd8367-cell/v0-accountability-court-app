"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserMinus, Mail, Phone, AlertTriangle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ManageParticipantsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programId: number
}

const programParticipants = [
  {
    id: 1,
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "mjohnson@email.com",
    phone: "(555) 123-4567",
    attendance: "16/18",
    status: "active",
    score: 85,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "swilliams@email.com",
    phone: "(555) 234-5678",
    attendance: "18/18",
    status: "active",
    score: 92,
  },
  {
    id: 3,
    name: "James Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "jdavis@email.com",
    phone: "(555) 345-6789",
    attendance: "15/18",
    status: "active",
    score: 78,
  },
  {
    id: 4,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "mgarcia@email.com",
    phone: "(555) 456-7890",
    attendance: "17/18",
    status: "active",
    score: 88,
  },
  {
    id: 5,
    name: "Robert Taylor",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "rtaylor@email.com",
    phone: "(555) 567-8901",
    attendance: "14/18",
    status: "warning",
    score: 65,
  },
  {
    id: 6,
    name: "Jennifer Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "jbrown@email.com",
    phone: "(555) 678-9012",
    attendance: "18/18",
    status: "active",
    score: 90,
  },
]

export function ManageParticipantsDialog({
  open,
  onOpenChange,
  programName,
  programId,
}: ManageParticipantsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [removeParticipant, setRemoveParticipant] = useState<number | null>(null)

  const filteredParticipants = programParticipants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRemoveParticipant = (participantId: number) => {
    console.log("[v0] Removing participant:", participantId)
    setRemoveParticipant(null)
    // Logic to remove participant
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{programName} - Manage Participants</DialogTitle>
            <DialogDescription>View and manage participants enrolled in this program</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search participants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Participants List */}
            <ScrollArea className="h-[450px] pr-4">
              <div className="space-y-3">
                {filteredParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{participant.name}</h4>
                            {participant.status === "warning" && (
                              <Badge variant="outline" className="border-amber-500 text-amber-600">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                At Risk
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3" />
                              <span>{participant.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3" />
                              <span>{participant.phone}</span>
                            </div>
                          </div>
                        </div>

                        <Button size="sm" variant="destructive" onClick={() => setRemoveParticipant(participant.id)}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Attendance:</span>
                          <Badge variant="secondary">{participant.attendance}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Score:</span>
                          <Badge
                            variant={
                              participant.score >= 80
                                ? "default"
                                : participant.score >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {participant.score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={removeParticipant !== null} onOpenChange={() => setRemoveParticipant(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Participant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this participant from the program? This action cannot be undone. The
              participant will be notified of their removal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeParticipant && handleRemoveParticipant(removeParticipant)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Participant
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
