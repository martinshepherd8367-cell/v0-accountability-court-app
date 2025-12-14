"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function FacilitatorLoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate login delay
        setTimeout(() => {
            router.push("/facilitator/dashboard")
        }, 1000)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Facilitator Login</h1>
                    <p className="text-muted-foreground">Sign in to manage your classes</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <Link href="/" className="text-primary hover:underline">
                        &larr; Back to Role Selection
                    </Link>
                </div>
            </div>
        </div>
    )
}
