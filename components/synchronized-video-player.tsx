"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface SynchronizedVideoPlayerProps {
  userRole: "facilitator" | "participant"
  sessionStatus: "active" | "ended"
}

export function SynchronizedVideoPlayer({ userRole, sessionStatus }: SynchronizedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videoStarted, setVideoStarted] = useState(false)

  const canControl = userRole === "facilitator" || (sessionStatus === "ended" && videoStarted)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setVideoStarted(true)
      // In a real app, this would broadcast to all participants via websocket
      console.log("[v0] Broadcasting video start to all participants")
    }
  }

  const togglePlayPause = () => {
    if (!canControl) return

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleRestart = () => {
    if (!canControl) return

    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Session Video</CardTitle>
            <p className="text-sm text-muted-foreground">
              {userRole === "facilitator"
                ? "Control video playback for all participants"
                : sessionStatus === "ended"
                  ? "Watch the session recording"
                  : "Video will be controlled by facilitator"}
            </p>
          </div>
          {sessionStatus === "active" && (
            <Badge variant={userRole === "facilitator" ? "default" : "secondary"}>
              {userRole === "facilitator" ? "Facilitator" : "Participant"}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Player */}
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src="/educational-video-content.png"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>

          {/* Click overlay for non-controllers */}
          {!canControl && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-2 opacity-70" />
                <p className="text-sm font-medium">
                  {sessionStatus === "active" ? "Waiting for facilitator to start video..." : "Video not yet started"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Start Video Button (Facilitator Only) */}
              {userRole === "facilitator" && !videoStarted && (
                <Button onClick={handleStartVideo} size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  Start Video for All
                </Button>
              )}

              {/* Play/Pause Controls */}
              {videoStarted && (
                <>
                  <Button onClick={togglePlayPause} disabled={!canControl} variant="outline" size="icon">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <Button onClick={handleRestart} disabled={!canControl} variant="outline" size="icon">
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <Button onClick={toggleMute} variant="outline" size="icon">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
            </div>

            {videoStarted && (
              <Button onClick={toggleFullscreen} variant="outline" size="icon">
                <Maximize className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Status Message */}
          {sessionStatus === "active" && userRole === "participant" && !videoStarted && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
              The facilitator will start the video when the class is ready.
            </div>
          )}

          {sessionStatus === "ended" && canControl && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
              Session has ended. You can now control the video playback.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
