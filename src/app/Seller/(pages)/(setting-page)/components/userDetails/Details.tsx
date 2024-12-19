// @ts-nocheck

'use client'

import { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../../../../components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../../../../../../components/ui/input-otp'

import { Label } from '../../../../../../components/ui/label'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import { Switch } from '../../../../../../components/ui/switch'
import { Bell, Check } from 'lucide-react'
import { settingsContext } from '../../../../../../../context/settingContext'
import Axios from '../../../../../../../Axios/Axios'
import SetPasswordDialog from './setpassword/SetPassword'
import { fail } from 'assert'
import { useToast } from '../../../../../../../hooks/use-toast'
import Image from 'next/image'

export default function Details({ userData }: any) {
  const { getUserDetails } = useContext<any>(settingsContext)
  const [editMode, setEditMode] = useState<any>({
    personal: false,
    business: false,
    notifications: false,
  })
 
  const [formData, setFormData] = useState({
    personal: {
      name: '',
      reference: '',
      phone: '',
    },
    business: {
      businessName: '',
      businessType: '',
      gst: '',
      pan: '',
      // logo: "",
    },
    notifications: {
      emailNotifications: false,
      googleSpreadsheetUpdates: false,
      smsAlerts: false,
      weeklyReport: false,
    },
  })

  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [otp, setOtp] = useState('')
  const [loadSendOTP, setLoadSendOTP] = useState(false)
  const [loadVerifyOTP, setLoadVerifyOTP] = useState(false)
  const { toast } = useToast()
  const [logo, setLogo] = useState<any>(null)
  const [preview, setPreview] = useState<any>('')
  const [loadSaveUser, setLoadSaveUser] = useState(false)

  useEffect(() => {
    if (userData) {
      setFormData({
        personal: {
          name: userData?.name || '',
          reference: '123456',
          phone: userData?.mobile || '',
        },
        business: {
          businessName: userData?.businessName || '',
          businessType: userData.businessType || '',
          gst: userData?.gstNumber || '',
          pan: userData?.panNumber || '',
          // logo: userData?.logo || "",
        },
        notifications: {
          emailNotifications: userData?.emailNotification
            ? JSON.parse(userData.emailNotification)
            : false, // Example based on available data
          googleSpreadsheetUpdates: userData?.googleSheetUpdate
            ? JSON.parse(userData?.googleSheetUpdate)
            : false, // Example based on available data
          smsAlerts: userData?.smsAlert
            ? JSON.parse(userData?.smsAlert)
            : false, // Example based on available data
          weeklyReport: userData?.weeklyReport
            ? JSON.parse(userData?.weeklyReport)
            : false, // Example based on available data
        },
      })
    }
  }, [userData])

  console.log('logo', logo)

  const onCompleteProfile = async (body: any, tab: any) => {
    setLoadSaveUser(true)
    try {
      const res = await Axios.post('/complete-profile', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status === 200 && res?.data?.valid) {
        setEditMode((prev: any) => ({ ...prev, [tab]: !prev[tab] }))
        getUserDetails()
        toast({
          title: 'Success',
          description: res?.data?.message
            ? res?.data?.message
            : `${tab} data saved`,
        })
        // getUserProfileData()
      } else {
        toast({
          title: 'Error',
          description: res?.data?.message ? res?.data?.message : `Server error`,
        })
        // seApiError(res?.data?.message);
      }
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Error',
        description: `Server error`,
      })
    } finally {
      setLoadSaveUser(false)
    }
  }

  const handleInputChange = (
    tab: 'personal' | 'business' | 'notifications',
    field: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }))
  }

  const handleSendOTP = () => {
    // setIsVerifyDialogOpen(true)
    sendOtpEmail()
    // Here you would typically send an OTP to the user's email
  }

  const sendOtpEmail = async () => {
    setLoadSendOTP(true)
    setApiError('')
    const body = { email: formData?.personal?.email }
    try {
      const res = await Axios.post('/generate-email-otp', body)
      if (res.status === 200 && res?.data?.valid) {
        setIsVerifyDialogOpen(true)
        toast({
          title: 'Success',
          description: res?.data?.message
            ? res?.data?.message
            : 'OTP sent to your email',
        })
      } else {
        toast({
          title: 'Error',
          description: res?.data?.message
            ? res?.data?.message
            : 'Server error, Try again later',
        })
        setApiError(
          res?.data?.message
            ? res?.data?.message
            : 'Server error, Try again later',
        )
        setIsVerifyDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Server error, Try again later',
      })
      setApiError('Server error, Try again later')
      setIsVerifyDialogOpen(false)
    } finally {
      setLoadSendOTP(false)
    }
  }

  const VerifyEmailByOTP = async () => {
    setApiError('')
    setLoadVerifyOTP(true)
    try {
      const res = await Axios.post('/verify-email-otp', {
        email: formData?.personal?.email,
        code: otp,
      })
      if (res.status === 200 && res?.data?.valid) {
        getUserDetails()
        setIsVerifyDialogOpen(false)

        toast({
          title: 'Success',
          description: res?.data?.message
            ? res?.data?.message
            : 'OTP verify successfully',
        })
      } else {
        setApiError(
          res?.data?.message
            ? res?.data?.message
            : 'Server error, Try again later',
        )
        toast({
          title: 'Error',
          description: res?.data?.message
            ? res?.data?.message
            : 'Server error, Try again later',
        })
      }
    } catch (error) {
      setApiError('Server error, Try again later')
      toast({
        title: 'Error',
        description: 'Server error, Try again later',
      })
    } finally {
      setLoadVerifyOTP(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="grid gap-2 ">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter Name"
                onChange={(e) =>
                  handleInputChange('personal', 'name', e.target.value)
                }
                value={formData.personal.name}
                disabled={!editMode.personal}
                className="dark:bg-[#323232]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                onChange={(e) =>
                  handleInputChange('personal', 'phone', e.target.value)
                }
                value={formData.personal.phone}
                placeholder="Enter Phone Number"
                disabled={!editMode.personal}
                className="dark:bg-[#323232]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Reference Number</Label>
              <Input
                id="phone"
                onChange={(e) =>
                  handleInputChange('personal', 'phone', e.target.value)
                }
                value={formData.personal.reference}
                placeholder="Enter Phone Number"
                disabled={!editMode.personal}
                className="dark:bg-[#323232]"
              />
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Please enter the 6-digit OTP sent to your email.
            </p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {apiError?.length > 0 && (
              <p className="mt-1 text-red-600 text-sm">
                {apiError?.length > 0 ? apiError : ''}
              </p>
            )}
            <p>
              <Button
                disabled={loadSendOTP ? true : false}
                className="p-0 m-0"
                onClick={handleSendOTP}
                variant="link"
              >
                {loadSendOTP ? 'Resend OTP...' : 'Resend OTP'}{' '}
              </Button>
            </p>
          </div>
          <DialogFooter>
            <Button
              className="dark:bg-[#383838] dark:text-white"
              disabled={loadVerifyOTP ? true : false}
              onClick={VerifyEmailByOTP}
            >
              {loadVerifyOTP ? 'Verify...' : 'Verify'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <SetPasswordDialog passApiError={passApiError} setPassApiError={setPassApiError} loadPassword={loadPassword} setLoadPassword={setLoadPassword} isOpen={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}  /> */}
      {/* <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.personal.currentPassword ? 'Change Password' : 'Set Password'}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={formData.personal.newPassword}
                onChange={(e) => handleInputChange('personal', 'newPassword', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={formData.personal.confirmPassword}
                onChange={(e) => handleInputChange('personal', 'confirmPassword', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmPassword}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </Card>
  )
}
