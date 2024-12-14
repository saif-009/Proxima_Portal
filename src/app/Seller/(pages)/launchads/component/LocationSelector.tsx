'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../components/ui/select"

const indianCities = [
  { id: 1, name: "Mumbai" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Bangalore" },
  { id: 4, name: "Hyderabad" },
  { id: 5, name: "Chennai" },
  { id: 6, name: "Kolkata" },
  { id: 7, name: "Pune" },
  { id: 8, name: "Ahmedabad" },
  { id: 9, name: "Jaipur" },
  { id: 10, name: "Surat" },
]

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState<string>('')

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    // You can add any additional logic here when a city is selected
    console.log(`Selected city: ${value}`)
  }

  return (
	<div className='flex flex-row justify-end gap-10 w-full items-center'>
		<div className='text-lg dark:text-white text-blacks'>
			Locations - 
		</div>
		<Select
      value={selectedCity}
      onValueChange={handleCityChange}
    >
      <SelectTrigger className="md:w-[250px] w-[150px] dark:bg-primary-foreground bg-[#F0F3F6] dark:bg-[#171717]">
        <SelectValue placeholder="Select a city in India" />
      </SelectTrigger>
      <SelectContent>
        {indianCities.map((city) => (
          <SelectItem
            key={city.id}
            value={city.name}
          >
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

	</div>
    
  )
}

