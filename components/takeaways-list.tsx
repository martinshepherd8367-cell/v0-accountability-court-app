"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const takeaways = [
  {
    id: 1,
    participant: "Sarah Martinez",
    takeaway:
      "I learned how to identify negative thinking patterns and challenge them with evidence. This will help me stop catastrophizing situations at work.",
  },
  {
    id: 2,
    participant: "James Wilson",
    takeaway:
      "The problem-solving steps make sense. I'm going to use the worksheet to tackle my housing situation one step at a time instead of feeling overwhelmed.",
  },
  {
    id: 3,
    participant: "Maria Garcia",
    takeaway:
      "Recognizing my thinking errors (especially black-and-white thinking) was eye-opening. I can see how this affects my relationships.",
  },
  {
    id: 4,
    participant: "Michael Chen",
    takeaway:
      "Breaking problems down into manageable pieces is something I can actually do. The structured approach takes away the anxiety I usually feel.",
  },
  {
    id: 5,
    participant: "Jennifer Brown",
    takeaway:
      "Understanding that thoughts aren't facts was powerful. I'm going to practice questioning my automatic negative thoughts daily.",
  },
  {
    id: 6,
    participant: "David Thompson",
    takeaway:
      "The cognitive restructuring worksheet is a tool I can use when I start to spiral. Having a concrete method helps.",
  },
  {
    id: 7,
    participant: "Lisa Anderson",
    takeaway:
      "I learned that I have more control over my reactions than I thought. Changing my thinking can change how I feel.",
  },
  {
    id: 8,
    participant: "Robert Martinez",
    takeaway:
      "Problem-solving doesn't have to be scary. The step-by-step process makes it feel manageable and gives me confidence.",
  },
]

export function TakeawaysList() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = async (id: number, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Participant Takeaways</CardTitle>
        <p className="text-sm text-muted-foreground">Individual learnings ready to copy to CaseWorx</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {takeaways.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-lg border bg-card p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-primary">{item.participant}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.takeaway}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 shrink-0 gap-2 bg-transparent"
              onClick={() => handleCopy(item.id, `${item.participant}: ${item.takeaway}`)}
              disabled={copiedId === item.id}
            >
              {copiedId === item.id ? (
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
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
