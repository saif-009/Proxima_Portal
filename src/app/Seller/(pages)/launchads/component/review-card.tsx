'use client'
 
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, DollarSign, MapPin, Package, ShoppingBag, Tag } from 'lucide-react'
 
interface ReviewCardProps {
  isOpen: boolean
  onClose: () => void
  campaignData: {
    plan: string
    brand: string
    products: string[]
    categories: string[]
    location: string
    referenceNumber: string
  }
  ExistingComponent: React.ComponentType<any>
}
 
export function ReviewCard({ isOpen, onClose, campaignData, ExistingComponent }: ReviewCardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[900px] p-0 h-[90vh] max-h-[900px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full overflow-hidden"
        >
          <DialogHeader className="p-4 sm:p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shrink-0">
            <DialogTitle className="text-xl sm:text-2xl font-bold">Campaign Review</DialogTitle>
            <p className="text-purple-100 text-sm sm:text-base">You're almost there! Review your campaign details below.</p>
          </DialogHeader>
          
          <div className="flex-grow overflow-auto">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className='flex flex-col justify-between gap-4'>
                  <Card className="shadow-lg">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <CheckCircle className="text-green-500" />
                        Campaign Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <dl className="space-y-2 sm:space-y-4">
                        {[
                          { icon: Tag, label: "Plan", value: campaignData.plan },
                          { icon: ShoppingBag, label: "Brand", value: campaignData.brand },
                          { icon: Package, label: "Categories", value: campaignData.categories.join(", ") },
                          { icon: Package, label: "Products", value: campaignData.products.join(", ") },
                          { icon: MapPin, label: "Location", value: campaignData.location },
                          { icon: Tag, label: "Reference Number", value: campaignData.referenceNumber },
                        ].map((item, index) => (
                          <div key={index} className="flex gap-2 sm:gap-3 items-start">
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1 shrink-0" />
                            <div>
                              <dt className="font-medium text-gray-200 text-sm sm:text-base">{item.label}</dt>
                              <dd className="text-gray-500 text-sm sm:text-base">{item.value}</dd>
                            </div>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <DollarSign className="text-green-500" />
                        Invoice Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <table className="w-full">
                        <tbody>
                          {[
                            { label: "Campaign Cost", value: "₹ 1000.00" },
                            { label: "Tax (10%)", value: "₹ 100.00" },
                            { label: "Total", value: "₹ 1100.00", isTotal: true },
                          ].map((item, index) => (
                            <tr key={index} className={item.isTotal ? "font-bold text-base sm:text-lg" : ""}>
                              <td className="py-1 sm:py-2 text-sm sm:text-base">{item.label}</td>
                              <td className="text-right py-1 sm:py-2 text-sm sm:text-base">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-full">
                  <Card className="shadow-lg overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg sm:text-xl">Campaign Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow overflow-auto">
                      <ExistingComponent />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 sm:p-6 border-t shrink-0">
            <Button variant="outline" onClick={onClose}>
              Go Back
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              Launch Campaign
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}