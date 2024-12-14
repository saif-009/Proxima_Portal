import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"

interface ReferenceNumberProps {
  referenceNumber: string
  setReferenceNumber: (referenceNumber: string) => void
}

export default function ReferenceNumber({ referenceNumber, setReferenceNumber }: ReferenceNumberProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Enter Reference Number</h2>
      <div className="space-y-2 max-w-xs">
        <Label htmlFor="reference-number">Reference Number</Label>
        <Input
          id="reference-number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="Enter reference number"
        />
      </div>
    </div>
  )
}

