"use client"
 
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Hash } from 'lucide-react'
import { motion } from "framer-motion"
import Steps from "./steps"
 
interface LocationAndReferenceInputProps {
  selectedLocation: string
  step:number
  setSelectedLocation: (location: string) => void
  referenceNumber: string
  setReferenceNumber: (referenceNumber: string) => void
}
 
export default function LocationAndReferenceInput({
  selectedLocation,
  step,
  setSelectedLocation,
  referenceNumber,
  setReferenceNumber
}: LocationAndReferenceInputProps) {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
  const [mounted, setMounted] = useState(false)
 
  useEffect(() => {
    setMounted(true)
  }, [])
 
  if (!mounted) {
    return null
  }
 
  return (
    <Card className="w-full max-w-4xl mx-auto bg-background/50 backdrop-blur-sm !border-none">
      <div className='flex justify-between'>
        <h2 className="md:text-2xl text-lg font-semibold mb-4">
          Fill Details
        </h2>
        <Steps step={step} />
      </div>
      <CardContent className="p-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full h-14 text-left pl-12 relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="cursor-pointer">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
 
          <div className="space-y-2">
            <div className="relative">
              <Hash className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter reference number"
                className="w-full h-14 pl-12"
              />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}