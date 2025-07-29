"use client"
import { useState, useEffect } from "react"

export default function NewsletterTestButton() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const clearPopupSeen = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("newsletterPopupSeen")
      alert("Newsletter popup status cleared. Refresh the page to see it again in 3 seconds.")
    }
  }

  const showPopupInfo = () => {
    if (typeof window !== 'undefined') {
      const hasSeenPopup = localStorage.getItem("newsletterPopupSeen")
      alert(`Newsletter popup seen: ${hasSeenPopup ? 'Yes' : 'No'}`)
    }
  }

  // Solo mostrar en desarrollo y después de montar
  if (!isMounted || process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      <button
        onClick={clearPopupSeen}
        className="bg-red-500 text-white px-3 py-2 rounded text-xs hover:bg-red-600"
      >
        Reset Newsletter Popup
      </button>
      <button
        onClick={showPopupInfo}
        className="bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600"
      >
        Check Popup Status
      </button>
      <div className="text-xs text-white bg-black/80 p-2 rounded">
        Press Ctrl+Shift+N to force show popup
      </div>
    </div>
  )
}
