"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Upload, FileText } from "lucide-react"


const initialProgramTypes = [
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
  const [activeTab, setActiveTab] = useState("library")

  // Library State
  const [selectedType, setSelectedType] = useState<string>("")

  // Custom State
  const [programName, setProgramName] = useState("")
  const [description, setDescription] = useState("")
  const [bulkInput, setBulkInput] = useState("")
  const [parseError, setParseError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setProgramName("")
      setSelectedType("")
      setDescription("")
      setBulkInput("")
      setParseError(null)
      setActiveTab("library")
    }
  }, [open])

  const handleLibraryCreate = () => {
    if (!programName.trim() || !selectedType) return

    const selectedProgram = initialProgramTypes.find((p) => p.id === selectedType)
    if (selectedProgram && onAddProgram) {
      onAddProgram({
        programName,
        selectedType,
        description,
        sessions: selectedProgram.sessions,
      })
      onOpenChange(false)
    }
  }

  const handleCustomCreate = () => {
    if (!programName.trim()) return

    try {
      let sessionsCount = 0
      let parsedSessions = []

      // Try to parse as JSON first
      if (bulkInput.trim().startsWith("[")) {
        parsedSessions = JSON.parse(bulkInput)
        sessionsCount = parsedSessions.length
      } else {
        // Treat as line-separated list of session titles
        const lines = bulkInput.split("\n").filter(line => line.trim() !== "")
        sessionsCount = lines.length || 1 // Default to 1 if empty/manual
        parsedSessions = lines.map((title, i) => ({ title, number: i + 1 }))
      }

      const newProgramData = {
        programName,
        selectedType: "custom",
        description,
        sessions: sessionsCount,
        customSessions: parsedSessions
      }

      console.log("[v0] Creating custom program:", newProgramData)
      if (onAddProgram) {
        onAddProgram(newProgramData)
      }
      onOpenChange(false)

    } catch (e) {
      setParseError("Invalid format. Please ensure valid JSON or plain text.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Add New Program</DialogTitle>
              <DialogDescription>Add a program from the library or upload a custom curriculum</DialogDescription>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Library Selection</TabsTrigger>
            <TabsTrigger value="custom">Custom / Bulk Upload</TabsTrigger>
          </TabsList>

          {/* LIBRARY TAB */}
          <TabsContent value="library" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Program Name</label>
                <Input
                  placeholder="e.g., Prime Solutions Winter 2025"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Class from Library</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {initialProgramTypes.map((prog) => (
                      <SelectItem key={prog.id} value={prog.id}>
                        {prog.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedType && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Sessions</label>
                  <Input value={initialProgramTypes.find((p) => p.id === selectedType)?.sessions || ""} disabled className="bg-muted" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleLibraryCreate} disabled={!programName || !selectedType}>Add from Library</Button>
            </div>
          </TabsContent>

          {/* CUSTOM TAB */}
          <TabsContent value="custom" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Program Name</label>
                <Input
                  placeholder="e.g., Advanced CBT Intensive"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Program goals..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Session List / Bulk Import</span>
                  <span className="text-xs text-muted-foreground font-normal">One session title per line OR paste JSON</span>
                </label>
                <Textarea
                  placeholder={`Session 1: Introduction\nSession 2: Coping Skills\nSession 3: Triggers...`}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  className="font-mono text-sm min-h-[150px]"
                />
                {parseError && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {parseError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleCustomCreate} disabled={!programName}>
                <Upload className="mr-2 h-4 w-4" />
                Create Custom Program
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
