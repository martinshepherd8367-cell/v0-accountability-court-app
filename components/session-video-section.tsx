"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Share2, FileText, Play, Pause, Volume2, Maximize } from "lucide-react"

export function SessionVideoSection() {
  const [notes, setNotes] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [quickNotes, setQuickNotes] = useState([
    "Session started: 2:02 PM",
    "16/18 participants present",
    "Good group engagement",
  ])

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes)
  }

  const handleShareVideo = () => {
    console.log("Video shared with all participants")
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="space-y-6">
      {/* Video Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Session Video</CardTitle>
                <CardDescription>Control video playback for all participants</CardDescription>
              </div>
            </div>
            <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
              Facilitator
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video Player Placeholder */}
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative group">
            <Video className="h-16 w-16 text-gray-600" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex-1 bg-white/30 h-1 rounded-full relative cursor-pointer">
                  <div className="absolute left-0 top-0 h-full w-0 bg-primary rounded-full"></div>
                </div>
                <span className="text-white text-sm font-medium">0:00 / 0:00</span>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={togglePlay} variant="outline" className="gap-2 bg-transparent">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"} for All
            </Button>
            <Button onClick={handleShareVideo} className="bg-primary hover:bg-primary/90 gap-2">
              <Share2 className="h-4 w-4" />
              Share Video
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Facilitator Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Facilitator Notes</CardTitle>
              <CardDescription>Private session notes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notes Text Area */}
          <Textarea
            placeholder="Add notes about the session, participant engagement, concerns, etc..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border-teal-200 focus:border-teal-600 min-h-24"
          />

          {/* Save Button */}
          <Button
            onClick={handleSaveNotes}
            variant="outline"
            className="border-teal-200 hover:bg-teal-50 bg-transparent"
          >
            <FileText className="h-4 w-4 mr-2" />
            Save Notes
          </Button>

          {/* Quick Notes */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-semibold mb-3 text-primary uppercase tracking-wide">Quick Notes</p>
            <ul className="space-y-2">
              {quickNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
