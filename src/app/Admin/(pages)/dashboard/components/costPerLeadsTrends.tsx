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

const CostPerLeadTrends = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const brandWiseData = [
    { brand: 'Naturamore', Google: 2200, Meta: 1800 },
    { brand: 'Herbs & More', Google: 1900, Meta: 1600 },
    { brand: 'Clean & More', Google: 1400, Meta: 1100 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg shadow-lg">
          <p className="text-white text-sm mb-1">{label}</p>
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
    return <div className="h-96 w-full bg-zinc-950 animate-pulse rounded-lg" />
  }

  return (
    <div className="w-full p-6 bg-zinc-950 rounded-lg">
      <h2 className="text-white text-lg font-semibold mb-4">
        Cost per Lead Trends
      </h2>
      <Card className="w-full bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-sm font-medium">
            Brand-Wise Cost Per Lead (Google Vs Meta)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full">
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#03BAE2]" />
                <span className="text-white text-sm">Google: 60%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7B57E0]" />
                <span className="text-white text-sm">Meta: 40%</span>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <BarChart
                  data={brandWiseData}
                  barGap={4}
                  margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
                >
                  <XAxis
                    dataKey="brand"
                    axisLine={false}
                    tick={{ fill: '#71717a' }}
                    interval={0}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tick={{ fill: '#71717a' }}
                    ticks={[0, 500, 1000, 1500, 2000, 2500]}
                  />
                  <Tooltip
                    content={CustomTooltip}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="Google" fill="#03BAE2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Meta" fill="#7B57E0" radius={[4, 4, 0, 0]} />
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
