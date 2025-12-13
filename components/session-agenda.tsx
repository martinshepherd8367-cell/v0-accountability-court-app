"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { AgendaModal } from "./agenda-modal"

export function SessionAgenda() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const agendaItems = [
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

**Facilitator Notes:**
- Keep this section brief but warm
- Note any missing participants
- Set a positive, supportive tone for the session
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
- Common cognitive distortions (all-or-nothing thinking, catastrophizing, etc.)
- The connection between thoughts, feelings, and behaviors

**Activities:**
1. Present a common scenario (10 min)
2. Identify automatic negative thoughts (5 min)
3. Challenge those thoughts with evidence (10 min)
4. Develop alternative, balanced thoughts (5 min)

**Discussion Questions:**
- "What was your first thought when you heard this scenario?"
- "What evidence supports or contradicts that thought?"
- "What would you tell a friend in this situation?"

**Materials Needed:**
- Thought record worksheet
- Example scenarios relevant to group
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
1. **Define the problem** - What exactly is the issue?
2. **Brainstorm solutions** - Generate multiple options without judgment
3. **Evaluate options** - Consider pros and cons of each
4. **Choose and implement** - Select the best option and make a plan
5. **Review the outcome** - Did it work? What did you learn?

**Activities:**
1. Present the framework (10 min)
2. Work through an example together (15 min)
3. Small group practice with real scenarios (15 min)

**Example Scenarios:**
- Transportation challenges
- Conflict with family member
- Managing court requirements with work schedule
- Financial constraints

**Facilitator Tips:**
- Encourage creative brainstorming
- Remind participants there's rarely one "right" answer
- Focus on realistic, actionable solutions
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
- "What's one thing from today that you want to try this week?"

**Facilitation Guidelines:**
- Create a safe space for sharing
- Validate all contributions
- Gently redirect if discussion goes off-track
- Ensure everyone who wants to speak has opportunity
- Don't force participation

**Group Agreements (Review if needed):**
- Confidentiality
- Respect
- One person speaks at a time
- Right to pass
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
1. Quick recap of main concepts (2-3 min)
2. Each participant shares one takeaway (5-6 min)
3. Preview next session topic (1 min)
4. Reminder about next class date/time (1 min)

**Closing Questions:**
- "What's one thing you learned today?"
- "What's one thing you'll try before our next session?"
- "Any questions before we close?"

**Administrative:**
- Ensure all takeaways are captured in the system
- Note any follow-up needed for individual participants
- Collect any materials/worksheets
- Thank participants for their engagement
      `,
    },
  ]

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
              {/* Agenda Items */}
              <div className="space-y-3">
                {agendaItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
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
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  )
}
