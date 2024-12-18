'use client'
 
import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Steps from './steps'
 
interface ProductSelectionProps {
  selectedBrand: string
  step:number
  selectedProducts: string[]
  setSelectedProducts: (products: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}
 
export default function ProductSelection({
  selectedBrand,
  selectedProducts = [],
  setSelectedProducts,
  selectedCategories = [],
  setSelectedCategories,
  step
}: ProductSelectionProps) {
  const productCategories: Record<string, string[]> = {
    'Naturamore': ['Category A', 'Category B'],
    'Clean & More': ['Category C', 'Category D'],
    'Herb & More': ['Category E', 'Category F']
  }
 
  const products: Record<string, string[]> = {
    'Category A': ['Product 1', 'Product 2', 'Product 3'],
    'Category B': ['Product 4', 'Product 5', 'Product 6'],
    'Category C': ['Product 7', 'Product 8', 'Product 9'],
    'Category D': ['Product 10', 'Product 11', 'Product 12'],
    'Category E': ['Product 13', 'Product 14', 'Product 15'],
    'Category F': ['Product 16', 'Product 17', 'Product 18']
  }
 
  const [partiallySelectedCategories, setPartiallySelectedCategories] = useState<string[]>([])
 
  useEffect(() => {
    if (Array.isArray(selectedProducts)) {
      updatePartiallySelectedCategories()
    }
  }, [selectedProducts])
 
  const updatePartiallySelectedCategories = () => {
    if (!Array.isArray(selectedProducts)) return;
 
    const partial = Object.entries(products).reduce((acc, [category, categoryProducts]) => {
      const selectedCategoryProducts = categoryProducts.filter(product => selectedProducts.includes(product))
      if (selectedCategoryProducts.length > 0 && selectedCategoryProducts.length < categoryProducts.length) {
        acc.push(category)
      }
      return acc
    }, [] as string[])
    setPartiallySelectedCategories(partial)
  }
 
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(updatedCategories)
 
    const categoryProducts = products[category]
    if (updatedCategories.includes(category)) {
      setSelectedProducts([...new Set([...selectedProducts, ...categoryProducts])])
    } else {
      setSelectedProducts(selectedProducts.filter(p => !categoryProducts.includes(p)))
    }
  }
 
  const handleProductChange = (product: string, category: string) => {
    const updatedProducts = selectedProducts.includes(product)
      ? selectedProducts.filter(p => p !== product)
      : [...selectedProducts, product]
    setSelectedProducts(updatedProducts)
 
    if (!selectedCategories.includes(category) && updatedProducts.includes(product)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }
 
  if (!selectedBrand || !productCategories[selectedBrand]) {
    return <div className="text-center text-lg text-gray-600">Please select a brand first.</div>
  }
  console.log('partially selected', partiallySelectedCategories)
 
  return (
    <div className="space-y-6">
      <div className='flex justify-between'>
        <h2 className="md:text-2xl text-lg font-semibold mb-4">
          Select Products
        </h2>
        <Steps step={step} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productCategories[selectedBrand].map((category) => (
          <motion.div
            key={category}
            className="space-y-2  p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 p-2 border rounded hover:bg-accent transition-colors">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
                className={`border-[rgb(123,87,224)] data-[state=checked]:bg-[rgb(123,87,224)] focus:ring-[rgb(123,87,224)] ${
                  partiallySelectedCategories.includes(category) ? 'bg-[rgb(123,87,224)] bg-opacity-50' : ''
                }`}
              />
              <Label htmlFor={`category-${category}`} className="text-lg font-semibold cursor-pointer">{category}</Label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6">
              {products[category].map((product) => (
                <motion.div
                  key={product}
                  className="flex items-center space-x-2 p-2 border rounded hover:bg-accent transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Checkbox
                    id={product}
                    checked={selectedProducts.includes(product)}
                    onCheckedChange={() => handleProductChange(product, category)}
                    className="border-[rgb(123,87,224)] data-[state=checked]:bg-[rgb(123,87,224)] focus:ring-[rgb(123,87,224)]"
                  />
                  <Label htmlFor={product} className="flex-grow cursor-pointer">{product}</Label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
 