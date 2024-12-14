"use client"

import { RadialBarChart, PolarRadiusAxis, RadialBar, Label } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../../../components/ui/chart"
import leadcoverage_icon from '../../../../public/icon_saif/leadcoverage_icon.svg'
import qualityscore_icon from '../../../../public/icon_saif/qualityscore_icon.svg'

import Image from "next/image"

const getChartConfig = (title) => ({
  score: {
    label: "Score",
    color: title === "Quality Score" ? "#CB3CFF" : "#FDB52A",
  },
  total: {
    label: "Total",
    color: title === "Quality Score" ? "#E299FF" : "#FFE0A3",
  },
}) satisfies ChartConfig

export function Component({ title, value, label }) {
  const chartData = [{
    score: value[0].currScore,
    total: value[0].totalScore
  }]

  return (
    <Card className="bg-[#18181a] text-white w-full">
      <div className="items-left space-y-2 p-3 pt-0 pr-0">
        <div className="flex items-center justify-between">
        <h3 className="text-base text-white">{title}</h3>
        <Image src={title==='Quality Score'? qualityscore_icon:leadcoverage_icon} height={40} width={40} alt="" className=""/>
        </div>
        <div className="flex flex-col items-baseline !my-0"><span className="text-2xl font-bold text-white">{value[0].currScore}</span></div>
      </div>
      <div className="chart-area flex flex-1 items-center pb-0 -mb-24">
        <ChartContainer
          config={getChartConfig(title)}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-white text-2xl font-bold "
                        >
                          {value[0].currScore}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="score"
              stackId="a"
              cornerRadius={5}
              fill={getChartConfig(title).score.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="total"
              fill={getChartConfig(title).total.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </Card>
  )
}