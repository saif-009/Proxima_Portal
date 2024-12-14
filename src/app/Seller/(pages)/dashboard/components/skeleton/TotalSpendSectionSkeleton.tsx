
import { Card, CardContent } from "@/components/ui/card"

export default function TotalSpendSectionSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 flex-grow">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}