'use client'

import { Card } from '../../../../../../components/ui/card'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../../../components/ui/tooltip'
import Image from 'next/image'
const Tags = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Card className="p-2 md:w-64 w-full space-y-1">
        <div className="flex items-center justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="w-48">
                <div className="space-y-1 text-xs">
                  <p>Deliverables: 3 Months</p>
                  <p>Impressions: 7500</p>
                  <p>CTR: 8.20%</p>
                  <p>Click To Lead Ratio: 15 To 20%</p>
                  <p>Click $: 615</p>
                  <p>Leads: 123</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex gap-2 items-center">
            <div className="relative w-6 h-6">
              <Image
                src="/images/google-icon.svg" // Placeholder for the actual Meta logo path
                alt="Meta Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="font-medium text-xs">Cost Per Lead</span>
          </div>

          <span className="text-sm">₹122</span>
        </div>
        
      </Card>

      <Card className="p-2 md:w-64 w-full space-y-1">
        <div className="flex items-center justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="w-48">
                <div className="space-y-1 text-xs">
                  <p>Deliverables: 3 Months</p>
                  <p>Impressions: 25000</p>
                  <p>CTR: 0.65%</p>
                  <p>Click To Lead Ratio: 12%</p>
                  <p>Click $: 163</p>
                  <p>Leads: 20</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex gap-2 items-center">
            <div className="relative w-6 h-6">
              <Image
                src="/images/meta-icon.svg" // Placeholder for the actual Meta logo path
                alt="Meta Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="font-medium text-xs">Cost Per Lead</span>
          </div>
          <span className="text-sm">₹256</span>
        </div>
        
      </Card>
    </div>
  )
}

export default Tags
