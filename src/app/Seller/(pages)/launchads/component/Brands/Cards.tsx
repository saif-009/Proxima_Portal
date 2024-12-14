"use client"

import { useState } from "react"
import { Card, CardContent } from "../../../../../../../components/ui/card"
import { Checkbox } from "../../../../../../../components/ui/checkbox"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CheckboxItem {
  label: string
  subItems?: CheckboxItem[]
}

interface BrandInfo {
  name: string
  description: string
  checkboxes: CheckboxItem[]
  bgColor: string
}

const brands: BrandInfo[] = [
  {
    name: "Naturamore",
    description: "Premium lifestyle brand focusing on minimalist design and sustainable materials.",
    checkboxes: [
      {
        label: "Sustainable",
        subItems: [
          { label: "Eco-friendly Materials" },
          { label: "Ethical Production" },
          { label: "Carbon Neutral" }
        ]
      },
      {
        label: "Herbs & More",
        subItems: [
          { label: "Clean Design" },
          { label: "Versatile Pieces" },
          { label: "Timeless Aesthetics" }
        ]
      },
      { label: "Premium Quality" },
      { label: "Eco-friendly" }
    ],
    bgColor: "from-red-500 via-red-400 to-orange-300"
  },
  {
    name: "SPHERE",
    description: "Modern fashion house with emphasis on circular design and timeless aesthetics.",
    checkboxes: [
      {
        label: "Contemporary",
        subItems: [
          { label: "Trendsetting Designs" },
          { label: "Modern Materials" },
          { label: "Cutting-edge Technology" }
        ]
      },
      {
        label: "Innovative",
        subItems: [
          { label: "Unique Fabrications" },
          { label: "Smart Clothing" },
          { label: "3D-printed Accessories" }
        ]
      },
      { label: "Timeless" },
      { label: "Artistic" }
    ],
    bgColor: "from-blue-500 via-blue-400 to-teal-300"
  },
  {
    name: "PRISM",
    description: "Avant-garde design studio creating unique, perspective-shifting experiences.",
    checkboxes: [
      {
        label: "Creative",
        subItems: [
          { label: "Unconventional Designs" },
          { label: "Mixed Media" },
          { label: "Collaborative Art Pieces" }
        ]
      },
      {
        label: "Bold",
        subItems: [
          { label: "Vibrant Colors" },
          { label: "Statement Pieces" },
          { label: "Daring Silhouettes" }
        ]
      },
      { label: "Experimental" },
      { label: "Dynamic" }
    ],
    bgColor: "from-purple-500 via-purple-400 to-pink-300"
  }
]

export default function BrandCards() {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }))
  }

  const renderCheckboxes = (items: CheckboxItem[], parentId = "") => {
    return items.map((item, index) => {
      const id = parentId ? `${parentId}-${index}` : `${index}`
      return (
        <div key={id} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={id}
              checked={checkedItems[id] || false}
              onCheckedChange={(checked) => handleCheckboxChange(id, checked === true)}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              {item.label}
            </label>
          </div>
          {item.subItems && checkedItems[id] && (
            <div className="ml-6 mt-2 space-y-2">
              {renderCheckboxes(item.subItems, id)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <div key={brand.name} className="space-y-4">
          <Card
            className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
          >
           
            <div className="relative aspect-1 p-8 flex items-center justify-center backdrop-blur-md bg-white/20 dark:bg-black/20 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30 dark:group-hover:bg-black/30 border border-white/30 dark:border-black/30 rounded-lg shadow-lg">
              <h2 className="text-gray-800 dark:text-white text-3xl font-bold tracking-wider drop-shadow-lg">
                {brand.name}
              </h2>
              {expandedBrand === brand.name ? (
                <ChevronUp className="absolute bottom-2 right-2 w-6 h-6 text-gray-800 dark:text-white" />
              ) : (
                <ChevronDown className="absolute bottom-2 right-2 w-6 h-6 text-gray-800 dark:text-white" />
              )}
            </div>
          </Card>
          {expandedBrand === brand.name && (
            <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {brand.description}
                </p>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {renderCheckboxes(brand.checkboxes)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  )
}

