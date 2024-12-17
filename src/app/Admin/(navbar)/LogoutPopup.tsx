'use client'

import { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog'
import Cookies from 'js-cookie'
import { HelpCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutPopup({ isCollapsed }: any) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

const handleLogout = async () => {
  console.log('tapping to logout')
  try {
    Cookies.remove('admin_token')
    console.log('Token removed')
    localStorage.removeItem('dateRangeOption')
    localStorage.removeItem('dateRange')
    console.log('Local storage items removed')
    setOpen(false)
    
    // Remove the window.location.reload() and await the router push
    await router.push('/')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm text-red-500 ${
            isCollapsed ? 'p-0' : ''
          }`}
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
          {!isCollapsed && 'Logout'}
        </Button>
      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You&apos;ll need to log in again
            to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
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
