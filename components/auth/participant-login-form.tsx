"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ParticipantLoginForm() {
  const router = useRouter()
  const [participantId, setParticipantId] = useState("")
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to participant dashboard
    router.push("/participant/dashboard")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <UserCircle className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Participant Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your program dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="participantId">Participant ID</Label>
            <Input
              id="participantId"
              type="text"
              placeholder="Your participant ID"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin">PIN</Label>
            <Input
              id="pin"
              type="password"
              placeholder="4-digit PIN"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground pt-4 space-y-2">
            <p className="text-xs">After signing in, use QR codes to check in to your scheduled sessions</p>
            <p>
              Need help?{" "}
              <Link href="/participant/support" className="text-primary hover:underline font-medium">
                Contact your facilitator
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
