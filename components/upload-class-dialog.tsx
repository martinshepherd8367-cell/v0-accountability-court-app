"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UploadClassDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [className, setClassName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("60") // Default 60 mins
    const { toast } = useToast()

    const categories = [
        "Prime Solutions",
        "CoDA",
        "Anger Management",
        "Substance Abuse",
        "General Life Skills",
        "Other"
    ]

    const handleSubmit = async () => {
        if (!className || !category) return

        setLoading(true)
        try {
            await apiRequest('/api/facilitator/class-library', {
                method: 'POST',
                body: JSON.stringify({
                    name: className,
                    category,
                    description,
                    defaultDuration: parseInt(duration)
                }),
            })

            toast({
                title: "Class Uploaded",
                description: "New class successfully added to library.",
            })

            setOpen(false)
            setClassName("")
            setCategory("")
            setDescription("")
            setDuration("60")
            // Optional: trigger refresh
            window.location.reload()
        } catch (e) {
            console.error("Failed to upload class", e)
            toast({
                title: "Error",
                description: "Failed to upload class. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="gap-2">
                    <UploadCloud className="h-4 w-4" />
                    Upload new Class to Library
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload New Class</DialogTitle>
                    <DialogDescription>Add a new class template to your organization's library.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="class-name">Class Name</Label>
                        <Input
                            id="class-name"
                            placeholder="e.g. Cognitive Restructuring 101"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">Default Duration (minutes)</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief summary of class content..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading || !className || !category}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Upload Class
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
