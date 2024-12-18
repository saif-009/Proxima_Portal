import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Tags from './Tags'
import Steps from './steps'

interface PlanSelectionProps {
  selectedPlan: string
  step: number
  setSelectedPlan: (plan: string) => void
}

export default function PlanSelection({
  selectedPlan,
  setSelectedPlan,
  step,
}: PlanSelectionProps) {
  const plans = [
    {
      name: 'Basic',
      price: 3500,
      platforms: ['Google', 'Meta'],
      disabled: true,
      tooltip: {
        duration: '3 Months',
        totalLeads: '143 Expected',
        avgCPL: '₹189',
        totalImpressions: '32,500',
        avgCTR: '4.42%',
        conversionRate: '13.5%'
      }
    },
    {
      name: 'Intermediate',
      price: 7500,
      platforms: ['Google', 'Meta'],
      disabled: false,
      tooltip: {
        duration: '3 Months',
        totalLeads: '286 Expected',
        avgCPL: '₹178',
        totalImpressions: '65,000',
        avgCTR: '4.85%',
        conversionRate: '15.2%'
      }
    },
    {
      name: 'Pro',
      price: 27500,
      platforms: ['Google', 'Meta'],
      disabled: true,
      tooltip: {
        duration: '3 Months',
        totalLeads: '858 Expected',
        avgCPL: '₹165',
        totalImpressions: '195,000',
        avgCTR: '5.20%',
        conversionRate: '16.8%'
      }
    },
  ]

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className="md:text-2xl text-lg font-semibold mb-4">
          Select a Plan 
        </h2>
        <Steps step={step} />
      </div>
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <label
              key={plan.name}
              htmlFor={plan.name}
              className="cursor-pointer"
              title={
                plan.disabled
                  ? 'This plan is currently unavailable'
                  : 'Click to select this plan'
              }
            >
              <Card
                className={`${
                  plan.disabled ? 'opacity-50' : ''
                } transition-all hover:shadow-lg gap-3 flex flex-col ${
                  selectedPlan === plan.name ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="p-2 flex justify-between items-center">
                  <RadioGroupItem
                    value={plan.name}
                    id={plan.name}
                    disabled={plan.disabled}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="w-52">
                        <div className="space-y-1 text-xs">
                          <p>Duration: {plan.tooltip.duration}</p>
                          <p>Total Leads: {plan.tooltip.totalLeads}</p>
                          <p>Average CPL: {plan.tooltip.avgCPL}</p>
                          <p>Total Impressions: {plan.tooltip.totalImpressions}</p>
                          <p>Average CTR: {plan.tooltip.avgCTR}</p>
                          <p>Conversion Rate: {plan.tooltip.conversionRate}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>INR {plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2">
                    {/* Platform logos can be added here if needed */}
                  </div>
                  <Tags />
                </CardContent>
              </Card>
            </label>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-4 text-sm text-muted-foreground">
        Please select a plan to continue. Currently, only the Intermediate plan
        is available.
      </div>
    </div>
  )
}