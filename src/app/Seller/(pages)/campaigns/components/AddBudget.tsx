import { Button } from "../../../../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { useState } from "react"



export default function AddCampaignBudget({campaign, updateCampaign}:any) {
    const [newBudget, setNewBudget] = useState<any>("")
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      updateCampaign(campaign.id, {
        budget: parseFloat(newBudget),
      })
    }

    
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 text-xs mx-0 p-1">
            Add Budget
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adjust Budget</DialogTitle>
            <DialogDescription>
              Make changes to your campaign budget here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }