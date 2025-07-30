import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Upload, Camera, Palette, Sparkles, ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { blink, blinkWithRetry, handleApiError } from '../blink/client'
import { useToast } from '../hooks/use-toast'

interface GeneratorWizardProps {
  onNavigate: (page: string) => void
  user: any
}

type Step = 'upload' | 'style' | 'generate' | 'results'

const GeneratorWizard: React.FC<GeneratorWizardProps> = ({ onNavigate, user }) => {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedBackground, setSelectedBackground] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const { toast } = useToast()

  const steps = [
    { id: 'upload', title: 'Upload Photos', icon: Upload },
    { id: 'style', title: 'Choose Style', icon: Palette },
    { id: 'generate', title: 'Generate', icon: Sparkles },
    { id: 'results', title: 'Results', icon: Download }
  ]

  const styles = [
    { id: 'business', name: 'Business Professional', description: 'Corporate headshots with professional lighting' },
    { id: 'fashion', name: 'Fashion Model', description: 'High-fashion editorial style with dramatic lighting' },
    { id: 'casual', name: 'Casual Portrait', description: 'Natural, approachable headshots' },
    { id: 'creative', name: 'Creative Artist', description: 'Artistic and expressive portraits' }
  ]

  const backgrounds = [
    { id: 'studio', name: 'Studio White', preview: 'bg-white' },
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    { id: 'dark', name: 'Dark Professional', preview: 'bg-gray-900' },
    { id: 'natural', name: 'Natural Blur', preview: 'bg-green-200' }
  ]

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep)
  const progress = ((getCurrentStepIndex() + 1) / steps.length) * 100

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (!selectedStyle || !selectedBackground || uploadedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please upload photos and select style and background.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    setCurrentStep('generate')

    try {
      // Upload reference images to storage first with retry logic
      const imageUrls = []
      for (const file of uploadedFiles) {
        const { publicUrl } = await blinkWithRetry.storage.upload(file, `references/${Date.now()}-${file.name}`)
        imageUrls.push(publicUrl)
      }

      // Generate AI headshots using the uploaded images with retry logic
      const { data } = await blinkWithRetry.ai.generateImage({
        prompt: `Professional ${selectedStyle} model headshot with ${selectedBackground} background, studio lighting, high quality, professional photography`,
        size: '1024x1024',
        quality: 'high',
        n: 4
      })

      const generatedUrls = data.map(img => img.url)
      setGeneratedImages(generatedUrls)

      // Save generation data to database with retry logic
      await blinkWithRetry.db.generations.create({
        userId: user.id,
        style: selectedStyle,
        background: selectedBackground,
        referenceImages: imageUrls,
        generatedImages: generatedUrls,
        createdAt: new Date()
      })

      setCurrentStep('results')
      toast({
        title: "Success!",
        description: "Your model headshots have been generated successfully."
      })
    } catch (error) {
      console.error('Generation failed:', error)
      const errorMessage = handleApiError(error)
      toast({
        title: "Network Error",
        description: errorMessage,
        variant: "destructive"
      })
      // Reset to style step so user can try again
      setCurrentStep('style')
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Upload Your Reference Photos</h2>
              <p className="text-gray-600">Upload 1-5 clear photos of yourself for the best results</p>
            </div>
            
            <Card className="border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
                      Click to upload
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG up to 10MB each</p>
                </div>
              </CardContent>
            </Card>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'style':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Style</h2>
              <p className="text-gray-600">Select the modeling style that fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {styles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all ${
                    selectedStyle === style.id ? 'border-indigo-500 bg-indigo-50' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{style.name}</h3>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Background Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {backgrounds.map((bg) => (
                  <Card
                    key={bg.id}
                    className={`cursor-pointer transition-all ${
                      selectedBackground === bg.id ? 'border-indigo-500' : 'hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedBackground(bg.id)}
                  >
                    <CardContent className="p-4">
                      <div className={`w-full h-16 rounded mb-2 ${bg.preview}`}></div>
                      <p className="text-sm font-medium text-center">{bg.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 'generate':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-12 w-12 text-indigo-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold">Generating Your Model Headshots</h2>
            <p className="text-gray-600">Our AI is creating professional model headshots from your photos...</p>
            <div className="w-full max-w-md mx-auto">
              <div className="animate-pulse bg-indigo-200 h-2 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500">This usually takes 1-2 minutes</p>
          </div>
        )

      case 'results':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Model Headshots Are Ready!</h2>
              <p className="text-gray-600">Download your professional AI-generated headshots</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((imageUrl, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={imageUrl}
                      alt={`Generated headshot ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <Button className="w-full" asChild>
                        <a href={imageUrl} download={`headshot-${index + 1}.jpg`}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-4">
              <Button onClick={() => onNavigate('community')} variant="outline">
                Share in Community
              </Button>
              <Button onClick={() => {
                setCurrentStep('upload')
                setUploadedFiles([])
                setSelectedStyle('')
                setSelectedBackground('')
                setGeneratedImages([])
              }}>
                Generate More
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold">Make Me a Model</span>
            </div>
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = getCurrentStepIndex() > index
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive ? 'bg-indigo-600 text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep !== 'generate' && currentStep !== 'results' && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = getCurrentStepIndex()
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id as Step)
                }
              }}
              disabled={getCurrentStepIndex() === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={() => {
                if (currentStep === 'upload' && uploadedFiles.length === 0) {
                  toast({
                    title: "No Photos",
                    description: "Please upload at least one photo to continue.",
                    variant: "destructive"
                  })
                  return
                }
                
                if (currentStep === 'style') {
                  handleGenerate()
                } else {
                  const currentIndex = getCurrentStepIndex()
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1].id as Step)
                  }
                }
              }}
              disabled={
                (currentStep === 'upload' && uploadedFiles.length === 0) ||
                (currentStep === 'style' && (!selectedStyle || !selectedBackground))
              }
            >
              {currentStep === 'style' ? 'Generate Headshots' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneratorWizard