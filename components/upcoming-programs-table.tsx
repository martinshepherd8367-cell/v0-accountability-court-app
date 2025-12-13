import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const upcomingPrograms = [
  {
    id: 1,
    program: "Prime Solutions",
    session: 5,
    topic: "Emotional Intelligence",
    date: "Wed, Dec 18",
    time: "2:00 PM",
    location: "Courtroom 3A",
    participants: 18,
    status: "upcoming" as const,
  },
  {
    id: 2,
    program: "CoDA Recovery",
    session: 2,
    topic: "Understanding Codependency",
    date: "Thu, Dec 19",
    time: "10:00 AM",
    location: "Meeting Room B",
    participants: 12,
    status: "upcoming" as const,
  },
  {
    id: 3,
    program: "Prime Solutions",
    session: 6,
    topic: "Building Healthy Relationships",
    date: "Wed, Dec 25",
    time: "2:00 PM",
    location: "Courtroom 3A",
    participants: 18,
    status: "locked" as const,
  },
]

export function UpcomingProgramsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Your scheduled program sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPrograms.map((program) => (
            <div
              key={program.id}
              className="flex items-start justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">
                    {program.program} - Session {program.session}
                  </h3>
                  {program.status === "locked" && (
                    <Badge variant="secondary" className="text-xs">
                      Locked
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{program.topic}</p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {program.date} at {program.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{program.location}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel Class</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
