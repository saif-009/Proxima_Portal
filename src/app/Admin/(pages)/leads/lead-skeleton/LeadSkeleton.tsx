import { Skeleton } from "@/components/ui/skeleton"

export default function LeadSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-background text-foreground">
      {/* Left section - Leads list */}
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2 p-4 border border-border rounded-lg">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex space-x-2">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-8 w-20" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right section - Lead details */}
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  )
}