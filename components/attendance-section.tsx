"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { QrCode, UserCheck, UserX } from "lucide-react"
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
  const presentCount = participants.filter((p) => p.status === "present").length

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
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowQR(!showQR)}>
            <QrCode className="h-4 w-4" />
            {showQR ? "Hide QR Code" : "Show QR Code"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* QR Code Section */}
        {showQR && (
          <div className="mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-accent/50 p-8">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <QrCode className="h-32 w-32 text-primary" />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Participants can scan this code to check in
            </p>
            <p className="text-center text-xs text-muted-foreground">Session ID: PS-S4-2024</p>
          </div>
        )}

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
    </Card>
  )
}
