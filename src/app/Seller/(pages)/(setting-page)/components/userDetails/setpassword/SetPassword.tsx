// @ts-nocheck
"use client"

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "../../../../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../../../components/ui/dialog"
import { Input } from "../../../../../../../../components/ui/input"
import { Label } from "../../../../../../../../components/ui/label"
import Axios from '../../../../../../../../Axios/Axios'
import { useToast } from '../../../../../../../../hooks/use-toast'

interface PasswordDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newPassword: string) => void
  currentPassword?: string
}

export default function SetPasswordDialog({ currentPass, passwordUpdatedAt, getUserDetails}: any) {

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [error, setError] = useState('')
  const [passApiError, setPassApiError] = useState("")
  const [loadPassword, setLoadPassword] = useState(false)
  const { toast } = useToast()

  const handleConfirmPassword = () => {
    setError("")
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length <= 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    onSetPassword(newPassword)
  
  }

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const handleSetPassword = () => {
    setIsPasswordDialogOpen(true)
  }


  const onSetPassword = async (password:any)=>{
    setPassApiError("")
    setLoadPassword(true)
    try {
      const res = await Axios.post("/reset-password", {password:password})
      
      if(res.status===200 && res?.data?.valid){

        toast({
          title: "Success",
          description:res?.data?.message?res?.data?.message:'Password saved',
        })
        setIsPasswordDialogOpen(false)
        setError('')
        setNewPassword('')
        setConfirmPassword('')
        getUserDetails()
       }else{
         setPassApiError(res?.data?.message)
         toast({
          title: "Success",
          description:res?.data?.message?res?.data?.message:'Server error',
        })
       }
     
    } catch (error) {
     setPassApiError("Server error")
    }finally{
     setLoadPassword(false)
    }
}

console.log("Change Password", passwordUpdatedAt)

  return (
    <>
     <div className="text-start">
                  <Button onClick={handleSetPassword} className='dark:bg-[#383838] dark:text-white'>
                    {(passwordUpdatedAt?.length>0) ?'Change Password':'Set Password'}
                  </Button>
                </div>

                <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{passwordUpdatedAt !== null ? 'Change Password' : 'Set Password'}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {setNewPassword(e.target.value); setError("")}}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value); setError("")}}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button disabled={loadPassword?true:false} onClick={handleConfirmPassword}>{loadPassword?'Confirm...':'Confirm'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
   
  )
}