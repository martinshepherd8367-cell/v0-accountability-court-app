"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddProgramModal } from "@/components/add-program-modal"

interface ProgramLibraryDropdownProps {
  onAddProgram?: (program: any) => void
}

export function ProgramLibraryDropdown({ onAddProgram }: ProgramLibraryDropdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Add Program
      </Button>

      <AddProgramModal open={isModalOpen} onOpenChange={setIsModalOpen} onAddProgram={onAddProgram} />
    </>
  )
}
