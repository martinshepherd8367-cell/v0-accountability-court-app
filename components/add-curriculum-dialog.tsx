"use client"

import { useState, useEffect } from "react"
import { apiRequest } from "@/lib/api"
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
import { Plus, BookOpen, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ClassItem {
  id: string
  name: string
  category: string
}

export function AddCurriculumDialog() {
  const [open, setOpen] = useState(false)
  const [programName, setProgramName] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [totalSessions, setTotalSessions] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [classLibrary, setClassLibrary] = useState<ClassItem[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      const fetchLibrary = async () => {
        setLoadingLibrary(true)
        try {
          const data = await apiRequest<ClassItem[]>('/api/facilitator/class-library')
          setClassLibrary(data)
        } catch (e) {
          console.error("Failed to load class library", e)
          // Don't show fake data on error
          setClassLibrary([])
        } finally {
          setLoadingLibrary(false)
        }
      }
      fetchLibrary()
    }
  }, [open])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await apiRequest('/api/facilitator/programs', {
        method: 'POST',
        body: JSON.stringify({
          programName,
          classId: selectedClass,
          totalSessions: parseInt(totalSessions),
          description,
        }),
      })

      toast({
        title: "Program Created",
        description: "The new program has been successfully added.",
      })

      setOpen(false)
      // Reset form
      setProgramName("")
      setSelectedClass("")
      setTotalSessions("")
      setDescription("")
      // Trigger a refresh of the list if possible (or user manually refreshes)
      window.location.reload()
    } catch (e) {
      console.error("Failed to create program", e)
      toast({
        title: "Error",
        description: "Failed to create program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
                <SelectValue placeholder={loadingLibrary ? "Loading library..." : "Choose a class from your library"} />
              </SelectTrigger>
              <SelectContent>
                {classLibrary.length > 0 ? (
                  classLibrary.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{classItem.name}</div>
                          <div className="text-xs text-muted-foreground">{classItem.category}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    {loadingLibrary ? "Loading..." : "No classes found in library"}
                  </div>
                )}
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
          <Button onClick={handleSubmit} disabled={!programName || !selectedClass || !totalSessions || loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Program
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

