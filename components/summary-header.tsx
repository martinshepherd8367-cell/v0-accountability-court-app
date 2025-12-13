import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export function SummaryHeader() {
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
                <h1 className="text-2xl font-semibold tracking-tight">Session Summary</h1>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700">
                  Completed
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Prime Solutions - Session 4 • Cognitive Restructuring & Problem Solving
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
