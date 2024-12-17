import React from 'react';
import { Card, CardContent, CardTitle } from "../../../../../../components/ui/card"
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { ChartContainer } from "../../../../../../components/ui/chart"
 
const data = [{ value: 60 }];
 
const WalletDashboard = () => {
  const gradientColor1 = ['#AC56FF']
  const gradientColor2 = ['#00CEDB']
  return (
    <Card className="h-full w-80  " style={{
      background: `linear-gradient(45deg, ${gradientColor1}60 5%, var(--center-color), ${gradientColor2}70 100%)`,
    }}>
      <CardContent className="flex items-center justify-between h-full p-2 space-x-4">
        <div className="flex flex-col flex-shrink-0 justify-center ">
          <CardTitle className="text-lg font-medium capitalize mb-2">Wallet Balance</CardTitle>
          <div className="space-y-1">
            <div className="text-xl font-semibold">₹ 50,000</div>
            <div className="text-xs text-muted-foreground">Acme Automobiles Pvt Ltd</div>
            <div className="text-xs text-muted-foreground">Total Spend Till ₹1,00,000</div>
          </div>
        </div>
<div className='flex flex-col justify-between   items-center'>
        <div className=" w-24 h-24">
          <ChartContainer
            config={{
              spent: {
                color: "var(--spent-color)",
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="80%"
                outerRadius="100%"
                data={data}
                startAngle={-330}
                endAngle={70}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={30}
                  fill="var(--color-spent)"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
 
        <div className="flex flex-row justify-center   gap-5">
          <div className="text-xs text-muted-foreground flex flex-col">
            <span>Spent</span>
            <span className="font-medium">₹15,000</span>
          </div>
          <div className="text-xs text-muted-foreground flex flex-col">
            <span>Budget</span>
            <span className="font-medium">₹25,000</span>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  )
}
 
export default WalletDashboard;