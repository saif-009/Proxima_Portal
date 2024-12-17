'use client'
 
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  const [progress, setProgress] = useState(75)
 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0  overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <DialogTitle className="text-2xl font-bold">Campaign Review</DialogTitle>
            <p className="text-purple-100">You're almost there! Review your campaign details below.</p>
          </DialogHeader>
          <div className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className='flex flex-col justify-between gap-4'>
              <Card className="shadow-lg">
                <CardHeader className="">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle className="text-green-500" />
                    Campaign Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <dl className="space-y-4">
                    {[
                      { icon: Tag, label: "Plan", value: campaignData.plan },
                      { icon: ShoppingBag, label: "Brand", value: campaignData.brand },
                      { icon: Package, label: "Categories", value: campaignData.categories.join(", ") },
                      { icon: Package, label: "Products", value: campaignData.products.join(", ") },
                      { icon: MapPin, label: "Location", value: campaignData.location },
                      { icon: Tag, label: "Reference Number", value: campaignData.referenceNumber },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <item.icon className="w-5 h-5 text-purple-500 mt-1" />
                        <div>
                          <dt className="font-medium text-gray-200">{item.label}</dt>
                          <dd className="text-gray-500">{item.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                  <CardHeader className="">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <DollarSign className="text-green-500" />
                      Invoice Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <table className="w-full">
                      <tbody>
                        {[
                          { label: "Campaign Cost", value: "₹ 1000.00" },
                          { label: "Tax (10%)", value: "₹ 100.00" },
                          { label: "Total", value: "₹ 1100.00", isTotal: true },
                        ].map((item, index) => (
                          <tr key={index} className={item.isTotal ? "font-bold text-lg" : ""}>
                            <td className="py-2">{item.label}</td>
                            <td className="text-right py-2">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                </div>
              <div className="">
                
                <Card className="shadow-lg overflow-hidden h-full">
                  <CardHeader className="">
                    <CardTitle className="text-xl">Campaign Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ExistingComponent />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" onClick={onClose}>
                Go Back
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                Launch Campaign
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}