"use client"
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { cn } from "@/lib/utils" 

const data = [

    { name: '4 Dec', value: 1200 },
    { name: '5 Dec', value: 1900 },
    { name: '6 Dec', value: 3500 },
    { name: '7 Dec', value: 1850 },
    { name: '8 Dec', value: 300 },
    { name: '9 Dec', value: 2400 },
    { name: '10 Dec', value: 1400 },
]
    const CustomXAxisTick = ({ x, y, payload }:any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        fontSize={12}
        width={100}
      >
        <tspan x="0" dy="1em">{payload.value.split(' ')[0]}</tspan>
        <tspan x="0" dy="1.2em">{payload.value.split(' ').slice(1).join(' ')}</tspan>
      </text>
    </g>
  );
};


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "p-2 border shadow-md rounded-md", // Basic styling
          "bg-white text-black dark:bg-neutral-800 dark:text-white" // Light and dark mode support
        )}
      >
        <p className='text-sm'>{`${payload[0].payload.name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};



export default function LeadGenerationFunnel() {
//   const [selectedData, setSelectedData] = useState('all')

// console.log("selectedData", selectedData)
// useEffect(()=>{
//     if(selectedData==='all'){
//       handleAllFunnel()
//     }else if(selectedData==='meta'){
//       handleFacebookFunnel()
//     }else if(selectedData==='google'){
//       handleGoogleFunnel()
//     }

// },[selectedData])
const getBarSize = () => {
  // Determine bar size based on window width
  return typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40;
}

  return (
    <Card className=" flex flex-col justify-between pb-0 h-full md:p-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl  font-bold">No. of Leads</CardTitle>
      </CardHeader>
      <CardContent className=' md:flex-grow  md:h-full h-[400px] '>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            accessibilityLayer
            margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            className='dark:bg-transparent dark:hover:bg-transparent'
          >
            <XAxis 
              dataKey="name" 
              interval={0}
              tick={<CustomXAxisTick />}
              height={50}
              tickLine={false}
               
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar 
              dataKey="value" 
            
               
              fill="#7B57E0" 
              stroke="#7B57E0" 
              strokeWidth={2} 
              radius={[10, 10, 0, 0]} 
              barSize={getBarSize()}
              className="recharts-bar-rectangle hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
