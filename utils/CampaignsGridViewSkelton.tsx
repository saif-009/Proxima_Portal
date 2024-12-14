import { Skeleton } from "../components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"

function CampaignCardSkeleton() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-16" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
        <Skeleton className="h-2 w-full mb-6" />
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full mb-2" />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-9 flex-1" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default function  CampaignGridViewSkeleton() {
  return (
   <>
      {Array.from({ length: 3 }).map((_, i) => (
        <CampaignCardSkeleton key={i} />
      ))}
   </>
  )
}