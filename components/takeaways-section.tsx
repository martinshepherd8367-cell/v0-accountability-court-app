import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Lightbulb } from "lucide-react"

const participants = [
  {
    id: 1,
    name: "Sarah Johnson",
    takeaway: "I learned to identify my automatic negative thoughts and challenge them with evidence.",
  },
  {
    id: 2,
    name: "Michael Chen",
    takeaway: "The 5-step problem solving process will help me break down overwhelming situations.",
  },
  { id: 3, name: "Jennifer Martinez", takeaway: "" },
  { id: 5, name: "Emily Brown", takeaway: "Understanding that thoughts aren't facts - I can choose how to respond." },
]

export function TakeawaysSection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Participant Takeaways</CardTitle>
            <CardDescription>What participants learned today</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{participant.name}</label>
                {participant.takeaway && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Submitted
                  </Badge>
                )}
              </div>
              <Textarea
                placeholder="Participant's key learning or insight..."
                value={participant.takeaway}
                readOnly
                className="min-h-[80px] resize-none bg-accent/50"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
