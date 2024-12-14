import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
 
export default function CampaignsListViewSkelton() {
  const headers = [
    "Name", "Platform", "Type", "Status", "Label", "Start Date", "End Date", 
    "Opt. Score", "Spend", "Budget Remaining", "Impressions", "CTR", "CPC", 
    "Conversions", "Conv. Rate"
  ]
 
  return (
<Table className="w-full rounded-lg">
<TableHeader>
<TableRow>
          {headers.map((header, index) => (
<TableHead key={index} className="text-xs font-medium text-muted-foreground">
              {header}
</TableHead>
          ))}
</TableRow>
</TableHeader>
<TableBody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
<TableRow key={rowIndex}>
            {headers.map((_, cellIndex) => (
<TableCell key={cellIndex}>
<Skeleton className="h-4 w-full" />
</TableCell>
            ))}
</TableRow>
        ))}
</TableBody>
</Table>
  )
}