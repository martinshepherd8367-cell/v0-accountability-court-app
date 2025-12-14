"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScanFace, Keyboard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ParticipantLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // This handles the "Scan QR Code" button click
  // In a real app, this might open a camera modal or redirect to a scanning page
  const handleScanClick = () => {
    router.push("/participant/qr-scan")
  }

  // Developer bypass / Manual entry simulation
  const handleManualEntry = async () => {
    setIsLoading(true)
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Log in as a test user
    router.push("/participant/dashboard")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <ScanFace className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Participant Access</CardTitle>
        <CardDescription>Scan your program QR code to sign in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Primary Action: Scan QR */}
        <Button
          onClick={handleScanClick}
          className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
        >
          <ScanFace className="w-6 h-6" />
          Scan Check-in Code
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Secondary Action: Manual/Debug */}
        <Button
          variant="outline"
          onClick={handleManualEntry}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2"
        >
          <Keyboard className="w-4 h-4" />
          {isLoading ? "Verifying..." : "Manual Entry (Debug)"}
        </Button>

        <div className="text-center text-sm text-muted-foreground pt-4 space-y-2">
          <p>
            Need help?{" "}
            <Link href="/participant/support" className="text-primary hover:underline font-medium">
              Ask handling officer
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
