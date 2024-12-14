import { Checkbox } from "../../../../../../components/ui/checkbox"
import { Label } from "../../../../../../components/ui/label"

interface ProductSelectionProps {
  selectedBrand: string
  selectedProducts: string[]
  setSelectedProducts: (products: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

export default function ProductSelection({
  selectedBrand,
  selectedProducts,
  setSelectedProducts,
  selectedCategories,
  setSelectedCategories
}: ProductSelectionProps) {
  const productCategories: Record<string, string[]> = {
    'Naturamore': ['Category A', 'Category B'],
    'Clean & More': ['Category C', 'Category D'],
    'Herb & More': ['Category E', 'Category F']
  }

  const products: Record<string, string[]> = {
    'Category A': ['Product 1', 'Product 2', 'Product 3'],
    'Category B': ['Product 4', 'Product 5', 'Product 6'],
    'Category C': ['Product 7', 'Product 8', 'Product 9'],
    'Category D': ['Product 10', 'Product 11', 'Product 12'],
    'Category E': ['Product 13', 'Product 14', 'Product 15'],
    'Category F': ['Product 16', 'Product 17', 'Product 18']
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    )
  }

  const handleProductChange = (product: string) => {
    setSelectedProducts(
      selectedProducts.includes(product)
        ? selectedProducts.filter(p => p !== product)
        : [...selectedProducts, product]
    )
  }

  if (!selectedBrand || !productCategories[selectedBrand]) {
    return <div>Please select a brand first.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Select Products</h2>
      {productCategories[selectedBrand].map((category) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center space-x-2 p-2 border rounded hover:bg-accent transition-colors">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
              className="border-[rgb(123,87,224)] data-[state=checked]:bg-[rgb(123,87,224)] focus:ring-[rgb(123,87,224)]"
            />
            <Label htmlFor={`category-${category}`} className="text-lg font-semibold cursor-pointer">{category}</Label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ml-6">
            {products[category].map((product) => (
              <div key={product} className="flex items-center space-x-2 p-2 border rounded hover:bg-accent transition-colors">
                <Checkbox
                  id={product}
                  checked={selectedProducts.includes(product)}
                  onCheckedChange={() => handleProductChange(product)}
                  className="border-[rgb(123,87,224)] data-[state=checked]:bg-[rgb(123,87,224)]  focus:ring-[rgb(123,87,224)]"
                />
                <Label htmlFor={product} className="flex-grow cursor-pointer">{product}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
