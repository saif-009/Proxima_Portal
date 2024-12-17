'use client'

import * as React from 'react'
import { Circle } from 'lucide-react'

import { Button } from '../../../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu'

const bucketOptions = [
  { value: 'Interested - details shared', color: '#22c55e' }, // green-500
  { value: 'Site visit planned', color: '#3b82f6' }, // blue-500
  { value: 'Negotiation', color: '#eab308' }, // yellow-500
  { value: 'Not interested', color: '#ef4444' }, // red-500
  { value: 'Closed', color: '#a855f7' }, // purple-500
  { value: 'Other', color: '#6b7280' }, // gray-500
]

interface DropdownMenuRadioGroupDemoProps {
  defaultBucket: string
  onBucketChange?: (bucket: string) => void
}

export function DropdownMenuRadioGroupDemo({
  defaultBucket,
  onBucketChange,
}: DropdownMenuRadioGroupDemoProps) {
  const [selectedBucket, setSelectedBucket] = React.useState(defaultBucket)

  const handleBucketChange = (value: string) => {
    setSelectedBucket(value)
    if (onBucketChange) {
      onBucketChange(value)
    }
  }

  const getColor = (bucket: string) => {
    const option = bucketOptions.find((opt) => opt.value === bucket)
    return option ? option.color : '#6b7280' // default to gray if not found
  }

  const selectedColor = getColor(selectedBucket)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-56 justify-start">
          <Circle
            className="mr-2 h-2 w-2"
            style={{ fill: selectedColor, color: selectedColor }}
          />
          {selectedBucket}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Lead Bucket</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedBucket}
          onValueChange={handleBucketChange}
        >
          {bucketOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="flex items-center"
            >
              <Circle
                className="mr-2 h-2 w-2"
                style={{ fill: option.color, color: option.color }}
              />
              {option.value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
