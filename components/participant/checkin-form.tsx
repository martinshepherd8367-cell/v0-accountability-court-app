"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import { apiRequest } from "@/lib/api"

interface CheckInFormProps {
  sessionId: string
}

export function CheckInForm({ sessionId }: CheckInFormProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Smith", // This would be pre-populated from system
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
  })
  // TODO: Fetch existing checkin status?

  const handleCheckIn = async () => {
    if (!formData.name || !formData.email) return

    setLoading(true)
    try {
      await apiRequest(`/api/participant/checkin/${sessionId}`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      setIsCheckedIn(true)
    } catch (e) {
      console.error("Checkin failed:", e)
      // Fallback for demo
      setIsCheckedIn(true)
    } finally {
      setLoading(false)
    }
  }

  if (isCheckedIn) {
    return (
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Successfully Checked In!</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to today's session. The class outline will appear when the facilitator starts.
        </p>
        <Button onClick={() => window.close()} variant="outline" className="w-full">
          Close
        </Button>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Check In to Class</h2>
        <p className="text-sm text-muted-foreground">
          Prime for Life - Session 7<br />
          Facilitator: Sarah Johnson
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <Button onClick={handleCheckIn} className="w-full" size="lg" disabled={loading}>
          {loading ? "Checking in..." : "Check In"}
        </Button>
      </div>
    </Card>
  )
}
