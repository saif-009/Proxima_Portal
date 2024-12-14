import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../../../components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { Button } from "../../../../../../components/ui/button"

interface ReviewCardProps {
  isOpen: boolean
  onClose: () => void
  campaignData: {
    plan: string
    brand: string
    products: string[]
    categories: string[]
    location: string
    referenceNumber: string
  }
  ExistingComponent: React.ComponentType<any>
}

export function ReviewCard({ isOpen, onClose, campaignData, ExistingComponent }: ReviewCardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[900px] ">
        <DialogHeader>
          <DialogTitle>Campaign Review</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Options</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="font-semibold">Plan:</dt>
                  <dd>{campaignData.plan}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Brand:</dt>
                  <dd>{campaignData.brand}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Categories:</dt>
                  <dd>{campaignData.categories.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Products:</dt>
                  <dd>{campaignData.products.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Location:</dt>
                  <dd>{campaignData.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Reference Number:</dt>
                  <dd>{campaignData.referenceNumber}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Invoice</h3>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>Campaign Cost</td>
                      <td className="text-right">$1000.00</td>
                    </tr>
                    <tr>
                      <td>Tax (10%)</td>
                      <td className="text-right">$100.00</td>
                    </tr>
                    <tr className="font-bold">
                      <td>Total</td>
                      <td className="text-right">$1100.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <ExistingComponent />
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Launch</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

