import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Accountability Court Programs</p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Program
        </Button>
      </div>
    </header>
  )
}
