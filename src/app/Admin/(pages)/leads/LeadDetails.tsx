//@ts-nocheck
"use client"
import { useState } from "react"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { Textarea } from "../../../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { PhoneIcon, MailIcon, CalendarIcon } from "lucide-react"

const qualityOptions = ["Irrelevant", "Relevant", "Warm", "Hot"]

const qualityColors = {
  Hot: "bg-red-500 hover:bg-red-600 text-white",
  Warm: "bg-amber-500 hover:bg-amber-600 text-white",
  Relevant: "bg-green-500 hover:bg-green-600 text-white",
  Irrelevant: "bg-gray-500 hover:bg-gray-600 text-white",
}

function formatString(input: string): string {
  // Replace underscores with spaces and make everything lowercase
  let formattedString = input.replace(/_/g, " ").toLowerCase();
  
  // Capitalize only the first letter of the entire string
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
}

export default function LeadDetails({ selectedLead, onQualityChange, onCommentSubmit, loadComment }:any) {
  const [comment, setComment] = useState("")

  const handleCommentSubmit = (e:any) => {
    e.preventDefault()
    onCommentSubmit(comment, selectedLead?.id)
    setComment("")
  }

  if (!selectedLead) {
    return (
      <div className="md:w-1/2 p-4 overflow-auto">
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-lg">
          Select a lead to view details
        </div>
      </div>
    )
  }


//   {
//     "id": "854751233540134",
//     "createdAt": "9/28/2024",
//     "quality": "Hot",
//     "feedbackProvided": true,
//     "purchaseTimeline": "within 15 days",
//     "your_whatsapp_number": "9717684788",
//     "full_name": "Yogeeta Phogat Kadian",
//     "phone_number": "+919717684788",
//     "email": "phog_yog@yahoo.com"
// }


  return (
    <div className="md:w-1/2 p-4 overflow-auto">
      <h2 className="md:text-2xl text-xl font-bold mb-4">{ selectedLead.name?selectedLead?.name?.length>35?formatString(selectedLead?.name?.slice(0, 35))+'...':selectedLead?.name:''}</h2>
      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-1">
            {qualityOptions.map((quality) => (
              <Button
                key={quality}
                variant="outline"
                size="sm"
                className={`px-2 py-1 text-xs font-medium rounded-md ${
                  selectedLead?.quality === quality 
                    ? qualityColors[quality] 
                    : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => onQualityChange(selectedLead?.id, quality)}
              >
                {quality}
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-lg  ">{selectedLead?.phone_number}</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{selectedLead.email}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Collected: {new Date(selectedLead.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div>

            <h3 className="text-lg font-semibold mb-2">Additional Questions</h3>
            {Object?.keys(selectedLead)
              .filter((key) => key !== 'id' && key !== 'createdAt' && key !=='quality' && key !=='feedbackProvided' && key !=='full_name' && key !=='phone_number' && key !=='email' && key !=='name' && key !=='type' && key !=='comment')  // Exclude 'age' and 'city'
              .map((key) => (
                <div key={key}>
                <Label className="text-sm">{formatString(key)}</Label>
                <Input value={selectedLead[key]} readOnly className="mt-1 bg-muted" />
              </div>
               
              ))}
           
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {selectedLead?.comment?.map((val)=>(
              <>
              <p className="mb-2 font-semibold" key={val?.comment}>{val?.comment}</p>
              </>
            ))}
           
          </div>

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here..."
              className="w-full"
            />
            <Button type="submit" disabled={loadComment?true:false} className="w-full">
              {loadComment?'Add Comment...':'Add Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}