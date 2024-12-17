import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Label } from "../../../../../../components/ui/label"
import { Input } from "../../../../../../components/ui/input"
import { Button } from "../../../../../../components/ui/button"
import { Switch } from "../../../../../../components/ui/switch"
import { Bell, Check } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { settingsContext } from "../../../../../../../context/settingContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../../../components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../../../../components/ui/input-otp"
 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIzN2QyNzJkNDRlZTM4NTdkYWU3MmIiLCJpYXQiOjE3MjUyODIxNzUsImV4cCI6MTcyNTg4Njk3NX0.nWKzUB9NZj7yrQOrmC-Lp744kdPg6BicMbtd0l0xqkM"
 
export default function Details() {
  const [editMode, setEditMode] = useState({
    personal: false,
    business: false,
    notifications: false,
  })
 
  const { userData, getUserProfileData } = useContext<any>(settingsContext)
 
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      isEmailVerified: false,
    },
    business: {
      businessName: "",
      businessType: "",
      gst: "",
      pan: "",
      logo: "",
    },
    notifications: {
      emailNotifications: false,
      googleSpreadsheetUpdates: false,
      smsAlerts: false,
      weeklyReport: false,
    }
  })
 
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [otp, setOtp] = useState('')
 
  useEffect(() => {
    if (userData) {
      setFormData({
        personal: {
          name: userData?.user.name || "",
          email: userData?.user?.email || "",
          phone: userData?.user?.mobile || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          isEmailVerified: userData?.user?.isEmailVerified || false,
        },
        business: {
          businessName: userData?.user?.businessName || "",
          businessType: userData.businessType || "",
          gst: userData?.userData?.gst || "",
          pan: userData?.user?.pan_no || "",
          logo: userData?.logo || "",
        },
        notifications: {
          emailNotifications: true,
          googleSpreadsheetUpdates: true,
          smsAlerts: false,
          weeklyReport: true,
        }
      })
    }
  }, [userData])
 
  const handleAccountDetails = async (formData: any) => {
    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      }
 
      const res = await axios.post("/complete-profile", data, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        }
      });
 
      if (res.status === 200 && res.data.valid) {
        console.log("form submitted");
        getUserProfileData()
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error saving account details", error);
    }
  };
 
  const toggleEditMode = (tab: 'personal' | 'business' | 'notifications') => {
    setEditMode(prev => ({ ...prev, [tab]: !prev[tab] }))
  }
 
  const handleSave = (tab: 'personal' | 'business' | 'notifications') => {
    console.log(`Saving ${tab} details`)
    handleAccountDetails(formData[tab])
    toggleEditMode(tab)
  }
 
  const handleInputChange = (tab: 'personal' | 'business' | 'notifications', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value }
    }))
  }
 
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        business: {
          ...prev.business,
          logo: fileUrl,
        },
      }))
    }
  }
 
  const handleVerifyEmail = () => {
    setIsVerifyDialogOpen(true)
    // Here you would typically send an OTP to the user's email
  }
 
  const handleVerifyOtp = () => {
    // Here you would typically verify the OTP with your backend
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, isEmailVerified: true }
    }))
    setIsVerifyDialogOpen(false)
  }
 
  const handleSetPassword = () => {
    setIsPasswordDialogOpen(true)
  }
 
  const handleConfirmPassword = () => {
    if (formData.personal.newPassword === formData.personal.confirmPassword) {
      // Here you would typically update the password in your backend
      setIsPasswordDialogOpen(false)
      handleSave('personal')
    } else {
      alert("Passwords don't match")
    }
  }
 
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter Name" onChange={(e) => handleInputChange('personal', 'name', e.target.value)} value={formData.personal.name} disabled={!editMode.personal} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number (Verified)</Label>
                  <Input id="phone" onChange={(e) => handleInputChange('personal', 'phone', e.target.value)} value={formData.personal.phone} placeholder="Enter Phone Number" disabled />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    value={formData.personal.email}
                    placeholder="john.doe@example.com"
                    type="email"
                    disabled={!editMode.personal || formData.personal.isEmailVerified}
                  />
                  {!formData.personal.isEmailVerified ? (
                    <Button onClick={handleVerifyEmail} disabled={!editMode.personal}>Verify</Button>
                  ) : (
                    <Button className="border-green-500 text-green-500" disabled>
                      Verified <Check className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {formData.personal.isEmailVerified && (
                <div className="flex justify-end">
                  <Button onClick={handleSetPassword}>
                    {formData.personal.currentPassword ? 'Change Password' : 'Set Password'}
                  </Button>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                {editMode.personal ? (
                  <Button onClick={() => handleSave('personal')}>Save</Button>
                ) : (
                  <Button onClick={() => toggleEditMode('personal')}>Edit</Button>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="business">
            {/* Business details content (unchanged) */}
          </TabsContent>
          <TabsContent value="notifications">
            {/* Notifications content (unchanged) */}
          </TabsContent>
        </Tabs>
      </CardContent>
 
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Please enter the 6-digit OTP sent to your email.</p>
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
          </div>
          <DialogFooter>
            <Button onClick={handleVerifyOtp}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
 
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
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
      </Dialog>
    </Card>
  )
}
 