'use client'
 
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RefreshCw } from 'lucide-react'
 
// Mock data for Facebook pages
const facebookPages = [
  "Tech News Daily",
  "Foodie Adventures",
  "Travel Enthusiasts",
  "Fitness Motivation",
  "Pet Lovers Unite"
]
 
export default function LinkAdAccounts() {
  const [showList, setShowList] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
 
  const handleLinkClick = () => {
    setShowList(true)
  }
 
  const handleAccountSelect = (value: string) => {
    setSelectedAccount(value)
  }
 
  const handleReconnect = () => {
    setShowList(false)
    setSelectedAccount(null)
  }
 
  return (
<div className="w-[300px] space-y-4">
<Card>
<CardHeader className="flex flex-row items-center justify-between">
<CardTitle>Facebook</CardTitle>
<Button variant="outline" size="sm" onClick={handleReconnect}>
<RefreshCw className="h-4 w-4 mr-2" />
            Re-connect
</Button>
</CardHeader>
<CardContent>
          {!showList ? (
<Button onClick={handleLinkClick} className="w-full">
              Link Ad A/c
</Button>
          ) : (
<Select onValueChange={handleAccountSelect} value={selectedAccount || undefined}>
<SelectTrigger className="w-full">
<SelectValue placeholder="Select Ad Account" />
</SelectTrigger>
<SelectContent>
<SelectItem value="ad_ac1">Ad ac1</SelectItem>
<SelectItem value="ad_ac2">Ad ac2</SelectItem>
</SelectContent>
</Select>
          )}
          {selectedAccount && (
<p className="mt-4 text-sm text-muted-foreground">
              Selected account: {selectedAccount}
</p>
          )}
</CardContent>
</Card>
 
      <Accordion type="single" collapsible className="w-full">
<AccordionItem value="fb-pages">
<AccordionTrigger>FB Pages</AccordionTrigger>
<AccordionContent>
<ul className="space-y-2">
              {facebookPages.map((page, index) => (
<li key={index} className="text-sm">{page}</li>
              ))}
</ul>
</AccordionContent>
</AccordionItem>
</Accordion>
</div>
  )
}