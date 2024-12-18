'use client'
import React, { useState } from 'react'
import { Button } from '../../../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card'
import { Input } from '../../../../../../components/ui/input'
import { Label } from '../../../../../../components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../../../components/ui/tooltip'
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Download,
  HelpCircle,
  Pencil,
  Search,
  X,
} from 'lucide-react'

export default function BillingAndSubscription() {
  const [isEditing, setIsEditing] = useState(false)
  const [businessDetails, setBusinessDetails] = useState({
    name: 'Acme Corporation',
    gstNumber: '29ABCDE1234F1Z5',
    address: '123 Business Street, Cityville, State 12345',
  })
  const [tempBusinessDetails, setTempBusinessDetails] = useState({
    ...businessDetails,
  })

  const handleEdit = () => {
    setIsEditing(true)
    setTempBusinessDetails({ ...businessDetails })
  }

  const handleSave = () => {
    setBusinessDetails({ ...tempBusinessDetails })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempBusinessDetails({ ...businessDetails })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempBusinessDetails({
      ...tempBusinessDetails,
      [e.target.id]: e.target.value,
    })
  }

  interface StatusProps {
    status: 'Pending' | 'Paid' | 'Cancel'
  }

  const StatusIndicator = ({ status }: StatusProps) => {
    const getStatusColor = () => {
      switch (status) {
        case 'Pending':
          return 'bg-yellow-400'
        case 'Paid':
          return 'bg-green-400'
        case 'Cancel':
          return 'bg-red-400'
        default:
          return 'bg-gray-400'
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <span className={`h-2 w-2 rounded-full ${getStatusColor()}`} />
        <span>{status}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8  overflow-auto">
      {/* Header Section */}
      <header className="text-left">
        <h1 className="text-xl font-bold mb-2">Subscription Management</h1>
        <p className="text-muted-foreground">
          Manage your subscription plans, billing details, and payment methods.
        </p>
      </header>

      {/* Current Plan Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-light text-lg ">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#DA5946] to-[#864D8E] inline-block text-transparent bg-clip-text">
              Pro Plan
            </h3>
            <p className="text-muted-foreground">
              Unlimited campaigns, Advanced analytics
            </p>
          </div>
          <div>
            <p className="mt-4 font-light">Renews On: 1 Jan 2024</p>
            <p className="font-bold bg-gradient-to-r from-[#DA5946] to-[#864D8E] inline-block text-transparent bg-clip-text">
              ₹5000/month
            </p>
          </div>
          {/* <Button className="bg-gradient-to-r from-[#DA5946] to-[#864D8E] text-white">
            Upgrade Plan
          </Button> */}
        </CardContent>
      </Card>

      {/* Billing Information Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6"> */}
      {/* Business Details */}
      {/* <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Business Details</h3>
              {!isEditing && (
                <Button
                  variant="outline"
                  className="bg-[#383838] dark:text-white"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  value={
                    isEditing ? tempBusinessDetails.name : businessDetails.name
                  }
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={
                    isEditing
                      ? tempBusinessDetails.gstNumber
                      : businessDetails.gstNumber
                  }
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={
                  isEditing
                    ? tempBusinessDetails.address
                    : businessDetails.address
                }
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            {isEditing && (
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div> */}

      {/* Payment Methods */}
      {/* <div className="space-y-4 bg-[]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Payment Methods</h3>
              <Button
                variant="outline"
                className="dark:bg-[#383838] dark:text-white"
              >
                Add New Payment Method
              </Button>
            </div>
            <div className="flex dark:bg-[#252525] justify-between items-center space-x-4 p-4 border rounded-md ">
              <div className="1 ">
                <div>
                  <div className="flex">
                    <p className="font-medium">Visa ending in 1234</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-baseline pt-1 px-1"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Default payment method</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground pt-0">
                    Expires 12/2024
                  </p>
                </div>
              </div>
              <div className="2 text-red-400 dark:bg-[#383838] rounded-md">
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div> */}

      {/* Billing Address */}
      {/* <div className="space-y-4  p-3 rounded-sm">
            <h3 className="text-lg font-semibold">Billing Address</h3>
            <div className="grid gap-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                defaultValue="456 Billing Avenue, Invoicetown, State 67890"
              />
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Billing History Section */}
      <Card className="">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices" className="pl-8" />
            </div>
          </div>
          <Table className="rounded-lg w-full">
            <TableHeader>
              <TableRow className=" dark:bg-[#383838]">
                <TableHead className=" w-1/3">Month</TableHead>
                <TableHead className="w-1/3">Type</TableHead>
                <TableHead className=" w-1/3">
                  Amount (GST Incl)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* January Entries */}
              <TableRow>
                <TableCell className="w-1/3">January</TableCell>
                <TableCell className="w-1/3">
                  Campaign <br />
                  <span className="text-gray-400">(intermediate)</span>
                </TableCell>
                <TableCell className="w-1/3">₹8,850.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/3">January</TableCell>
                <TableCell className="w-1/3">Subscription</TableCell>
                <TableCell className="w-1/3">₹2,950.00</TableCell>
              </TableRow>

              {/* February Entries */}
              <TableRow>
                <TableCell className="w-1/3">February</TableCell>
                <TableCell className="w-1/3">
                  Campaign <br />
                  <span className="text-gray-400">(intermediate)</span>
                </TableCell>
                <TableCell className="w-1/3">₹8,850.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/3">February</TableCell>
                <TableCell className="w-1/3">Subscription</TableCell>
                <TableCell className="w-1/3">₹2,950.00</TableCell>
              </TableRow>

              {/* March Entries */}
              <TableRow>
                <TableCell className="w-1/3">March</TableCell>
                <TableCell className="w-1/3">
                  Campaign <br />
                  <span className="text-gray-400">(intermediate)</span>
                </TableCell>
                <TableCell className="w-1/3">₹8,850.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/3">March</TableCell>
                <TableCell className="w-1/3">Subscription</TableCell>
                <TableCell className="w-1/3">₹2,950.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Help Icon */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="m-4">
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-4 right-4 rounded-full"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help? Click here to contact support.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
