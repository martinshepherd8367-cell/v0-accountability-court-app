"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BookOpen } from "lucide-react"

export function DailyJournal() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [journalEntry, setJournalEntry] = useState("")

  // Mock data - will be replaced with real data
  const classes = [
    { id: "1", name: "Prime Solutions - Cognitive Restructuring", journalType: "Trigger Log" },
    { id: "2", name: "CoDA Recovery - Boundaries", journalType: "DBT Emotional Regulation" },
    { id: "3", name: "Anger Management Essentials", journalType: "Daily Reflection" },
  ]

  const selectedClassData = classes.find((c) => c.id === selectedClass)

  const getJournalPrompt = (journalType: string) => {
    switch (journalType) {
      case "Trigger Log":
        return "Describe any triggers you experienced today, your reaction, and how you responded:"
      case "DBT Emotional Regulation":
        return "1. What emotion did you feel most strongly today?\n2. What was the intensity (1-10)?\n3. What skill did you use to manage it?"
      case "Daily Reflection":
        return "Reflect on your day and any insights you gained:"
      default:
        return "Write your journal entry:"
    }
  }

  const handleSubmit = () => {
    // TODO: Submit journal entry
    console.log("Journal submitted:", { classId: selectedClass, entry: journalEntry })
    setJournalEntry("")
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Daily Journal</h3>
          <p className="text-sm text-muted-foreground mt-1">Track your progress and reflections</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">This week</span>
          <span className="font-medium">4 of 7 entries</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total entries</span>
          <span className="font-medium">28</span>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4" size="sm">
            Add Today's Entry
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Daily Journal Entry</DialogTitle>
            <DialogDescription>Select a class and complete your journal entry</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClassData && (
              <>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm font-medium mb-1">Journal Type: {selectedClassData.journalType}</p>
                  <p className="text-sm text-muted-foreground">{getJournalPrompt(selectedClassData.journalType)}</p>
                </div>

                <div className="space-y-2">
                  <Label>Your Entry</Label>
                  <Textarea
                    placeholder="Write your journal entry here..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button onClick={handleSubmit} disabled={!journalEntry.trim()}>
                    Submit Entry
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
