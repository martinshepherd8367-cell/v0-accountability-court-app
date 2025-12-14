"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Camera, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function QRScanner() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      setStream(mediaStream)
      setHasPermission(true)
      setIsScanning(true)
    } catch (err) {
      console.error("Camera access denied:", err)
      setHasPermission(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const handleSimulateScan = () => {
    // Simulate successful QR code scan
    setScanResult({
      success: true,
      message: "Successfully checked into Session 5: Emotional Regulation",
    })

    stopCamera()

    // Navigate to session after delay
    setTimeout(() => {
      router.push("/participant/session/5")
    }, 2000)
  }

  const handleClose = () => {
    stopCamera()
    router.back()
  }

  if (hasPermission === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Camera Access Required
            </CardTitle>
            <CardDescription>Please allow camera access to scan QR codes for class check-in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={startCamera} className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Enable Camera
            </Button>
            <Button variant="outline" onClick={handleClose} className="w-full bg-transparent">
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Scan QR Code</h1>
            <p className="text-sm text-muted-foreground">Position the QR code within the frame</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {/* Scanning Frame */}
        {isScanning && !scanResult && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg" />

              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-1 bg-primary animate-scan-line" />
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Result */}
        {scanResult && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {scanResult.success ? (
                    <>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Check-In Successful!</h3>
                        <p className="text-muted-foreground">{scanResult.message}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Check-In Failed</h3>
                        <p className="text-muted-foreground">{scanResult.message}</p>
                      </div>
                      <Button onClick={() => setScanResult(null)}>Try Again</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Instructions */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
        <div className="container mx-auto px-4 py-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Align the QR code displayed in your classroom within the frame above
          </p>

          {/* Demo button for testing */}
          <Button onClick={handleSimulateScan} variant="outline" className="w-full max-w-xs bg-transparent">
            Simulate Scan (Demo)
          </Button>
        </div>
      </div>
    </div>
  )
}
