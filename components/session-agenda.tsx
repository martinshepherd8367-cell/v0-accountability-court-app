"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { AgendaModal } from "./agenda-modal"
import { sessionSync } from "@/lib/session-sync"

interface SessionAgendaProps {
  items?: any[]
  userRole?: "facilitator" | "participant"
  sessionId?: string
}

export function SessionAgenda({ items, userRole = "facilitator", sessionId = "session-1" }: SessionAgendaProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    if (userRole === "participant") {
      const unsubscribe = sessionSync.subscribe((data) => {
        if (data.sessionId === sessionId) {
          console.log("[v0] Participant received section update:", data.activeSection)
          setSelectedItem(data.activeSection)
        }
      })
      return unsubscribe
    }
  }, [userRole, sessionId])

  const handleSectionClick = (itemId: string) => {
    setSelectedItem(itemId)

    if (userRole === "facilitator") {
      console.log("[v0] Facilitator opening section:", itemId)
      sessionSync.broadcast({
        sessionId,
        activeSection: itemId,
      })
    }
  }

  const handleCloseModal = () => {
    setSelectedItem(null)

    if (userRole === "facilitator") {
      console.log("[v0] Facilitator closing section")
      sessionSync.broadcast({
        sessionId,
        activeSection: null,
      })
    }
  }

  const defaultAgendaItems = [
    {
      id: "checkin",
      duration: "10 min",
      title: "Welcome & Check-in",
      description: "Brief greetings and attendance verification",
      content: `
**Purpose:** Establish a welcoming environment and ensure all participants are present and engaged.

**Activities:**
1. Welcome participants as they arrive
2. Brief overview of today's session
3. Attendance verification (use QR code for efficiency)
4. Quick temperature check: "How is everyone feeling today?"
      `,
    },
    {
      id: "cognitive",
      duration: "30 min",
      title: "Cognitive Restructuring Exercise",
      description: "Identify and challenge negative thought patterns",
      content: `
**Purpose:** Help participants recognize and reframe unhelpful thinking patterns.

**Key Concepts:**
- Automatic thoughts vs. rational thoughts
- Common cognitive distortions
- The connection between thoughts, feelings, and behaviors
      `,
    },
    {
      id: "problem-solving",
      duration: "40 min",
      title: "Problem-Solving Framework",
      description: "Practice 5-step problem solving with real scenarios",
      content: `
  **Purpose:** Teach and practice a structured approach to solving problems.
  
  **The 5-Step Framework:**
  1. **Define the problem**
  2. **Brainstorm solutions**
  3. **Evaluate options**
  4. **Choose and implement**
  5. **Review the outcome**
        `,
    },
    {
      id: "discussion",
      duration: "20 min",
      title: "Group Discussion",
      description: "Share insights and personal applications",
      content: `
  **Purpose:** Allow participants to process learning and share personal connections.
  
  **Discussion Prompts:**
  - "Which cognitive distortion do you recognize in yourself?"
  - "Can you think of a recent situation where this problem-solving approach would have helped?"
        `,
    },
    {
      id: "wrapup",
      duration: "10 min",
      title: "Wrap-up & Takeaways",
      description: "Participants share key learnings",
      content: `
  **Purpose:** Consolidate learning and prepare participants to apply concepts outside of class.
  
  **Activities:**
  1. Quick recap of main concepts
  2. Each participant shares one takeaway
  3. Preview next session topic
        `,
    },
  ]

  const agendaItems = items || defaultAgendaItems

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Session Agenda</CardTitle>
              <CardDescription>Today's class structure and topics</CardDescription>
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="rounded-lg p-2 hover:bg-accent">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                {agendaItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className="flex w-full gap-3 rounded-lg border p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/50"
                  >
                    <Badge variant="outline" className="h-6 shrink-0">
                      {item.duration}
                    </Badge>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {selectedItem && (
        <AgendaModal
          item={agendaItems.find((item) => item.id === selectedItem)!}
          onClose={handleCloseModal}
          userRole={userRole}
        />
      )}
    </>
  )
}
