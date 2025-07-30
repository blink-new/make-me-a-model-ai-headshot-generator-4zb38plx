import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Star, ArrowRight, Camera, Sparkles, Users, Shield } from 'lucide-react'
import { blink } from '../blink/client'
import BeforeAfterShowcase from '../components/BeforeAfterShowcase'

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
              Upload your photo to see yourself transformed into a professional model
            </p>
          </div>
          
          {/* Before/After Showcase Component */}
          <div className="mb-16">
            <BeforeAfterShowcase />
          </div>
          
          {/* Demo Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Try the Demo</h3>
              <p className="text-gray-600">Upload your photo to see an instant AI model transformation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                  onClick={handleSignUp}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Upload Your Photo</p>
                  <p className="text-sm text-gray-500">Drag & drop or click to select</p>
                </div>
                <p className="text-center text-sm text-gray-500">Your original photo</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center border-2 border-indigo-200">
                  <div className="w-16 h-16 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-indigo-700 font-medium">AI Generated Model Shot</p>
                  <p className="text-sm text-indigo-600">Professional transformation</p>
                </div>
                <p className="text-center text-sm text-gray-500">Your AI model headshot</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleSignUp}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                size="lg"
              >
                Start Your Transformation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Transformation Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: "Business Professional",
                description: "Transform casual photos into executive-level headshots perfect for LinkedIn and corporate profiles",
                icon: "💼",
                color: "from-blue-100 to-indigo-200"
              },
              {
                type: "Fashion Model",
                description: "Create high-fashion editorial looks with dramatic lighting and professional styling",
                icon: "✨",
                color: "from-pink-100 to-rose-200"
              },
              {
                type: "Creative Portrait",
                description: "Artistic and unique model shots perfect for portfolios and creative industries",
                icon: "🎨",
                color: "from-purple-100 to-violet-200"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full mx-auto mb-6 flex items-center justify-center text-3xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.type}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>✓ Professional lighting</p>
                  <p>✓ Perfect composition</p>
                  <p>✓ High-resolution output</p>
                </div>
              </Card>
            ))}
          </div>
          
          {/* How It Works */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Upload Photo", desc: "Upload your selfie or casual photo" },
                { step: "2", title: "Choose Style", desc: "Select from business, fashion, or creative styles" },
                { step: "3", title: "AI Processing", desc: "Our AI transforms you into a professional model" },
                { step: "4", title: "Download", desc: "Get your high-quality model headshots" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
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