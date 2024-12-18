"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../../components/ui/chart";
import costperlead_icon from "../../../../../../public/icon_saif/costperlead_icon.svg";
import leadgenerated_icon from "../../../../../../public/icon_saif/leadgenerated_icon.svg";
import spend_icon from "../../../../../../public/icon_saif/spend_icon.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ChartDataPoint {
  day: string;
  [key: string]: string | number;
}

interface MetricsCardProps {
  data: ChartDataPoint[];
  mainColor: string;
  metricTitle: string;
  value: string;
  changePercentage: number;
  dataKey?: string;
}

export function Component({
  data,
  mainColor,
  metricTitle,
  value,
  changePercentage,
  dataKey = "spend",
}: MetricsCardProps) {
  const { theme } = useTheme();
  const maxValue = Math.max(...data.map(item => Number(item[dataKey])));

  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: mainColor,
    },
  } satisfies ChartConfig;

  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, value } = props;
    const opacity = value === maxValue ? 1 : 0.3;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        opacity={opacity}
        rx={4}
        ry={4}
      />
    );
  };

  return (
    <Card className="bg-white dark:bg-[#18181a] text-gray-800 dark:text-white w-full">
      <div className="items-left space-y-2 p-3 pt-0 pr-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base text-gray-800 dark:text-white">{metricTitle}</h3>
          <Image
            src={
              dataKey === "spend"
                ? spend_icon
                : dataKey === "cpl"
                ? costperlead_icon
                : leadgenerated_icon
            }
            height={40}
            width={40}
            alt=""
            className="opacity-90 dark:opacity-100"
          />
        </div>
        <div className="flex flex-col items-baseline !my-0">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </span>
          <p className="text-sm text-gray-500 dark:text-[#7D7D7D]">
            last 7 days trends{" "}
            <span
              className={
                changePercentage >= 0 
                  ? "text-emerald-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }
            >
              {changePercentage >= 0 ? "+" : ""}
              {changePercentage}%
            </span>
          </p>
        </div>
      </div>
      <CardContent className="!p-0 px-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
            height={200}
          >
            <CartesianGrid 
              horizontal={false} 
              vertical={false} 
              strokeDasharray="3 3" 
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              fontSize={12}
              interval={1}
              tick={{ fill: theme === 'dark' ? '#fff' : '#374151' }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} shape={<CustomBar />} fill={mainColor} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}