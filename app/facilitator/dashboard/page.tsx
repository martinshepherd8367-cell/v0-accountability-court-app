"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { NextClassCard } from "@/components/next-class-card"
import { ActiveProgramsList } from "@/components/active-programs-list"
import { QuickStats } from "@/components/quick-stats"
import { ParticipantMessagesSection } from "@/components/participant-messages-section"
import { HomeworkSubmissionsSection } from "@/components/homework-submissions-section"

const initialPrograms = [
  {
    id: 1,
    program: "Prime Solutions",
    currentSession: 4,
    totalSessions: 12,
    nextClass: {
      session: 4,
      topic: "Cognitive Restructuring",
      date: "Today, 2:00 PM",
      location: "Courtroom 3A",
      participants: 18,
    },
    progress: 33,
    sessions: [
      {
        id: 1,
        number: 5,
        title: "Emotional Regulation Techniques",
        date: "12/20/2024",
        time: "14:00",
        location: "Courtroom 3A",
      },
      {
        id: 2,
        number: 6,
        title: "Building Healthy Relationships",
        date: "1/3/2025",
        time: "14:00",
        location: "Courtroom 3A",
      },
      { id: 3, number: 7, title: "Communication Skills", date: "1/10/2025", time: "14:00", location: "Courtroom 3A" },
      {
        id: 4,
        number: 8,
        title: "Problem-Solving Strategies",
        date: "1/17/2025",
        time: "14:00",
        location: "Courtroom 3A",
      },
    ],
  },
  {
    id: 2,
    program: "CoDA Recovery Program",
    currentSession: 2,
    totalSessions: 8,
    nextClass: {
      session: 2,
      topic: "Understanding Codependency",
      date: "Thu, Dec 19 at 10:00 AM",
      location: "Meeting Room B",
      participants: 12,
    },
    progress: 25,
    sessions: [
      {
        id: 1,
        number: 3,
        title: "Advanced Coping Strategies",
        date: "12/25/2024",
        time: "10:00",
        location: "Meeting Room B",
      },
      { id: 2, number: 4, title: "Group Dynamics", date: "1/2/2025", time: "10:00", location: "Meeting Room B" },
    ],
  },
  {
    id: 3,
    program: "Anger Management",
    currentSession: 6,
    totalSessions: 10,
    nextClass: {
      session: 6,
      topic: "Conflict Resolution Skills",
      date: "Fri, Dec 20 at 3:00 PM",
      location: "Courtroom 2B",
      participants: 15,
    },
    progress: 60,
    sessions: [
      { id: 1, number: 7, title: "Anger Triggers", date: "12/30/2024", time: "15:00", location: "Courtroom 2B" },
      { id: 2, number: 8, title: "Effective Communication", date: "1/6/2025", time: "15:00", location: "Courtroom 2B" },
      { id: 3, number: 9, title: "Stress Management", date: "1/13/2025", time: "15:00", location: "Courtroom 2B" },
      { id: 4, number: 10, title: "Relaxation Techniques", date: "1/20/2025", time: "15:00", location: "Courtroom 2B" },
    ],
  },
]

export default function DashboardPage() {
  const [programs, setPrograms] = useState(initialPrograms)

  const handleAddProgram = (newProgram: any) => {
    console.log("[v0] handleAddProgram called with:", newProgram)

    const programSessions = Array.from({ length: newProgram.sessions }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Session ${i + 1}`,
      date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      time: "14:00",
      location: "Courtroom 3A",
    }))

    const addedProgram = {
      id: Math.max(...programs.map((p) => p.id), 0) + 1,
      program: newProgram.programName,
      currentSession: 0,
      totalSessions: newProgram.sessions,
      nextClass: {
        session: 1,
        topic: `Session 1`,
        date: "TBD",
        location: "TBD",
        participants: 0,
      },
      progress: 0,
      sessions: programSessions,
    }

    console.log("[v0] Adding new program:", addedProgram)
    setPrograms([...programs, addedProgram])
    console.log("[v0] Programs after add:", [...programs, addedProgram])
  }

  const handleDeleteProgram = (programId: number) => {
    if (confirm("Are you sure you want to delete this program? This action cannot be undone.")) {
      setPrograms(programs.filter(p => p.id !== programId))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onAddProgram={handleAddProgram} />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <NextClassCard />
            <ActiveProgramsList programs={programs} onDeleteProgram={handleDeleteProgram} />
            <ParticipantMessagesSection />
            <HomeworkSubmissionsSection />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <QuickStats />
          </aside>
        </div>
      </main>
    </div>
  )
}
