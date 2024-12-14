//@ts-nocheck
'use client'

import React, { useState } from 'react'
import {
  BarChart as BarChartIcon,
  Flag,
  MousePointer,
  DollarSign,
  ShoppingCart,
  Menu,
  Bell,
  Settings,
  HelpCircle,
  Package2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LaunchCampaign from './launchCampaign'

const purchaseData = [
  { date: '16 Oct', purchases: 10 },
  { date: '17 Oct', purchases: 15 },
  { date: '18 Oct', purchases: 20 },
  { date: '19 Oct', purchases: 25 },
  { date: '20 Oct', purchases: 22 },
  { date: '21 Oct', purchases: 30 },
  { date: '22 Oct', purchases: 28 },
]

const channelData = [
  { name: 'Facebook', value: 400 },
  { name: 'Google', value: 300 },
  { name: 'Instagram', value: 300 },
]

const productData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
]

const activeCampaigns = [
  {
    id: 1,
    name: 'Refreshing Cola Blast',
    spends: 5000,
    purchases: 120,
    costPerPurchase: 41.67,
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Crispy Potato Chips',
    spends: 3500,
    purchases: 85,
    costPerPurchase: 41.18,
    startDate: '2023-07-15',
    endDate: '2023-08-15',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Creamy Yogurt Delight',
    spends: 4200,
    purchases: 95,
    costPerPurchase: 44.21,
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Instant Noodle Magic',
    spends: 6000,
    purchases: 150,
    costPerPurchase: 40.0,
    startDate: '2023-11-15',
    endDate: '2023-12-31',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Fresh Fruit Juice',
    spends: 4800,
    purchases: 110,
    costPerPurchase: 43.64,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    status: 'Active',
  },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const DashboardContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Purchases
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">298</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Live Campaigns
            </CardTitle>
            <Flag className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-gray-500">+2 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Spend
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹ 3,14,577</div>
            <p className="text-xs text-gray-500">65% of budget used</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Cost per Purchase
            </CardTitle>
            <MousePointer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹ 1,055.63</div>
            <p className="text-xs text-gray-500">-3.2% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-600">
              Purchase over time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="purchases" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-600">
              Purchase Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="channel">
              <TabsList className="mb-4">
                <TabsTrigger value="channel" className="text-purple-600">
                  By Channel
                </TabsTrigger>
                <TabsTrigger value="product" className="text-purple-600">
                  By Product
                </TabsTrigger>
              </TabsList>
              <TabsContent value="channel">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="product">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-600">
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-purple-600">Campaign Name</TableHead>
                <TableHead className="text-purple-600">Spends</TableHead>
                <TableHead className="text-purple-600">Purchases</TableHead>
                <TableHead className="text-purple-600">Cost per Purchase</TableHead>
                <TableHead className="text-purple-600">Start Date</TableHead>
                <TableHead className="text-purple-600">End Date</TableHead>
                <TableHead className="text-purple-600">Status</TableHead>
                <TableHead className="text-purple-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-purple-50">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>₹ {campaign.spends.toLocaleString()}</TableCell>
                  <TableCell>{campaign.purchases}</TableCell>
                  <TableCell>₹ {campaign.costPerPurchase.toFixed(2)}</TableCell>
                  <TableCell>{campaign.startDate}</TableCell>
                  <TableCell>{campaign.endDate}</TableCell>
                  <TableCell>
                    <Button
                      variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                      className={campaign.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}
                    >
                      {campaign.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={campaign.status === 'Active'}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard'
      case 'launch-ad': return 'Launch Ad Campaign'
      case 'campaigns': return 'Campaigns'
      case 'settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="flex items-center justify-between h-16 px-4 border-b bg-purple-600">
          <div className="flex items-center gap-2 font-semibold text-white">
            <Package2 className="h-6 w-6" />
            <span className="text-xl">LeapX</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-purple-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 text-left hover:bg-purple-100 hover:text-purple-600 ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-600' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChartIcon className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 text-left hover:bg-purple-100 hover:text-purple-600 
              ${activeTab === 'launch-ad' ? 'bg-purple-100 text-purple-600' : ''}`}
            onClick={() => setActiveTab('launch-ad')}
          >
            <Flag className="mr-2 h-4 w-4" /> Launch Ad
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 text-left hover:bg-purple-100 hover:text-purple-600 
              ${activeTab === 'campaigns' ? 'bg-purple-100 text-purple-600' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            <BarChartIcon className="mr-2 h-4 w-4" /> Campaigns
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 text-left hover:bg-purple-100 hover:text-purple-600 
              ${activeTab === 'settings' ? 'bg-purple-100 text-purple-600' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start mb-4 text-left hover:bg-purple-100 hover:text-purple-600"
          >
            <HelpCircle className="mr-2 h-4 w-4" /> Help
          </Button>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Vishal Kumar" />
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Vishal Kumar</p>
              <p className="text-xs text-gray-500">vishal@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2 hover:bg-purple-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-purple-600">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-purple-600 hover:bg-purple-100"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Vishal Kumar" />
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === 'launch-ad' ? (
            <LaunchCampaign />
          ) : activeTab === 'dashboard' ? (
            <DashboardContent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Content coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}