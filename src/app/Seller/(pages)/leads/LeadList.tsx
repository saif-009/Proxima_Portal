//@ts-nocheck

import { useTheme } from 'next-themes'
import { ScrollArea } from "../../../../../components/ui/scroll-area" 
import { Card, CardContent } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../components/ui/tooltip"
import { PhoneIcon, CalendarIcon } from "lucide-react"

const qualityOptions = ["Irrelevant", "Relevant", "Warm", "Hot"]

const qualityColors = {
  Hot: "bg-red-500 hover:bg-red-600 text-white",
  Warm: "bg-amber-500 hover:bg-amber-600 text-white",
  Relevant: "bg-green-500 hover:bg-green-600 text-white",
  Irrelevant: "bg-gray-500 hover:bg-gray-600 text-white",
}

export default function LeadList({ leads, onLeadClick, onQualityChange, selectedLead }:any) {
  const { theme } = useTheme() // Using the theme

  const isDarkMode = theme === 'dark' // Determine dark mode


// {
//   "id": "854751233540134",
//   "createdAt": "9/28/2024",
//   "quality": "Hot",
//   "feedbackProvided": true,
//   "purchaseTimeline": "within 15 days",
//   "your_whatsapp_number": "9717684788",
//   "full_name": "Yogeeta Phogat Kadian",
//   "phone_number": "+919717684788",
//   "email": "phog_yog@yahoo.com"
// }


  return (
	<div className={`md:w-1/2 p-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b md:border-r overflow-auto`}>
      <h2 className="md:text-2xl text-xl font-bold mb-4">Leads</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {leads?.map((lead:any) => (
          <Card
            key={lead.id}
            className={`mb-2 cursor-pointer bg-muted ${lead?.id === selectedLead?.id?'border dark:border-gray-500':'none'}`}
            onClick={() => onLeadClick(lead)}
          >
            <CardContent className="p-3">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{lead?.full_name}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {lead.createdAt}
                    </p>
                  </div>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                   {lead?.phone_number?.length>0 && <PhoneIcon className="w-4 h-4 mr-1" />} 
                    {lead?.phone_number}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {qualityOptions.map((quality) => (
                    <TooltipProvider key={quality}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`px-2 py-1 text-xs font-medium rounded-md ${lead.quality === quality ? qualityColors[quality] : (isDarkMode ? 'bg-background text-gray-300' : 'bg-white text-gray-700 border-gray-300')}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onQualityChange(lead.id, quality)
                            }}
                          >
                            {quality}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark as {quality}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}
