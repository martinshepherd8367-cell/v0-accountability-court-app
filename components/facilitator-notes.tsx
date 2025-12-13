"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Save } from "lucide-react"
import { useState } from "react"

export function FacilitatorNotes() {
  const [notes, setNotes] = useState("")

  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Facilitator Notes</CardTitle>
            <CardDescription>Private session notes</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Add notes about the session, participant engagement, concerns, etc..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[300px] resize-none"
          />

          <Button className="w-full gap-2 bg-transparent" variant="outline">
            <Save className="h-4 w-4" />
            Save Notes
          </Button>

          {/* Quick Notes */}
          <div className="space-y-2 rounded-lg border bg-accent/50 p-3">
            <p className="text-xs font-medium text-muted-foreground">QUICK NOTES</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Session started: 2:02 PM</p>
              <p>• 16/18 participants present</p>
              <p>• Good group engagement</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
