'use client'

import { useState } from "react"
import { Check } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../../components/ui/card"
import { Button } from "../../../../../../components/ui/button"
import { Badge } from "../../../../../../components/ui/badge"

export default function PricingCards() {

  const plans = [
    {
      name: "Basic",
      price: "5k",
    },
    {
      name: "Intermediate",
      price: "10k",
      recommended: true,
      savings: "Save $5 per user",
    },
    {
      name: "Pro",
      price: "20k",
    }
  ]

  return (
    <div >
      <div className="">
        <div className="  backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-lg dark:shadow-[rgb(123,87,224)]">
          <div className="grid md:grid-cols-3  max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.recommended 
                    ? 'border-0 shadow-2xl  z-20 scale-105 bg-white dark:bg-black/80' 
                    : 'border-none  '
                }`}
              >
                {plan.recommended && (
                  <Badge 
                    className="absolute -top-3 left-4 bg-[rgb(123,87,224)] text-white z-10"
                  >
                    SELECTED
                  </Badge>
                )}
                
                <CardHeader className="flex-1 flex flex-col items-start space-y-4 relative z-10 p-6">
                  <h3 className={`text-2xl font-semibold ${plan.recommended ? 'text-[rgb(123,87,224)]' : 'text-gray-800 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className={`w-full flex flex-col ${plan.recommended ? 'text-[rgb(123,87,224)]' : 'text-gray-800 dark:text-white'}`}>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">₹</span>
                      <span className="text-5xl font-bold">{plan.price}</span>
                    </div>
                    <p className={`mt-4 text-sm ${plan.recommended ? 'text-[rgb(123,87,224)]' : 'text-gray-600 dark:text-gray-300'}`}>
                      {plan.name === "Basic" && "Perfect for individuals or small teams just starting out."}
                      {plan.name === "Intermediate" && "Ideal for growing businesses with more advanced needs."}
                      {plan.name === "Pro" && "Best for large enterprises requiring premium features and support."}
                    </p>
                  </div>
                </CardHeader>
{/*                 
                {plan.savings && (
                  <div className="px-6 py-2 bg-[rgb(237,233,254)] dark:bg-[rgb(76,29,149)] text-[rgb(123,87,224)] dark:text-[rgb(237,233,254)] text-sm text-center">
                    ({plan.savings})
                  </div>
                )}
                 */}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

