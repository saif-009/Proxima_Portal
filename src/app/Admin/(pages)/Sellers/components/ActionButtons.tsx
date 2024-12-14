// components/workspace/ActionButtons.tsx

import { Button } from "../../../../../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog"
import { Plus, Upload } from "lucide-react"


interface ActionButtonsInterface{
    handleAddPartner: (data: any) => void;
    handleBulkUpload: (file:any) => void;
}

export const ActionButtons:React.FC<ActionButtonsInterface> = ({ handleAddPartner, handleBulkUpload }) => {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#262626] border border-gray-200/20  text-gray-100 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Partner
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
          </DialogHeader>
          <Button
            onClick={() => handleAddPartner({})}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add Partner
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#262626] border border-gray-200/20  text-gray-100 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Bulk Upload Partners</DialogTitle>
          </DialogHeader>
          <Button
            onClick={() => handleBulkUpload({})}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Upload
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}