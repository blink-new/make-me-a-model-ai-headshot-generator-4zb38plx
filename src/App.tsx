import React, { useState, useEffect } from 'react'
import { blink } from './blink/client'
import LandingPage from './pages/LandingPage'
import GeneratorWizard from './pages/GeneratorWizard'
import ModelCommunity from './pages/ModelCommunity'
import Dashboard from './pages/Dashboard'
import { Toaster } from './components/ui/toaster'
import NetworkStatus from './components/NetworkStatus'

type Page = 'landing' | 'generator' | 'community' | 'dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'generator':
        return <GeneratorWizard onNavigate={setCurrentPage} user={user} />
      case 'community':
        return <ModelCommunity onNavigate={setCurrentPage} user={user} />
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} user={user} />
      default:
        return <LandingPage onNavigate={setCurrentPage} user={user} />
    }
  }

  return (
    <>
      {renderPage()}
      <Toaster />
      <NetworkStatus />
    </>
  )
}

export default App