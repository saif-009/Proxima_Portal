import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { PieChart, Pie, Label } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../../../components/ui/chart";
import type { ChartConfig } from "../../../../../../components/ui/chart";
import { AlertCircle } from "lucide-react";

const ContributionAnalysis = () => {
  const brandData = [
    { name: 'Naturamore', value: 48, fill: '#00e6ca' },
    { name: 'Herbs & More', value: 32, fill: '#6366f1' },
    { name: 'Clean & More', value: 20, fill: '#c084fc' }
  ];

  const channelData = [
    { name: 'Google', value: 60, fill: '#6366f1' },
    { name: 'Meta', value: 40, fill: '#c084fc' }
  ];

  const ChartCard = ({ title, data, centerText, centerSubtext }) => {
    const totalValue = useMemo(() => {
      return data.reduce((acc, curr) => acc + curr.value, 0);
    }, [data]);

    const chartConfig: ChartConfig = {
      value: {
        label: "Value",
      },
      ...Object.fromEntries(
        data.map(item => [
          item.name.toLowerCase(),
          {
            label: item.name,
            color: item.fill,
          },
        ])
      ),
    };

    return (
      <Card className="bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-900 dark:text-white text-lg font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center sm:flex-row sm:justify-between p-4">
          <div className="flex flex-col justify-center gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.fill }} 
                />
                <span className="text-base text-gray-900 dark:text-white font-medium">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-48 h-48 ">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart width={200} height={200}>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-gray-900 dark:fill-white text-2xl font-bold"
                            >
                              {centerText}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-gray-500 dark:fill-zinc-400 text-xs"
                            >
                              {centerSubtext}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-black">
      <h2 className="text-gray-900 dark:text-white text-lg font-semibold mb-4 ml-6">
        Contribution Analysis
      </h2>
      <div className="lg:hidden px-6 mb-4">
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-100 dark:border-red-900">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">
            Please open in desktop for better visualization experience
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChartCard
          title="Brand-Wise Contribution"
          data={brandData}
          centerText="48%"
          centerSubtext="Naturamore"
        />
        <ChartCard
          title="Channel Contribution"
          data={channelData}
          centerText="60%"
          centerSubtext="Google"
        />
      </div>
    </div>
  );
};

export default ContributionAnalysis;