"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function FacilitatorNotesCard() {
  const [copied, setCopied] = useState(false)

  const notes = `Session went well overall. Good engagement during cognitive restructuring exercises. Maria and John participated actively in problem-solving activities. Need to follow up with David regarding his application of techniques outside of class.

Key observations:
- Group is progressing well with identifying thinking errors
- Several participants shared personal examples
- Will emphasize practical application in next session`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(notes)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">Facilitator Notes</CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent" onClick={handleCopy} disabled={copied}>
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/40 p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{notes}</p>
        </div>
      </CardContent>
    </Card>
  )
}
