import { RadioGroup, RadioGroupItem } from "../../../../../../components/ui/radio-group"
import { Label } from "../../../../../../components/ui/label"

interface BrandSelectionProps {
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
}

export default function BrandSelection({ selectedBrand, setSelectedBrand }: BrandSelectionProps) {
  const brands = ['Naturamore', 'Clean & More', 'Herb & More']

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Select a Brand</h2>
      <RadioGroup value={selectedBrand} onValueChange={setSelectedBrand} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent transition-colors">
            <RadioGroupItem value={brand} id={brand} />
            <Label htmlFor={brand} className="flex-grow cursor-pointer">{brand}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

