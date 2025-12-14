"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, ChevronDown, ChevronRight, Clock, Target, Package } from "lucide-react"
import type { Session } from "@/lib/curriculum-data"
import { useState } from "react"

interface SessionContentViewerProps {
  session: Session
  isFacilitator?: boolean
}

export function SessionContentViewer({ session, isFacilitator = false }: SessionContentViewerProps) {
  const [openActivities, setOpenActivities] = useState<number[]>([0])

  const toggleActivity = (index: number) => {
    setOpenActivities((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-balance">
              Session {session.id}: {session.title}
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{session.overview}</p>
          </div>
          <Badge variant="outline" className="shrink-0">
            <Clock className="mr-1 h-3 w-3" />
            {session.duration}
          </Badge>
        </div>

        {/* Objectives */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 text-primary shrink-0" />
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold">Session Objectives</h3>
              <ul className="space-y-1.5 text-sm">
                {session.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="leading-relaxed">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Materials */}
        {isFacilitator && (
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold">Materials & References</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {session.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Session Outline
        </h3>

        <div className="space-y-2">
          {session.activities.map((activity, index) => (
            <Collapsible key={index} open={openActivities.includes(index)} onOpenChange={() => toggleActivity(index)}>
              <Card className={openActivities.includes(index) ? "border-primary" : ""}>
                <CollapsibleTrigger className="w-full p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 text-left">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-balance">{activity.title}</h4>
                        <Badge variant="secondary" className="mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {activity.duration}
                        </Badge>
                      </div>
                    </div>
                    {openActivities.includes(index) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 space-y-4 border-t">
                    {activity.purpose && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Purpose:</p>
                        <p className="text-sm leading-relaxed">{activity.purpose}</p>
                      </div>
                    )}

                    {activity.script && (
                      <div className="bg-accent/50 p-3 rounded-lg border">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Facilitator Script:</p>
                        <p className="text-sm leading-relaxed italic">"{activity.script}"</p>
                      </div>
                    )}

                    {activity.instructions && activity.instructions.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Instructions:</p>
                        <ul className="space-y-1.5">
                          {activity.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              <span className="leading-relaxed">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activity.prompts && activity.prompts.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Discussion Prompts:</p>
                        <ul className="space-y-1.5">
                          {activity.prompts.map((prompt, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-amber-500 mt-1">•</span>
                              <span className="leading-relaxed">"{prompt}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Homework */}
      {session.homework && (
        <Card className="p-4 bg-accent/50 border-dashed">
          <div className="space-y-2">
            <h3 className="font-semibold">Homework Assignment</h3>
            <p className="text-sm leading-relaxed">{session.homework}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
