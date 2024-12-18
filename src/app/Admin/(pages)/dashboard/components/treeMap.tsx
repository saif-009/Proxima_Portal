import React, { useMemo, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../../../../components/ui/resizable'
import { Card, CardHeader, CardTitle } from '../../../../../../components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../../components/ui/select'

// Enhanced color palette with opacity variations for light/dark modes
const colorPalette = [
  'bg-blue-400/90 dark:bg-blue-400',    
  'bg-emerald-400/90 dark:bg-emerald-400', 
  'bg-violet-400/90 dark:bg-violet-400',  
  'bg-rose-400/90 dark:bg-rose-400',    
  'bg-amber-400/90 dark:bg-amber-400',   
  'bg-cyan-400/90 dark:bg-cyan-400',    
  'bg-indigo-400/90 dark:bg-indigo-400',  
  'bg-orange-400/90 dark:bg-orange-400',  
  'bg-teal-400/90 dark:bg-teal-400',    
  'bg-pink-400/90 dark:bg-pink-400',    
  'bg-lime-400/90 dark:bg-lime-400',    
  'bg-purple-400/90 dark:bg-purple-400'   
]

// Enhanced hierarchical data with more categories and products
const hierarchicalData = {
  brands: [
    {
      name: 'Naturamore',
      leads: 8500,
      categories: [
        {
          name: 'Health Supplements',
          leads: 3200,
          products: [
            { name: 'Protein Powder', leads: 1200 },
            { name: 'Multivitamins', leads: 800 },
            { name: 'Omega-3 Supplements', leads: 700 },
            { name: 'Immunity Boosters', leads: 500 }
          ]
        },
        {
          name: 'Herbal Products',
          leads: 2800,
          products: [
            { name: 'Herbal Tea', leads: 1000 },
            { name: 'Ayurvedic Supplements', leads: 900 },
            { name: 'Natural Extracts', leads: 900 }
          ]
        },
        {
          name: 'Sports Nutrition',
          leads: 2500,
          products: [
            { name: 'Pre-Workout', leads: 900 },
            { name: 'BCAA Supplements', leads: 800 },
            { name: 'Energy Bars', leads: 800 }
          ]
        }
      ]
    },
    {
      name: 'Herbs & More',
      leads: 7200,
      categories: [
        {
          name: 'Personal Care',
          leads: 2800,
          products: [
            { name: 'Herbal Face Wash', leads: 800 },
            { name: 'Natural Shampoo', leads: 700 },
            { name: 'Organic Soap', leads: 700 },
            { name: 'Hair Oil', leads: 600 }
          ]
        },
        {
          name: 'Skincare',
          leads: 2400,
          products: [
            { name: 'Face Serum', leads: 700 },
            { name: 'Natural Moisturizer', leads: 900 },
            { name: 'Sun Protection', leads: 800 }
          ]
        },
        {
          name: 'Aromatherapy',
          leads: 2000,
          products: [
            { name: 'Essential Oils', leads: 800 },
            { name: 'Diffusers', leads: 600 },
            { name: 'Natural Fragrances', leads: 600 }
          ]
        }
      ]
    },
    {
      name: 'Clean & More',
      leads: 6300,
      categories: [
        {
          name: 'Home Care',
          leads: 2500,
          products: [
            { name: 'Natural Surface Cleaner', leads: 700 },
            { name: 'Eco-friendly Detergent', leads: 600 },
            { name: 'Kitchen Cleaners', leads: 600 },
            { name: 'Bathroom Solutions', leads: 600 }
          ]
        },
        {
          name: 'Eco-friendly Products',
          leads: 2000,
          products: [
            { name: 'Biodegradable Bags', leads: 700 },
            { name: 'Natural Air Fresheners', leads: 700 },
            { name: 'Bamboo Products', leads: 600 }
          ]
        },
        {
          name: 'Pet Care',
          leads: 1800,
          products: [
            { name: 'Pet Shampoo', leads: 700 },
            { name: 'Natural Pet Food', leads: 600 },
            { name: 'Pet Cleaning Solutions', leads: 500 }
          ]
        }
      ]
    }
  ]
}

// Function to flatten hierarchical data based on selected view
const flattenData = (selectedView) => {
  if (selectedView === 'brands') {
    return hierarchicalData.brands.map(brand => ({
      name: brand.name,
      leads: brand.leads,
      path: brand.name
    }))
  }
  
  if (selectedView === 'categories') {
    return hierarchicalData.brands.flatMap(brand =>
      brand.categories.map(category => ({
        name: category.name,
        leads: category.leads,
        path: `${brand.name} > ${category.name}`
      }))
    )
  }
  
  if (selectedView === 'products') {
    return hierarchicalData.brands.flatMap(brand =>
      brand.categories.flatMap(category =>
        category.products.map(product => ({
          name: product.name,
          leads: product.leads,
          path: `${brand.name} > ${category.name} > ${product.name}`
        }))
      )
    )
  }
}

const ModelPanel = ({ model, size, selectedView }) => (
  <ResizablePanel defaultSize={size} minSize={size} maxSize={size}>
    <div
      className={`h-full w-full ${model.color} group relative transition-all duration-200 hover:brightness-110`}
    >
      <div className="fixed z-[9999] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-white dark:bg-zinc-800 px-4 py-3 rounded-lg shadow-xl translate-x-2 translate-y-2 relative z-[9999]">
          {selectedView === 'brands' ? (
            <>
              <p className="text-gray-900 dark:text-white text-sm font-medium whitespace-normal">
                {model.path}
              </p>
              <p className="text-gray-900 dark:text-white text-sm font-semibold mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                Leads: {model.leads.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-gray-900 dark:text-white text-sm font-semibold">
              Leads: {model.leads.toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <div className="absolute top-4 left-4 right-4">
        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
          {model.name}
        </p>
      </div>
    </div>
  </ResizablePanel>
)
const calculateColumnSizes = (data) => {
  const totalLeads = data.reduce((sum, item) => sum + item.leads, 0)
  const columns = []
  let currentColumn = []
  let currentColumnLeads = 0
  const targetColumnLeads = totalLeads / 4

  data.forEach((item) => {
    currentColumn.push(item)
    currentColumnLeads += item.leads

    if (currentColumnLeads >= targetColumnLeads && columns.length < 3) {
      columns.push(currentColumn)
      currentColumn = []
      currentColumnLeads = 0
    }
  })

  if (currentColumn.length > 0) {
    columns.push(currentColumn)
  }

  const columnSizes = columns.map((column) => {
    const columnTotal = column.reduce((sum, item) => sum + item.leads, 0)
    return Math.round((columnTotal / totalLeads) * 100)
  })

  const itemSizes = columns.map((column) => {
    const columnTotal = column.reduce((sum, item) => sum + item.leads, 0)
    return column.map((item) => Math.round((item.leads / columnTotal) * 100))
  })

  return { columns, columnSizes, itemSizes }
}
export default function NetsurfTreemap() {
  const [selectedView, setSelectedView] = useState('brands')

  const currentData = useMemo(() => {
    const data = flattenData(selectedView).map((item, index) => ({
      ...item,
      color: colorPalette[index % colorPalette.length],
    }))
    return data.sort((a, b) => b.leads - a.leads)
  }, [selectedView])

  const { columns, columnSizes, itemSizes } = useMemo(
    () => calculateColumnSizes(currentData),
    [currentData],
  )

  return (
    <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Netsurf Leads Volume
        </CardTitle>
        <Select value={selectedView} onValueChange={setSelectedView}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brands">Brands</SelectItem>
            <SelectItem value="categories">Product Categories</SelectItem>
            <SelectItem value="products">Products</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <div className="md:hidden px-6 mb-4">
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-100 dark:border-red-900">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">
            Please open in desktop for better visualization experience
          </p>
        </div>
      </div>

      <div className="p-6">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[400px] rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          {columns.map((column, columnIndex) => (
            <React.Fragment key={columnIndex}>
              {columnIndex > 0 && <ResizableHandle className="invisible" />}
              <ResizablePanel
                defaultSize={columnSizes[columnIndex]}
                minSize={columnSizes[columnIndex]}
                maxSize={columnSizes[columnIndex]}
              >
                <ResizablePanelGroup direction="vertical">
                  {column.map((model, modelIndex) => (
                    <React.Fragment key={model.name}>
                      {modelIndex > 0 && (
                        <ResizableHandle className="invisible" />
                      )}
                      <ModelPanel
                        model={model}
                        size={itemSizes[columnIndex][modelIndex]}
                        selectedView={selectedView}
                      />
                    </React.Fragment>
                  ))}
                </ResizablePanelGroup>
              </ResizablePanel>
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      </div>
    </Card>
  )
}