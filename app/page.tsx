import { DashboardHeader } from "@/components/dashboard-header"
import { NextClassCard } from "@/components/next-class-card"
import { ActiveProgramsList } from "@/components/active-programs-list"
import { QuickStats } from "@/components/quick-stats"

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
