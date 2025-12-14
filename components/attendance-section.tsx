"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QrCode, UserCheck, UserX, Plus, Copy, Check } from "lucide-react"
import { useState } from "react"

const participants = [
  { id: 1, name: "Sarah Johnson", status: "present", checkedInAt: "2:03 PM" },
  { id: 2, name: "Michael Chen", status: "present", checkedInAt: "2:01 PM" },
  { id: 3, name: "Jennifer Martinez", status: "present", checkedInAt: "2:05 PM" },
  { id: 4, name: "David Williams", status: "absent", checkedInAt: null },
  { id: 5, name: "Emily Brown", status: "present", checkedInAt: "2:02 PM" },
  { id: 6, name: "James Taylor", status: "present", checkedInAt: "2:04 PM" },
  { id: 7, name: "Lisa Anderson", status: "present", checkedInAt: "2:06 PM" },
  { id: 8, name: "Robert Garcia", status: "present", checkedInAt: "2:00 PM" },
]

export function AttendanceSection() {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const presentCount = participants.filter((p) => p.status === "present").length

  const sessionId = "ps-s4-2024"
  const checkinUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/participant/checkin/${sessionId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(checkinUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>
              {presentCount} of {participants.length} participants present
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Add Participant
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowQR(!showQR)}>
              <QrCode className="h-4 w-4" />
              {showQR ? "Hide" : "Show"} QR
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Attendance List */}
        <div className="space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <Checkbox checked={participant.status === "present"} className="h-5 w-5" />
                <div>
                  <p className="font-medium">{participant.name}</p>
                  {participant.checkedInAt && (
                    <p className="text-xs text-muted-foreground">Checked in at {participant.checkedInAt}</p>
                  )}
                </div>
              </div>
              <Badge
                variant={participant.status === "present" ? "secondary" : "outline"}
                className={participant.status === "present" ? "gap-1 bg-primary/10 text-primary" : "gap-1"}
              >
                {participant.status === "present" ? (
                  <>
                    <UserCheck className="h-3 w-3" />
                    Present
                  </>
                ) : (
                  <>
                    <UserX className="h-3 w-3" />
                    Absent
                  </>
                )}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check-In QR Code</DialogTitle>
            <DialogDescription>Participants can scan this code to check in to the session</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <QrCode className="h-48 w-48 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Session ID: {sessionId}</p>
              <p className="mt-1 text-xs text-muted-foreground">Check-in opens 10 minutes before class</p>
            </div>
            <Button
              onClick={handleCopyLink}
              size="sm"
              className="w-full gap-2"
              variant={copied ? "secondary" : "outline"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Check-In Link
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
