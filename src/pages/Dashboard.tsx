import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Camera, Download, Share2, Trash2, ArrowLeft, CreditCard, Sparkles, Users } from 'lucide-react'
import { blink, blinkWithRetry, handleApiError } from '../blink/client'
import { useToast } from '../hooks/use-toast'

interface DashboardProps {
  onNavigate: (page: string) => void
  user: any
}

interface Generation {
  id: string
  style: string
  background: string
  generatedImages: string[]
  createdAt: string
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, user }) => {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) return

    const loadUserData = async () => {
      try {
        // Load user's generations
        const userGenerations = await blinkWithRetry.db.generations.list({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          limit: 50
        })
        
        setGenerations(userGenerations)
        
        // Load user credits (mock data for now)
        setCredits(25)
      } catch (error) {
        console.error('Failed to load user data:', error)
        // Show sample data for demo
        setGenerations([
          {
            id: '1',
            style: 'business',
            background: 'studio',
            generatedImages: [
              'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
            ],
            createdAt: '2024-01-20'
          },
          {
            id: '2',
            style: 'fashion',
            background: 'gradient',
            generatedImages: [
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
            ],
            createdAt: '2024-01-19'
          }
        ])
        setCredits(25)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user])

  const handleDeleteGeneration = async (generationId: string) => {
    try {
      await blink.db.generations.delete(generationId)
      setGenerations(prev => prev.filter(gen => gen.id !== generationId))
      toast({
        title: "Deleted",
        description: "Generation deleted successfully."
      })
    } catch (error) {
      console.error('Failed to delete generation:', error)
      toast({
        title: "Error",
        description: "Failed to delete generation.",
        variant: "destructive"
      })
    }
  }

  const handleBuyCredits = () => {
    // TODO: Implement Stripe integration
    toast({
      title: "Coming Soon",
      description: "Credit purchase will be available soon!"
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
            <Button onClick={() => blink.auth.login()}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold">Dashboard</span>
            </div>
            <Button onClick={() => blink.auth.logout()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* User Info & Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.email}!</h1>
              <p className="text-indigo-100">Manage your AI-generated model headshots</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-semibold">Credits</span>
                </div>
                <div className="text-2xl font-bold">{credits}</div>
                <Button 
                  size="sm" 
                  onClick={handleBuyCredits}
                  className="mt-2 bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Buy More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="generations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generations">My Generations</TabsTrigger>
            <TabsTrigger value="community">Community Posts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="generations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Generated Headshots</h2>
              <Button onClick={() => onNavigate('generator')}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate New
              </Button>
            </div>

            {generations.length === 0 ? (
              <Card className="p-12 text-center">
                <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No generations yet</h3>
                <p className="text-gray-600 mb-6">Create your first AI model headshot to get started</p>
                <Button onClick={() => onNavigate('generator')}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Generating
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {generations.map((generation) => (
                  <Card key={generation.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {generation.style.charAt(0).toUpperCase() + generation.style.slice(1)} Style
                        </CardTitle>
                        <Badge variant="outline">
                          {generation.background}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Generated on {new Date(generation.createdAt).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {generation.generatedImages.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Generated ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button size="sm" asChild>
                                <a href={imageUrl} download={`headshot-${index + 1}.jpg`}>
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download All
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteGeneration(generation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Community Posts</h2>
              <Button onClick={() => onNavigate('community')}>
                <Users className="h-4 w-4 mr-2" />
                View Community
              </Button>
            </div>

            <Card className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No community posts yet</h3>
              <p className="text-gray-600 mb-6">Share your generated headshots with the community</p>
              <Button onClick={() => onNavigate('community')}>
                <Users className="h-4 w-4 mr-2" />
                Explore Community
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-gray-600">January 2024</p>
                  </div>
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing & Credits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Available Credits</label>
                    <p className="text-2xl font-bold text-indigo-600">{credits}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan</label>
                    <p className="text-gray-600">Pay-per-use</p>
                  </div>
                  <Button onClick={handleBuyCredits}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Buy Credits
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard