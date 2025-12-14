import { DashboardHeader } from "@/components/dashboard-header"
import { NextClassCard } from "@/components/next-class-card"
import { ActiveProgramsList } from "@/components/active-programs-list"
import { QuickStats } from "@/components/quick-stats"
import { ParticipantMessages } from "@/components/participant-messages"
import { HomeworkNotifications } from "@/components/homework-notifications"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <NextClassCard />
            <ActiveProgramsList />
            <ParticipantMessages />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:w-80">
            <QuickStats />
            <HomeworkNotifications />
          </aside>
        </div>
      </main>
    </div>
  )
}
