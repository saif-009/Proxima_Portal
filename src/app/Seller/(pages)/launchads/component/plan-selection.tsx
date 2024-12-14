import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../../../../components/ui/radio-group"
import { Info } from 'lucide-react'
import Tags from "./Tags"

interface PlanSelectionProps {
  selectedPlan: string
  setSelectedPlan: (plan: string) => void
}

export default function PlanSelection({ selectedPlan, setSelectedPlan }: PlanSelectionProps) {
  // Set default selected plan to 'Intermediate'
  const defaultPlan = 'Intermediate';

  const plans = [
    { name: 'Basic', price: 3500, platforms: ['Google', 'Meta'], disabled: true },
    { name: 'Intermediate', price: 7500, platforms: ['Google', 'Meta'], disabled: false },
    { name: 'Pro', price: 27500, platforms: ['Google', 'Meta'], disabled: true },
  ]

  return (
    <div>
      <h2 className="md:text-2xl text-lg font-semibold mb-4">Select a Plan</h2>
      <RadioGroup value={selectedPlan || defaultPlan} onValueChange={setSelectedPlan}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
	  {plans.map((plan) => (
            <label key={plan.name} htmlFor={plan.name} className="cursor-pointer">
		
              <Card
                className={`${plan.disabled ? 'opacity-50' : ''} transition-all hover:shadow-lg gap-3 flex flex-col ${
                  selectedPlan || defaultPlan === plan.name ? 'ring-2 ring-primary' : ''
                }`}
              >
	      <div className="p-2 flex justify-between items-center">
	      <RadioGroupItem
                    value={plan.name}
                    id={plan.name}
                    disabled={plan.disabled}
                    // Hides the actual radio input
                  />
		   <Info className="h-4 w-4 text-muted-foreground cursor-help" />
		</div>
		
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {plan.name}
                   
                  </CardTitle>
                  <CardDescription>INR {plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2">
                    {/* Uncomment if platform logos are needed */}
                    {/* {plan.platforms.map((platform) => (
                      <Image
                        key={platform}
                        src={`/${platform.toLowerCase()}-logo.svg`}
                        alt={`${platform} logo`}
                        width={24}
                        height={24}
                      />
                    ))} */}
                  </div>
		  <Tags />
                  
                </CardContent>
	
		
              </Card>
            </label>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-4">
        
      </div>
    </div>
  )
}
