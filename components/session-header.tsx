import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export function SessionHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Prime Solutions - Session 4</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  In Progress
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Cognitive Restructuring & Problem Solving</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Session Timer */}
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">47:32</span>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">16/18</span>
            </div>

            {/* End Session Button */}
            <Link href="/session/1/summary">
              <Button variant="outline" className="gap-2 bg-transparent">
                <CheckCircle className="h-4 w-4" />
                End Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
