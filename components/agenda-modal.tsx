"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface AgendaModalProps {
  item: any
  onClose: () => void
  userRole?: "facilitator" | "participant"
}

export function AgendaModal({ item, onClose, userRole = "facilitator" }: AgendaModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between border-b bg-background p-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <Badge variant="outline">{item.duration}</Badge>
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              {userRole === "participant" && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Live
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          {userRole === "facilitator" && (
            <button onClick={onClose} className="ml-4 rounded-lg p-2 hover:bg-accent" aria-label="Close modal">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {item.content ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {item.content.split("\n").map((line: string, index: number) => {
                const trimmedLine = line.trim()

                if (!trimmedLine) return <div key={index} className="h-4" />

                if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
                  const text = trimmedLine.slice(2, -2)
                  if (text.includes(":")) {
                    const [label, value] = text.split(":")
                    return (
                      <div key={index} className="mb-2 mt-4">
                        <strong className="text-primary">{label}:</strong>
                        {value && <span>{value}</span>}
                      </div>
                    )
                  }
                  return (
                    <h3 key={index} className="mb-2 mt-4 text-lg font-semibold text-primary">
                      {text}
                    </h3>
                  )
                }

                if (trimmedLine.match(/^\d+\./)) {
                  return (
                    <div key={index} className="ml-4 mb-1">
                      {trimmedLine}
                    </div>
                  )
                }

                if (trimmedLine.startsWith("-")) {
                  return (
                    <div key={index} className="ml-6 mb-1 flex gap-2">
                      <span>•</span>
                      <span>{trimmedLine.slice(1).trim()}</span>
                    </div>
                  )
                }

                return (
                  <p key={index} className="mb-2">
                    {trimmedLine}
                  </p>
                )
              })}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Fallback for Structured Data (keyPoints, video, etc) */}
              {item.keyPoints && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-primary">Key Points</h3>
                  <ul className="space-y-2 text-sm">
                    {item.keyPoints.map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.video && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">Video: {item.video.title}</div>
                  <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                    <iframe
                      src={item.video.url}
                      title={item.video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Done button for facilitators */}
        {userRole === "facilitator" && (
          <div className="sticky bottom-0 border-t bg-background p-6">
            <Button onClick={onClose} className="w-full" size="lg">
              Done - Close Section for All Participants
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
