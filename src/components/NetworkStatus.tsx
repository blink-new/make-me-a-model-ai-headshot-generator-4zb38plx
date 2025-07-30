import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react'

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowAlert(true)
      // Hide success message after 3 seconds
      setTimeout(() => setShowAlert(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowAlert(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Show alert initially if offline
    if (!navigator.onLine) {
      setShowAlert(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showAlert) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Alert className={`${
        isOnline 
          ? 'border-green-200 bg-green-50 text-green-800' 
          : 'border-red-200 bg-red-50 text-red-800'
      }`}>
        {isOnline ? (
          <Wifi className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <AlertDescription>
          {isOnline 
            ? 'Connection restored! You\'re back online.' 
            : 'No internet connection. Please check your network and try again.'
          }
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default NetworkStatus