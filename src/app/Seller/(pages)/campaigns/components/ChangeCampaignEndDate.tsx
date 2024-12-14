import { Button } from "../../../../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { useState } from "react"




export default function ChangeCampaignEndDate({campaign, updateCampaign,}:any) {
    const [newStartDate, setNewStartDate] = useState(campaign.startDate)
    const [newEndDate, setNewEndDate] = useState(campaign.endDate)
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      updateCampaign(campaign.id, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 text-xs mx-1 p-1">
            Change Schedule
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Schedule</DialogTitle>
            <DialogDescription>
              Adjust the start and end dates of your campaign.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
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