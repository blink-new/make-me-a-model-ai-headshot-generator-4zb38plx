import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Star, ArrowRight, Camera, Sparkles, Users, Shield } from 'lucide-react'
import { blink } from '../blink/client'

interface LandingPageProps {
  onNavigate: (page: string) => void
  user: any
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, user }) => {
  const handleSignUp = () => {
    if (user) {
      onNavigate('generator')
    } else {
      blink.auth.login()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Make Me a Model</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#community" className="text-gray-600 hover:text-gray-900">Community</a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                    Dashboard
                  </Button>
                  <Button onClick={() => onNavigate('generator')}>
                    Generate Now
                  </Button>
                </div>
              ) : (
                <Button onClick={handleSignUp}>
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered Model Headshots
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform into a
              <span className="text-indigo-600 block">Professional Model</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your photos and let our AI create stunning professional model headshots 
              perfect for portfolios, casting calls, and social media. Get model-quality results in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleSignUp} className="bg-indigo-600 hover:bg-indigo-700">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('community')}>
                View Gallery
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✨ No subscription required • 🚀 Results in 2 minutes • 💎 Professional quality
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our AI model headshot generator
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transformation 1 - Woman Casual Selfie to Professional */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMGV2ZXJ5ZGF5JTIwcGVyc29uJTIwc2VsZmllfGVufDB8MXx8fDE3NTMzNjk4NDF8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Casual selfie with phone"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MHwxfHx8MTc1MzM2OTgzNnww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="After - Professional business model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Casual Selfie → Professional Model</p>
                </div>
              </CardContent>
            </Card>

            {/* Transformation 2 - Man Business to Executive */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Regular business photo"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1680540692052-79fde1108370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="After - Executive model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Business Casual → Executive Model</p>
                </div>
              </CardContent>
            </Card>

            {/* Transformation 3 - Woman Casual to Professional */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwd29tYW58ZW58MHwxfHx8MTc1MzM2OTY0NXww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Casual photo"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1701096374092-bb70915fdc5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwd29tYW58ZW58MHwxfHx8MTc1MzM2OTY0NXww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="After - Professional model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Casual Look → Professional Model</p>
                </div>
              </CardContent>
            </Card>

            {/* Transformation 4 - Man Casual to Fashion */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1696992443043-7d63e521b91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Casual photo"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1719835491911-99dd30f3f2dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="After - Fashion model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Casual Style → Fashion Model</p>
                </div>
              </CardContent>
            </Card>

            {/* Transformation 5 - Woman Business to Studio */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwd29tYW58ZW58MHwxfHx8MTc1MzM2OTY0NXww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Business photo"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw3fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwd29tYW58ZW58MHwxfHx8MTc1MzM2OTY0NXww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="After - Studio model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Business Portrait → Studio Model</p>
                </div>
              </CardContent>
            </Card>

            {/* Transformation 6 - Man Professional to Executive */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1679101893297-f1ea631fc1c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw3fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Before - Professional photo"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                      Original
                    </Badge>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwbWFufGVufDB8MXx8fDE3NTMzNjk2NDl8MA&ixlib=rb-4.1.0&q=80&w=400"
                      alt="After - Executive model headshot"
                      className="aspect-square object-cover w-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center font-medium">Professional → Executive Model</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={handleSignUp}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Transform Your Photos Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Model Headshots Made Easy
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create stunning model-quality headshots
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload & Generate</h3>
              <p className="text-gray-600">
                Simply upload your reference photos and let our AI create professional model headshots with perfect lighting and styling.
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Multiple Styles</h3>
              <p className="text-gray-600">
                Choose from business, fashion, casual, or creative styles. Each optimized for different modeling and professional needs.
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Model Community</h3>
              <p className="text-gray-600">
                Share your generated headshots with the community, get feedback, and discover inspiration from other models.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Models & Professionals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Fashion Model",
                content: "The AI headshots look incredibly professional. I've booked 3 modeling gigs using these photos!",
                rating: 5
              },
              {
                name: "Marcus Johnson",
                role: "Actor",
                content: "Perfect for casting submissions. The quality rivals expensive studio shoots at a fraction of the cost.",
                rating: 5
              },
              {
                name: "Elena Rodriguez",
                role: "Influencer",
                content: "Amazing results! My followers can't believe these are AI-generated. The styling options are fantastic.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Pay per generation or buy credits in bulk
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$9",
                credits: "10 credits",
                features: ["10 AI headshot generations", "Basic style options", "Standard resolution", "Community access"]
              },
              {
                name: "Professional",
                price: "$24",
                credits: "30 credits",
                features: ["30 AI headshot generations", "All style options", "High resolution", "Priority processing", "Advanced backgrounds"],
                popular: true
              },
              {
                name: "Studio",
                price: "$49",
                credits: "75 credits",
                features: ["75 AI headshot generations", "Premium styles", "Ultra-high resolution", "Instant processing", "Custom backgrounds", "Commercial license"]
              }
            ].map((plan, i) => (
              <Card key={i} className={`relative p-8 ${plan.popular ? 'border-indigo-500 border-2' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.credits}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <Shield className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={handleSignUp}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Become a Model?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users creating professional model headshots with AI
          </p>
          <Button size="lg" onClick={handleSignUp} className="bg-white text-indigo-600 hover:bg-gray-100">
            Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Camera className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">Make Me a Model</span>
              </div>
              <p className="text-gray-400">
                AI-powered professional model headshot generator for the modern creator.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Model Gallery</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Tips & Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Make Me a Model. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage