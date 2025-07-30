import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Star, Heart, Camera, Search, Filter, ArrowLeft, Upload } from 'lucide-react'
import { blink } from '../blink/client'
import { useToast } from '../hooks/use-toast'

interface ModelCommunityProps {
  onNavigate: (page: string) => void
  user: any
}

interface CommunityPost {
  id: string
  userId: string
  userName: string
  imageUrl: string
  title: string
  style: string
  likes: number
  rating: number
  createdAt: string
  isLiked?: boolean
}

const ModelCommunity: React.FC<ModelCommunityProps> = ({ onNavigate, user }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const { toast } = useToast()

  const styles = ['all', 'business', 'fashion', 'casual', 'creative']

  const loadCommunityPosts = async () => {
    try {
      const communityPosts = await blink.db.communityPosts.list({
        orderBy: { createdAt: 'desc' },
        limit: 50
      })
      
      setPosts(communityPosts.map(post => ({
        ...post,
        isLiked: false // TODO: Check if current user has liked this post
      })))
    } catch (error) {
      console.error('Failed to load community posts:', error)
      // Show sample data for demo
      setPosts([
        {
          id: '1',
          userId: 'user1',
          userName: 'Sarah Chen',
          imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
          title: 'Professional Business Headshot',
          style: 'business',
          likes: 24,
          rating: 4.8,
          createdAt: '2024-01-20',
          isLiked: false
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Marcus Johnson',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Fashion Editorial Style',
          style: 'fashion',
          likes: 31,
          rating: 4.9,
          createdAt: '2024-01-19',
          isLiked: false
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Elena Rodriguez',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Creative Artist Portrait',
          style: 'creative',
          likes: 18,
          rating: 4.7,
          createdAt: '2024-01-18',
          isLiked: false
        },
        {
          id: '4',
          userId: 'user4',
          userName: 'David Kim',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Casual Professional Look',
          style: 'casual',
          likes: 22,
          rating: 4.6,
          createdAt: '2024-01-17',
          isLiked: false
        },
        {
          id: '5',
          userId: 'user5',
          userName: 'Lisa Wang',
          imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
          title: 'High Fashion Model Shot',
          style: 'fashion',
          likes: 45,
          rating: 5.0,
          createdAt: '2024-01-16',
          isLiked: false
        },
        {
          id: '6',
          userId: 'user6',
          userName: 'Alex Thompson',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          title: 'Corporate Executive Style',
          style: 'business',
          likes: 19,
          rating: 4.5,
          createdAt: '2024-01-15',
          isLiked: false
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCommunityPosts()
  }, [])

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to like posts.",
        variant: "destructive"
      })
      return
    }

    try {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked 
            }
          : post
      ))

      // TODO: Save like to database
      // await blink.db.postLikes.create({
      //   userId: user.id,
      //   postId: postId,
      //   createdAt: new Date()
      // })
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  const handleRating = async (postId: string, rating: number) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to rate posts.",
        variant: "destructive"
      })
      return
    }

    try {
      // TODO: Save rating to database
      toast({
        title: "Rating Submitted",
        description: `You rated this post ${rating} stars.`
      })
    } catch (error) {
      console.error('Failed to rate post:', error)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStyle = selectedStyle === 'all' || post.style === selectedStyle
    return matchesSearch && matchesStyle
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community posts...</p>
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
              <span className="font-semibold">Model Community</span>
            </div>
            <div className="flex items-center space-x-2">
              {user && (
                <Button onClick={() => onNavigate('generator')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Share Your Shot
                </Button>
              )}
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Model Community Gallery</h1>
          <p className="text-xl text-indigo-100 mb-8">
            Discover amazing AI-generated model headshots from our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-4 py-2 rounded-md bg-white text-gray-900 border-0"
              >
                {styles.map(style => (
                  <option key={style} value={style}>
                    {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Community Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                    {post.style}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`absolute top-2 right-2 ${
                      post.isLiked ? 'text-red-500' : 'text-white'
                    } hover:text-red-500`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {post.userName}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{post.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{post.createdAt}</span>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mt-3">
                    <span className="text-sm text-gray-600 mr-2">Rate:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(post.id, star)}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Model Shots?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Generate professional AI headshots and share them with the community
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('generator')}
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            <Camera className="h-5 w-5 mr-2" />
            Create Your Headshots
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModelCommunity