import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type ScoreTrend = "up" | "down" | "stable"

type ParticipantScoreBadgeProps = {
  score: number
  trend: ScoreTrend
  className?: string
}

export function ParticipantScoreBadge({ score, trend, className }: ParticipantScoreBadgeProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  // Get trend icon
  const getTrendIcon = (trend: ScoreTrend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      case "stable":
        return <Minus className="h-4 w-4" />
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-semibold",
        getScoreColor(score),
        className,
      )}
    >
      <span className="text-lg">{score}</span>
      {getTrendIcon(trend)}
    </div>
  )
}
