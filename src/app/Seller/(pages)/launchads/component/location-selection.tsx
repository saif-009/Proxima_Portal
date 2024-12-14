import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"

interface LocationAndReferenceInputProps {
  selectedLocation: string
  setSelectedLocation: (location: string) => void
  referenceNumber: string
  setReferenceNumber: (referenceNumber: string) => void
}

export default function LocationAndReferenceInput({
  selectedLocation,
  setSelectedLocation,
  referenceNumber,
  setReferenceNumber
}: LocationAndReferenceInputProps) {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']

  return (
    <div className=" flex flex-col md:flex-row gap-8 justify-between mb-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Select Location</h2>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="cursor-pointer hover:bg-accent transition-colors">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Enter Reference Number</h2>
        <div className="space-y-2 max-w-xs">
          {/* <Label htmlFor="reference-number">Reference Number</Label> */}
          <Input
            id="reference-number"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="Enter reference number"
          />
        </div>
      </div>
    </div>
  )
}

