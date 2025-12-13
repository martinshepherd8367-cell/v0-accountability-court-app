import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Play } from "lucide-react"

export function ActiveClassCard() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Prime Solutions - Session 4</CardTitle>
              <Badge className="bg-primary text-primary-foreground">Active</Badge>
            </div>
            <CardDescription>Cognitive Restructuring & Problem Solving</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Class Details */}
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Today, 2:00 PM - 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Courtroom 3A</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>18 Participants Expected</span>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full gap-2" size="lg">
            <Play className="h-4 w-4" />
            Start Class Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
