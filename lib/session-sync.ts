"use client"

type SessionSyncListener = (data: SessionSyncData) => void

interface SessionSyncData {
  sessionId: string
  activeSection: string | null
  expandedSections: string[]
  timestamp: number
}

class SessionSyncManager {
  private listeners: Set<SessionSyncListener> = new Set()
  private currentState: SessionSyncData = {
    sessionId: "",
    activeSection: null,
    expandedSections: [],
    timestamp: Date.now(),
  }

  subscribe(listener: SessionSyncListener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  broadcast(data: Partial<SessionSyncData>) {
    this.currentState = {
      ...this.currentState,
      ...data,
      timestamp: Date.now(),
    }

    console.log("[v0] Broadcasting section change:", this.currentState)

    this.listeners.forEach((listener) => {
      listener(this.currentState)
    })
  }

  getCurrentState() {
    return this.currentState
  }
}

export const sessionSync = new SessionSyncManager()
