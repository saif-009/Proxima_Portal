'use client'

import { useState } from 'react'
import { Button } from "../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog"
import Cookies from 'js-cookie'
import {  LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutPopup({isCollapsed}:any) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    localStorage.removeItem('dateRangeOption');
    localStorage.removeItem('dateRange');
    setOpen(false)
    router.push('/login')
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`w-full justify-start dark:text-gray-200 text-gray-800 ${isCollapsed ? 'p-0' : ''}`}>
          <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
          {!isCollapsed && "Logout"}
        </Button>
        {/* <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You&apos;ll need to log in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}