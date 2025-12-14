import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle2, Calendar, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Active Participants",
    value: "48",
    icon: Users,
    description: "Across 3 programs",
  },
  {
    label: "Completion Rate",
    value: "87%",
    icon: CheckCircle2,
    description: "Last 30 days",
  },
  {
    label: "Classes This Week",
    value: "6",
    icon: Calendar,
    description: "2 completed",
  },
  {
    label: "Facilitator Effectiveness",
    value: "92",
    icon: TrendingUp,
    description: "AI Generated Score (Admin View)",
  },
]

export function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
