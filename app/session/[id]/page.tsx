import { SessionHeader } from "@/components/session-header"
import { SessionAgenda } from "@/components/session-agenda"
import { AttendanceSection } from "@/components/attendance-section"
import { TakeawaysSection } from "@/components/takeaways-section"
import { FacilitatorNotes } from "@/components/facilitator-notes"
import { SynchronizedVideoPlayer } from "@/components/synchronized-video-player"
import { SessionContentViewer } from "@/components/session-content-viewer"
import { primeSolutionsCurriculum } from "@/lib/curriculum-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClassSessionPage() {
  const userRole: "facilitator" | "participant" = "facilitator"
  const sessionStatus: "active" | "ended" = "active"
  const sessionId = "session-1"

  const sessionNumber = 1 // In real app, parse from URL params
  const sessionData = primeSolutionsCurriculum.find((s) => s.id === sessionNumber)

  return (
    <div className="min-h-screen bg-background">
      <SessionHeader />

      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="flow" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flow">Session Flow</TabsTrigger>
                <TabsTrigger value="guide">Facilitator Guide</TabsTrigger>
              </TabsList>

              <TabsContent value="flow" className="space-y-6 mt-6">
                <SessionAgenda userRole={userRole} sessionId={sessionId} />
                <SynchronizedVideoPlayer userRole={userRole} sessionStatus={sessionStatus} />
                <AttendanceSection />
                <TakeawaysSection />
              </TabsContent>

              <TabsContent value="guide" className="mt-6">
                {sessionData ? (
                  <SessionContentViewer session={sessionData} isFacilitator={true} />
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    No curriculum content available for this session.
                  </div>
                )}
              </TabsContent>
            </Tabs>
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
