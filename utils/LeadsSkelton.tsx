import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function LeadsSkelton() {
  return (
         <>
        <div className="leads-list w-full md:w-4/6 p-4 border-r md:overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Leads</h2>
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 10 }).map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="form-section w-full md:w-2/6 p-4 md:overflow-auto">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Form Answer</h3>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="space-y-2">
                <Input placeholder="Enter your discussion notes here..." />
                <Button className="w-full bg-black text-white hover:bg-gray-800">Add Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </>
  )
}