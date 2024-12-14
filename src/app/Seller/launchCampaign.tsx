//@ts-nocheck
import React, { useState } from 'react'
import { Package2, DollarSign, Rocket, Link } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Mock data for products
const products = [
  { id: 1, name: 'Refreshing Cola Blast' },
  { id: 2, name: 'Crispy Potato Chips' },
  { id: 3, name: 'Creamy Yogurt Delight' },
  { id: 4, name: 'Instant Noodle Magic' },
  { id: 5, name: 'Fresh Fruit Juice' },
]

// Mock data for creatives
const creatives = [
  { id: 1, name: 'Creative 1', image: '/creative-1.jpg' },
  { id: 2, name: 'Creative 2', image: '/creative-2.jpg' },
  { id: 3, name: 'Creative 3', image: '/creative-3.jpg' },
  { id: 4, name: 'Creative 4', image: '/creative-4.jpg' },
]

export default function LaunchAd() {
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [selectedCreative, setSelectedCreative] = useState<string>('')
  const [uniqueUrl, setUniqueUrl] = useState('')
  const [metaBudget, setMetaBudget] = useState(1000)
  const [metaDuration, setMetaDuration] = useState('7')
  const [googleBudget, setGoogleBudget] = useState(1000)
  const [googleDuration, setGoogleDuration] = useState('7')

  const handleLaunchCampaign = () => {
    if (selectedProduct && selectedCreative && uniqueUrl) {
      console.log('Campaign launched with:', {
        product: selectedProduct,
        creative: selectedCreative,
        url: uniqueUrl,
        meta: { budget: metaBudget, duration: metaDuration },
        google: { budget: googleBudget, duration: googleDuration },
      })
      // Here you would typically send this data to your backend
    } else {
      console.error('Cannot launch campaign: missing required fields')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
     
      {/* Main content */}
        

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Card className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-600">Create New Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Choose Product */}
              <div className="space-y-2">
                <Label htmlFor="product" className="text-sm font-medium text-gray-700">
                  1. Choose Product
                </Label>
                <Select onValueChange={setSelectedProduct} value={selectedProduct}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Step 2: Choose Creative (only shown after product selection) */}
              {selectedProduct && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    2. Choose Creative
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {creatives.map((creative) => (
                      <div
                        key={creative.id}
                        className={`border rounded-lg p-2 cursor-pointer ${
                          selectedCreative === creative.id.toString()
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedCreative(creative.id.toString())}
                      >
                        <img
                          src={creative.image}
                          alt={creative.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm text-center">{creative.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Choose Budget & Duration for each platform */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">
                  3. Choose Budget & Duration for Each Platform
                </Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaBudget" className="text-sm text-gray-600">
                      Meta Budget: ₹{metaBudget}
                    </Label>
                    <Slider
                      id="metaBudget"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[metaBudget]}
                      onValueChange={(value) => setMetaBudget(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDuration" className="text-sm text-gray-600">
                      Meta Campaign Duration
                    </Label>
                    <Select onValueChange={setMetaDuration} value={metaDuration}>
                      <SelectTrigger id="metaDuration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleBudget" className="text-sm text-gray-600">
                      Google Budget: ₹{googleBudget}
                    </Label>
                    <Slider
                      id="googleBudget"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[googleBudget]}
                      onValueChange={(value) => setGoogleBudget(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleDuration" className="text-sm text-gray-600">
                      Google Campaign Duration
                    </Label>
                    <Select onValueChange={setGoogleDuration} value={googleDuration}>
                      <SelectTrigger id="googleDuration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Step 4: Paste Unique URL */}
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                  4. Paste Unique URL from Netsurf
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <Link className="h-4 w-4" />
                  </span>
                  <Input
                    id="url"
                    placeholder="https://example.com/your-unique-url"
                    value={uniqueUrl}
                    onChange={(e) => setUniqueUrl(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              {/* Step 5: Launch Campaign */}
              <Button
                onClick={handleLaunchCampaign}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!selectedProduct || !selectedCreative || !uniqueUrl}
              >
                Launch Campaign
              </Button>
            </CardContent>
          </Card>
        </main>
    </div>
  )
}