import { SessionHeader } from "@/components/session-header"
import { SessionAgenda } from "@/components/session-agenda"
import { AttendanceSection } from "@/components/attendance-section"
import { TakeawaysSection } from "@/components/takeaways-section"
import { FacilitatorNotes } from "@/components/facilitator-notes"
import { SessionVideoSection } from "@/components/session-video-section"

export default function ClassSessionPage() {
  return (
    <div className="min-h-screen bg-background">
      <SessionHeader />

      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <SessionAgenda />
            <AttendanceSection />
            <TakeawaysSection />
            <SessionVideoSection />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <FacilitatorNotes />
          </aside>
        </div>
      </main>
    </div>
  )
}
