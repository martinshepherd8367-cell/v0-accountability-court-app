"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

const programTypes = [
  { id: "prime-16", name: "Prime Solutions - 16 Sessions", sessions: 16 },
  { id: "coda-8", name: "CoDA Recovery - 8 Sessions", sessions: 8 },
  { id: "anger-10", name: "Anger Management - 10 Sessions", sessions: 10 },
  { id: "dbt-24", name: "DBT Skills - 24 Sessions", sessions: 24 },
]

interface AddProgramModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProgram?: (program: any) => void
}

export function AddProgramModal({ open, onOpenChange, onAddProgram }: AddProgramModalProps) {
  const [selectedType, setSelectedType] = useState<string>("")
  const [programName, setProgramName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (!open) {
      setProgramName("")
      setSelectedType("")
      setDescription("")
    }
  }, [open])

  const handleCreate = () => {
    console.log("[v0] handleCreate called - programName:", programName, "selectedType:", selectedType)

    if (!programName.trim() || !selectedType) {
      console.log("[v0] Missing required fields - programName:", programName, "selectedType:", selectedType)
      return
    }

    const selectedProgram = programTypes.find((p) => p.id === selectedType)
    if (selectedProgram && onAddProgram) {
      const newProgramData = {
        programName,
        selectedType,
        description,
        sessions: selectedProgram.sessions,
      }
      console.log("[v0] Creating program:", newProgramData)
      onAddProgram(newProgramData)
      onOpenChange(false)
    }
  }

  const isFormValid = programName.trim() !== "" && selectedType !== ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Add New Program Curriculum</DialogTitle>
              <DialogDescription>Create a new program run by selecting classes from your library</DialogDescription>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Program Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Program Name</label>
            <Input
              placeholder="e.g., Prime Solutions Winter 2025"
              value={programName}
              onChange={(e) => {
                console.log("[v0] Setting programName to:", e.target.value)
                setProgramName(e.target.value)
              }}
              className="border-teal-200 focus:border-teal-600"
            />
          </div>

          {/* Select Class from Library */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Class from Library</label>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                console.log("[v0] Setting selectedType to:", value)
                setSelectedType(value)
              }}
            >
              <SelectTrigger className="border-teal-200 focus:border-teal-600">
                <SelectValue placeholder="Choose a class from your library" />
              </SelectTrigger>
              <SelectContent>
                {programTypes.map((prog) => (
                  <SelectItem key={prog.id} value={prog.id}>
                    {prog.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Sessions (read-only) */}
          {selectedType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Total Sessions</label>
              <Input
                value={programTypes.find((p) => p.id === selectedType)?.sessions || ""}
                disabled
                className="bg-muted"
              />
            </div>
          )}

          {/* Program Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Program Description</label>
            <Textarea
              placeholder="Describe the program goals and expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-teal-200 focus:border-teal-600 min-h-32"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!isFormValid}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
            >
              Create Program
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
