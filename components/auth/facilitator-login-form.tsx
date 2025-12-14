"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function FacilitatorLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to facilitator dashboard
    router.push("/")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Scale className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Facilitator Sign In</CardTitle>
        <CardDescription>Access your accountability court program dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="facilitator@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link href="/facilitator/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>
              Participant?{" "}
              <Link href="/participant/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
