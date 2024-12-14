import { Button } from '../../../../../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { useState } from "react"


export default function EditCampaignSettings({campaign,updateCampaign,}:any) {
    const [newName, setNewName] = useState(campaign.name)
    const [newPlatform, setNewPlatform] = useState(campaign.platform)
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      updateCampaign(campaign.id, {
        name: newName,
        platform: newPlatform,
      })
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 text-xs mx-0 p-1">
            Edit Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign Settings</DialogTitle>
            <DialogDescription>
              Make changes to your campaign settings here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="platform" className="text-right">
                  Platform
                </Label>
                <Input
                  id="platform"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
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