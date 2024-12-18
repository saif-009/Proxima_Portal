import React from 'react'
import { Card } from '../../../../../../components/ui/card'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
} from 'lucide-react'
import { Component as StackedChart } from './stackedCharts'
import { Component as MetricsCard } from './statsCards'

const StatCard = ({
  title,
  value,
  trend,
  trendValue,
  color,
  data,
  icon: Icon,
}) => {
  const isPositive = !trendValue.includes('-')

  // Find the maximum value in the data
  const maxValue = Math.max(
    ...data.map((item) => item.value || item.highlight || 0),
  )

  // Process data to add color intensity based on value
  const processedData = data.map((item) => ({
    ...item,
    color: item.value === maxValue ? color : `${color}/20`,
  }))

  return (
    <Card className="p-4 bg-gray-50 dark:bg-zinc-900 border-zinc-800 justify-between flex flex-col">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-white">{title}</h3>
          <Icon className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="flex flex-col items-baseline">
          <span className="text-2xl font-bold text-white">{value}</span>
          <div>
            <span className="text-zinc-400 text-xs">Last 7 Days Trends</span>{' '}
            <span
              className={`text-xs ${
                isPositive ? 'text-green-500' : 'text-red-500' 
              }`}
            >
              {trendValue}
            </span>
          </div>
        </div>
      </div>

      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 0, right: -20, bottom: 0, left: -20 }}
          >
            <Bar
              dataKey="value"
              fill={color}
              radius={[4, 4, 4, 4]}
              barSize={35}
              fillOpacity={0.3}
            />
            <Bar
              dataKey="highlight"
              fill={color}
              radius={[4, 4, 4, 4]}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-full grid grid-cols-7 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} className="text-xs text-zinc-500 text-center">
              {day}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

const StatCards = () => {
  // Sample data
  const spendData = [
    { day: 'Mon', spend: 850 },
    { day: 'Tue', spend: 1100 },
    { day: 'Wed', spend: 950 },
    { day: 'Thu', spend: 400 },
    { day: 'Fri', spend: 800 },
    { day: 'Sat', spend: 850 },
    { day: 'Sun', spend: 800 },
  ]

  const leadsData = [
    { day: 'Mon', leads: 120 },
    { day: 'Tue', leads: 145 },
    { day: 'Wed', leads: 135 },
    { day: 'Thu', leads: 80 },
    { day: 'Fri', leads: 120 },
    { day: 'Sat', leads: 125 },
    { day: 'Sun', leads: 120 },
  ]

  const costPerLeadData = [
    { day: 'Mon', cpl: 110 },
    { day: 'Tue', cpl: 138 },
    { day: 'Wed', cpl: 125 },
    { day: 'Thu', cpl: 95 },
    { day: 'Fri', cpl: 115 },
    { day: 'Sat', cpl: 120 },
    { day: 'Sun', cpl: 118 },
  ]


  return (
    <div className="flex flex-col xl:flex-row w-full gap-4 ">
      <div className='flex flex-col md:flex-row gap-4  w-full'>
      <MetricsCard
        data={spendData}
        mainColor="#ff6b6b"
        metricTitle="Spend"
        value="₹ 12.2 Cr"
        changePercentage={5.2}
        dataKey="spend"
      />

      <MetricsCard
        data={leadsData}
        mainColor="#4dabf7"
        metricTitle="Lead Generated"
        value="150k"
        changePercentage={5.2}
        dataKey="leads"
      />

      <MetricsCard
        data={costPerLeadData}
        mainColor="#69db7c"
        metricTitle="Cost Per Lead"
        value="₹ 138"
        changePercentage={5.2}
        dataKey="cpl"
        />
       
      </div>
      
      
     
    </div>
  )
}

export default StatCards
