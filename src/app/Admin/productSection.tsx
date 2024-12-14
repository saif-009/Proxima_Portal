//@ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Label } from "../../../components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { AlertCircle, Upload, RefreshCw, Plus, Trash2, Package2, LayoutDashboard, ShoppingBag, Megaphone, Users, Settings, Bell, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'

type AdPlatform = 'meta' | 'google'
type AdFormat = 'image' | 'video'

type AdSize = {
  name: string;
  width: number;
  height: number;
}

const adSizes: AdSize[] = [
  { name: 'Square', width: 1080, height: 1080 },
  { name: 'Portrait', width: 1080, height: 1350 },
  { name: 'Landscape', width: 1200, height: 628 },
  { name: 'Story', width: 1080, height: 1920 },
]

const ctaOptions = ['Shop Now', 'Learn More', 'Get Offer']

const VerticalNavbar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(['Products', 'CampaignSettings', 'PartnerManagement'])

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]
    )
  }

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* <div className="p-4 bg-gray-800">
        <div className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-blue-500" />
          <span className="text-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">Netsurf</span>
        </div>
      </div> */}
      {/* <nav className="flex-1 overflow-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <Link href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
          <LayoutDashboard className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Accordion type="multiple" value={openMenus} onValueChange={setOpenMenus}>
          <AccordionItem value="Products">
            <AccordionTrigger className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-3" />
                Products
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-6">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Add a product</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Product List</Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="CampaignSettings">
            <AccordionTrigger className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
              <div className="flex items-center">
                <Megaphone className="h-5 w-5 mr-3" />
                Campaign Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-6">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Meta</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Google</Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="PartnerManagement">
            <AccordionTrigger className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                Partner Management
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-6">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Create Partner</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Bulk Create</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">Manage Partner</Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
      </nav> */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-8 w-8 rounded-full bg-blue-500 p-1 text-white" />
            <span className="ml-2 text-sm font-medium text-gray-300">John Doe</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400 hover:bg-gray-700">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AddProduct() {
  const [productUrl, setProductUrl] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState(['', ''])
  const [metaAdContent, setMetaAdContent] = useState({
    primaryText: Array(5).fill(''),
    description: Array(3).fill(''),
    headlines: Array(3).fill(''),
    cta: 'Shop Now'
  })
  const [googleAdContent, setGoogleAdContent] = useState({
    headlines: Array(15).fill(''),
    descriptions: Array(5).fill(''),
    sitelinks: Array(4).fill({ linkText: '', description1: '', description2: '' }),
    callouts: Array(4).fill('')
  })
  const [adCreatives, setAdCreatives] = useState<{ [key: string]: File[] }>({})
  const [isAIAssistEnabled, setIsAIAssistEnabled] = useState(true)

  const handleProductUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to process URL and generate descriptions and ad copies
    console.log('Processing URL:', productUrl)
    // Simulating API response
    setProductName('Sample Product Name')
    setProductDescription(['This is an amazing product that solves...', 'It offers unparalleled quality and value...'])
    setMetaAdContent({
      primaryText: Array(5).fill('Experience the difference with our revolutionary product...'),
      description: Array(3).fill('Discover the benefits of our innovative solution...'),
      headlines: Array(3).fill('Transform Your Life with Our Product'),
      cta: 'Shop Now'
    })
    setGoogleAdContent({
      headlines: Array(15).fill('Revolutionize Your Routine | Unbeatable Quality | Limited Time Offer'),
      descriptions: Array(5).fill('Experience the difference with our game-changing product. Order now and transform your daily life!'),
      sitelinks: Array(4).fill({ linkText: 'Shop Now', description1: 'Browse our collection', description2: 'Find the perfect fit' }),
      callouts: Array(4).fill('Free Shipping | 24/7 Customer Support | 30-Day Returns | Best-in-Class Quality')
    })
  }

  const handleAdCreativeUpload = (e: React.ChangeEvent<HTMLInputElement>, size: AdSize, format: AdFormat) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      const key = `${size.name}-${format}`
      setAdCreatives(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), ...newFiles]
      }))
    }
  }

  const handleRemoveCreative = (size: AdSize, format: AdFormat, index: number) => {
    const key = `${size.name}-${format}`
    setAdCreatives(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }))
  }

  const handleAIAssist = () => {
    // TODO: Implement AI assistance for content generation
    console.log('AI Assist triggered')
  }

  const renderAdContentFields = (platform: AdPlatform) => {
    const content = platform === 'meta' ? metaAdContent : googleAdContent
    return (
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(content).map(([key, values]) => (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger className="text-gray-200 hover:bg-gray-800">{key.charAt(0).toUpperCase() + key.slice(1)} {Array.isArray(values) ? `(${values.length})` : ''}</AccordionTrigger>
            <AccordionContent>
              {key === 'sitelinks' && platform === 'google' ? (
                (values as any).map((sitelink: any, index: number) => (
                  <div key={index} className="space-y-2 mb-4">
                    <Input
                      value={sitelink.linkText}
                      onChange={(e) => {
                        const newSitelinks = [...googleAdContent.sitelinks]
                        newSitelinks[index].linkText = e.target.value
                        setGoogleAdContent({ ...googleAdContent, sitelinks: newSitelinks })
                      }}
                      placeholder={`Sitelink ${index + 1} text`}
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Input
                      value={sitelink.description1}
                      onChange={(e) => {
                        const newSitelinks = [...googleAdContent.sitelinks]
                        newSitelinks[index].description1 = e.target.value
                        setGoogleAdContent({ ...googleAdContent, sitelinks: newSitelinks })
                      }}
                      placeholder={`Sitelink ${index + 1} description 1`}
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Input
                      value={sitelink.description2}
                      onChange={(e) => {
                        const newSitelinks = [...googleAdContent.sitelinks]
                        newSitelinks[index].description2 = e.target.value
                        setGoogleAdContent({ ...googleAdContent, sitelinks: newSitelinks })
                      }}
                      placeholder={`Sitelink ${index + 1} description 2`}
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))
              ) : key === 'cta' && platform === 'meta' ? (
                <Select
                  value={metaAdContent.cta}
                  onValueChange={(value) => setMetaAdContent({ ...metaAdContent, cta: value })}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select CTA" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    {ctaOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                (values as string[]).map((value, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={value}
                      onChange={(e) => {
                        const newValues = [...values]
                        newValues[index] = e.target.value
                        if (platform === 'meta') {
                          setMetaAdContent({ ...metaAdContent, [key]: newValues })
                        } else {
                          setGoogleAdContent({ ...googleAdContent, [key]: newValues })
                        }
                      }}
                      placeholder={`Enter ${key}   ${index + 1}`}
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button variant="outline" size="icon" onClick={handleAIAssist} className="text-blue-400 border-blue-400 hover:bg-gray-700">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }

  const renderCreativeUploadSection = () => {
    return (
      <div className="space-y-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-200">Ad Creatives</h3>
        {adSizes.map((size, sizeIndex) => (
          <Card key={sizeIndex} className="border-blue-500 border-2 bg-gray-800">
            <CardHeader className="bg-gray-700">
              <CardTitle className="text-blue-400">{size.name} ({size.width}x{size.height})</CardTitle>
              <CardDescription className="text-gray-300">Upload image or video creatives for this size</CardDescription>
            </CardHeader>
            <CardContent>
              {(['image', 'video'] as AdFormat[]).map((format, formatIndex) => (
                <div key={formatIndex} className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-gray-300">{format.charAt(0).toUpperCase() + format.slice(1)}</h4>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      onChange={(e) => handleAdCreativeUpload(e, size, format)}
                      accept={format === 'image' ? "image/*" : "video/*"}
                      multiple
                      className="bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-gray-700">
                      <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                  </div>
                  {adCreatives[`${size.name}-${format}`]?.map((file, fileIndex) => (
                    <div key={fileIndex} className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCreative(size, format, fileIndex)}
                        className="text-red-400 hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* <VerticalNavbar /> */}
      <div className="flex-1 overflow-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="p-6">
          <Card className="w-full bg-gray-800 shadow-lg border-gray-700">
            <CardHeader className="bg-gray-700 border-b border-gray-600">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">Add Product</CardTitle>
              <CardDescription className="text-gray-300">Add a new product and generate ad content</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="product-setup">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-700">
                  <TabsTrigger value="product-setup" className="text-gray-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Product Setup</TabsTrigger>
                  <TabsTrigger value="ad-content" className="text-gray-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Ad Content</TabsTrigger>
                </TabsList>
                <TabsContent value="product-setup">
                  <form onSubmit={handleProductUrlSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-url" className="text-gray-300">Product URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="product-url"
                          placeholder="Enter product URL"
                          value={productUrl}
                          onChange={(e) => setProductUrl(e.target.value)}
                          required
                          className="bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Fetch</Button>
                      </div>
                    </div>
                  </form>
                  {productName && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name" className="text-gray-300">Product Name</Label>
                        <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} className="bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-description" className="text-gray-300">Product Description</Label>
                        {productDescription.map((desc, index) => (
                          <Textarea
                            key={index}
                            value={desc}
                            onChange={(e) => {
                              const newDesc = [...productDescription]
                              newDesc[index] = e.target.value
                              setProductDescription(newDesc)
                            }}
                            placeholder={`Product description line ${index + 1}`}
                            className="bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="ad-content">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai-assist" className="text-gray-300">AI Assist</Label>
                      <Switch
                        id="ai-assist"
                        checked={isAIAssistEnabled}
                        onCheckedChange={setIsAIAssistEnabled}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                    <Tabs defaultValue="meta">
                      <TabsList className="mb-4 bg-gray-700">
                        <TabsTrigger value="meta" className="text-gray-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Meta</TabsTrigger>
                        <TabsTrigger value="google" className="text-gray-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Google</TabsTrigger>
                      </TabsList>
                      <TabsContent value="meta">
                        {renderAdContentFields('meta')}
                        {renderCreativeUploadSection()}
                      </TabsContent>
                      <TabsContent value="google">
                        {renderAdContentFields('google')}
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}