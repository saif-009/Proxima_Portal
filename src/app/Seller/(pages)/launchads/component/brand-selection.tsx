import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Steps from "./steps"
 
interface BrandSelectionProps {
  selectedBrand: string
  step: number
  setSelectedBrand: (brand: string) => void
}
 
interface Brand {
  name: string
  description: string
  image: string
}
 
export default function BrandSelection({ selectedBrand, setSelectedBrand,  step }: BrandSelectionProps) {
  const brands: Brand[] = [
    {
      name: 'Naturamore',
      description: 'Organic and natural products for a healthier lifestyle',
      image: '/images/naturamore.png'
    },
    {
      name: 'Clean & More',
      description: 'Eco-friendly cleaning solutions for your home',
      image: '/images/cleanmore.png'
    },
    {
      name: 'Herb & More',
      description: 'Premium herbal remedies and supplements',
      image: '/images/herbsmore.png'
    }
  ]
 
  return (
    <div className="space-y-6">
      <div className='flex justify-between'>
        <h2 className="md:text-2xl text-lg font-semibold mb-4">
          Select a Brand
        </h2>
        <Steps step={step} />
      </div>
      <RadioGroup value={selectedBrand} onValueChange={setSelectedBrand} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.name} className="overflow-hidden">
            <CardContent className="p-0">
              <Label
                htmlFor={brand.name}
                className="flex flex-col h-full cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <RadioGroupItem value={brand.name} id={brand.name} className="h-5 w-5 border-2 border-primary" />
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.description}</p>
                </div>
              </Label>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  )
}
 
 