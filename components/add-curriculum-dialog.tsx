"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, BookOpen } from "lucide-react"

// Sample class library data
const classLibrary = [
  { id: "prime-1", name: "Prime Solutions - Introduction", category: "Prime Solutions" },
  { id: "prime-2", name: "Prime Solutions - Cognitive Restructuring", category: "Prime Solutions" },
  { id: "prime-3", name: "Prime Solutions - Decision Making", category: "Prime Solutions" },
  { id: "coda-1", name: "CoDA - Understanding Codependency", category: "CoDA" },
  { id: "coda-2", name: "CoDA - Healthy Boundaries", category: "CoDA" },
  { id: "anger-1", name: "Anger Management - Identifying Triggers", category: "Anger Management" },
  { id: "anger-2", name: "Anger Management - Conflict Resolution", category: "Anger Management" },
  { id: "substance-1", name: "Substance Abuse - Recovery Foundations", category: "Substance Abuse" },
]

export function AddCurriculumDialog() {
  const [open, setOpen] = useState(false)
  const [programName, setProgramName] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [totalSessions, setTotalSessions] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    // Handle form submission
    console.log("[v0] Adding curriculum:", {
      programName,
      selectedClass,
      totalSessions,
      description,
    })
    setOpen(false)
    // Reset form
    setProgramName("")
    setSelectedClass("")
    setTotalSessions("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Program
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Program Curriculum</DialogTitle>
          <DialogDescription>Create a new program run by selecting classes from your library</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Program Name */}
          <div className="space-y-2">
            <Label htmlFor="program-name">Program Name</Label>
            <Input
              id="program-name"
              placeholder="e.g., Prime Solutions Winter 2025"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
            />
          </div>

          {/* Class Library Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="class-select">Select Class from Library</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger id="class-select">
                <SelectValue placeholder="Choose a class from your library" />
              </SelectTrigger>
              <SelectContent>
                {classLibrary.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.id}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-xs text-muted-foreground">{classItem.category}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Sessions */}
          <div className="space-y-2">
            <Label htmlFor="total-sessions">Total Sessions</Label>
            <Input
              id="total-sessions"
              type="number"
              placeholder="e.g., 12"
              value={totalSessions}
              onChange={(e) => setTotalSessions(e.target.value)}
              min="1"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Program Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the program goals and expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!programName || !selectedClass || !totalSessions}>
            Create Program
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
