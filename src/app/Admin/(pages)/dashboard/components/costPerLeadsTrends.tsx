'use client'
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../../components/ui/card'
import { AlertCircle } from 'lucide-react'

const CostPerLeadTrends = () => {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const brandWiseData = [
    { brand: 'Naturamore', Google: 2200, Meta: 1800 },
    { brand: 'Herbs & More', Google: 1900, Meta: 1600 },
    { brand: 'Clean & More', Google: 1400, Meta: 1100 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-2 rounded-lg shadow-lg">
          <p className="text-gray-900 dark:text-white text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (!mounted) {
    return <div className="h-96 w-full bg-gray-100 dark:bg-zinc-950 animate-pulse rounded-lg" />
  }

  return (
    <div className="w-full p-6 bg-white dark:bg-zinc-950 rounded-lg">
      <h2 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">
        Cost per Lead Trends
      </h2>
      <div className="sm:hidden px-6 mb-4">
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-100 dark:border-red-900">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">
            Please open in desktop for better visualization experience
          </p>
        </div>
      </div>
      <Card className="w-full bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white text-sm font-medium">
            Brand-Wise Cost Per Lead (Google Vs Meta)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full">
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#03BAE2]" />
                <span className="text-gray-700 dark:text-white text-sm">Google: 60%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7B57E0]" />
                <span className="text-gray-700 dark:text-white text-sm">Meta: 40%</span>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <BarChart
                  data={brandWiseData}
                  barGap={4}
                  margin={{ 
                    top: 20, 
                    right: isMobile ? 20 : 30, 
                    left: isMobile ? 0 : 20, 
                    bottom: isMobile ? 60 : 25 
                  }}
                >
                  <XAxis
                    dataKey="brand"
                    axisLine={false}
                    tick={{ 
                      fill: '#4b5563',
                      fontSize: isMobile ? 10 : 12,
                      angle: isMobile ? -45 : 0,
                      textAnchor: isMobile ? 'end' : 'middle',
                      dx: isMobile ? -8 : 0,
                      dy: isMobile ? 8 : 10
                    }}
                    interval={0}
                    className="dark:[&_.recharts-cartesian-axis-tick-value]:fill-[#71717a]"
                  />
                  <YAxis
                    axisLine={false}
                    tick={{ 
                      fill: '#4b5563',
                      fontSize: isMobile ? 10 : 12
                    }}
                    ticks={[0, 500, 1000, 1500, 2000, 2500]}
                    className="dark:[&_.recharts-cartesian-axis-tick-value]:fill-[#71717a]"
                  />
                  <Tooltip
                    content={CustomTooltip}
                    cursor={{ 
                      fill: 'rgba(0, 0, 0, 0.05)', 
                      className: 'dark:fill-[rgba(255,255,255,0.05)]' 
                    }}
                  />
                  <Bar 
                    dataKey="Google" 
                    fill="#03BAE2" 
                    radius={[4, 4, 0, 0]}
                    className="dark:fill-[#03BAE2] fill-[#03BAE2]/90" 
                  />
                  <Bar 
                    dataKey="Meta" 
                    fill="#7B57E0" 
                    radius={[4, 4, 0, 0]}
                    className="dark:fill-[#7B57E0] fill-[#7B57E0]/90" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CostPerLeadTrends