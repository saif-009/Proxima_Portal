"use client"

import { useState } from "react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../../components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../components/ui/select"

const chartData = [
  { media: "facebook", visitors: 450, fill: "#D29BFF" },
  { media: "google", visitors: 150, fill: "#695CFB" },
]

const chartConfig = {
  facebook: {
    label: "Facebook",
    color: "#D29BFF",
  },
  google: {
    label: "Google",
    color: "#695CFB",
  },
} satisfies ChartConfig

export default function LeadDistribution() {
  const [activeView, setActiveView] = useState('channel')

  return (
    <Card className="flex flex-col justify-between pb-0 h-full md:p-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Lead Distribution</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="mb-8">
          <Select value={activeView} onValueChange={setActiveView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand">By Brand</SelectItem>
              <SelectItem value="channel">By Channel</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
              <SelectItem value="product">By Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="media" />
            <ChartLegend
              content={<ChartLegendContent nameKey="media" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 text-base [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

