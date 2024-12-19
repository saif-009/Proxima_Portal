'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../../../components/ui/card'
import { Progress } from '../../../../../components/ui/progress'
import { Toggle } from '../../../../../components/ui/toggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover'
import { Checkbox } from '../../../../../components/ui/checkbox'
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart2,
  Pencil,
  LayoutGrid,
  List as ListIcon,
  Image as ImageIcon,
  CloudFog,
} from 'lucide-react'
import { subDays, format } from 'date-fns'
import FormatNumber from '../../../../../components/FormatNumber'
import DateRangePicker from '../dashboard/components/daterangePicker'
import { useQuery } from '@tanstack/react-query'
import {
  fetchCampaignsData,
  fetchListCampaignsData,
  GoogleCampaignsAdGroupData,
} from './campaignsApi'
import CampaignGridViewSkeleton from '../../../../../utils/CampaignsGridViewSkelton'
import CampaignsListViewSkelton from '../../../../../utils/CampaignsListViewSkelton'
import AddCampaignBudget from './components/AddBudget'
import ChangeCampaignEndDate from './components/ChangeCampaignEndDate'
import EditCampaignSettings from './components/EditCampaignSettings'

import dynamic from 'next/dynamic'
import ListView2 from './components/listView/ListViewFinal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../../components/ui/tooltip'
import { Badge } from '../../../../../components/ui/badge'
import Metaicon from '../../../../../public/images/meta-icon.svg'
import Image from 'next/image'

// lazyload
const AdPreview = dynamic(() => import('./components/AdPreview'))

function getFormattedDate(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString)

  // Array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Get the day of the month
  const day = date.getDate()

  // Get the month name (months are zero-indexed, so we use the month number as index)
  const month = monthNames[date.getMonth()]

  // Return formatted date as "Month Day"
  return `${month} ${day}`
}

export default function Campaigns({ className }: any) {
  const [date, setDate] = React.useState({
    from: subDays(new Date(), 7), // Default to last 7 days
    to: new Date(),
  })

  const [formatedDate, setFormatedDate] = React.useState({
    from: subDays(new Date(), 7), // Default to last 7 days
    to: new Date(),
  })

  const {
    data: allCampaignData2,
    error: allCampaignError,
    isLoading: allCampaignLoading,
  } = useQuery({
    queryKey: ['allCampaigns', formatedDate],
    queryFn: () => fetchCampaignsData(formatedDate),
    staleTime: 300000, // Cache data for 24 hours
  })

  const {
    data: campaignListData2,
    error: campaignListError,
    isLoading: campaignListLoading,
  } = useQuery({
    queryKey: ['campaignList', formatedDate],
    queryFn: async () => await fetchListCampaignsData(formatedDate),
    staleTime: 300000,
  })

  const {
    data: GoogleCampaignAdGroupMetrics,
    error: GoogleCampaignAdGroupError,
    isLoading: GoogleCampaignAdGroupLoading,
  } = useQuery({
    queryKey: ['gCampaign', formatedDate],
    queryFn: async () => await GoogleCampaignsAdGroupData(formatedDate),
    staleTime: 300000,
  })

  //lazy loading

  console.log('campaign data from campaigns', campaignListData2)

  const [viewMode, setViewMode] = useState<'card' | 'list'>('list')

  const [campaignsTab, setCampaignTab] = useState('All Campaigns')
  const [allCampaignsData, setAllCampaignsData] = useState<any[]>([])
  const [listCampaigns, setListCampaigns] = useState<any>([])
  const [gCampaignAdgroup, setgCampaignAdgroup] = useState<any[]>([])

  useEffect(() => {
    // const newFormattedDate = {
    //   from: format(date?.from, 'yyyy-MM-dd'),
    //   to: format(date?.to, 'yyyy-MM-dd'),
    // };
    const newFormattedDate = {
      from: date?.from ? format(date?.from, 'yyyy-MM-dd') : date?.from,
      to: date?.to ? format(date?.to, 'yyyy-MM-dd') : date?.from,
    }

    // Use prevState callback to avoid race conditions or unnecessary updates
    setFormatedDate((prevFormattedDate: any) => {
      if (
        newFormattedDate.from !== prevFormattedDate.from ||
        newFormattedDate.to !== prevFormattedDate.to
      ) {
        return newFormattedDate
      }

      // Return the previous state if no change is needed
      return prevFormattedDate
    })
  }, [date])

  useEffect(() => {
    if (allCampaignData2?.length > 0) {
      setAllCampaignsData(allCampaignData2)
    } else {
      setAllCampaignsData([])
    }
  }, [allCampaignData2])

  useEffect(() => {
    if (campaignListData2?.length > 0) {
      setListCampaigns(campaignListData2)
    } else {
      setListCampaigns([])
    }
  }, [campaignListData2])

  useEffect(() => {
    if (GoogleCampaignAdGroupMetrics?.length > 0) {
      setgCampaignAdgroup(GoogleCampaignAdGroupMetrics)
    } else {
      setgCampaignAdgroup([])
    }
  }, [GoogleCampaignAdGroupMetrics])

  const handleCampaignsTab = (tab: string) => {
    if (tab === 'All Campaigns') {
      setListCampaigns(campaignListData2)
      setCampaignTab(tab)
      // set grid view
      setAllCampaignsData(allCampaignData2)
    } else if (tab === 'Ending Soon') {
      //  for list view
      // Get the current date
      const currentDate = new Date()

      // Define 7 days from the current date
      const sevenDaysFromNow = new Date()
      sevenDaysFromNow.setDate(currentDate.getDate() + 7)

      const filterListCampStatus = campaignListData2?.filter(
        (val: any) => val?.status === 'ACTIVE' || val?.status === 'PAUSED',
      )

      // Filter campaigns where the stop_time is within the next 7 days
      const endingSoonCampaigns = filterListCampStatus?.filter(
        (campaign: any) => {
          const stopTime = new Date(campaign?.dateEnd)
          return stopTime >= currentDate && stopTime <= sevenDaysFromNow
        },
      )

      if (endingSoonCampaigns?.length > 0) {
        setListCampaigns(endingSoonCampaigns)
      } else {
        setListCampaigns([])
      }

      // for grid view
      // Get current date and date 7 days from now
      const today = new Date()
      const sevenDaysLater = new Date()
      sevenDaysLater.setDate(today.getDate() + 7)

      const filterGridCampStatus = allCampaignData2?.filter(
        (val: any) => val?.status === 'ACTIVE' || val?.status === 'PAUSED',
      )

      // Filter campaigns ending in the next 7 days
      const endingGridSoonCampaigns = filterGridCampStatus?.filter(
        (campaign: any) => {
          const endDate = new Date(campaign?.stop_time)
          return endDate > today && endDate <= sevenDaysLater
        },
      )

      if (endingGridSoonCampaigns?.length > 0) {
        setAllCampaignsData(endingGridSoonCampaigns)
      } else {
        setAllCampaignsData([])
      }

      setCampaignTab(tab)
    } else if (tab === 'Needs Budget') {
      const today = new Date()
      // Setting time to 00:00:00 for comparison at the date level
      today.setHours(0, 0, 0, 0)

      // list view campaigns
      const filteredData = campaignListData2?.filter((item: any) => {
        const itemDate = new Date(item?.dateEnd)
        itemDate.setHours(0, 0, 0, 0) // Normalize the item's date
        return itemDate >= today // Check if the date is today or in the future
      })

      const listviewcampaign = filteredData?.filter((val: any) => {
        const remainiingListCmapaign =
          (val?.budget_remaining / val?.lifetime_budget) * 100
        return (
          remainiingListCmapaign <= 10 &&
          (val?.status === 'PAUSED' || val?.status === 'ACTIVE')
        )
      })
      if (listviewcampaign?.length > 0) {
        setListCampaigns(listviewcampaign)
      } else {
        setListCampaigns([])
      }

      //  grid campaigns
      const filteredGrid = allCampaignData2?.filter((item: any) => {
        const itemDate2 = new Date(item?.stop_time)
        itemDate2.setHours(0, 0, 0, 0) // Normalize the item's date
        return itemDate2 >= today // Check if the date is today or in the future
      })

      const filteredCampaigns = filteredGrid?.filter((campaign: any) => {
        const remainingPercentage =
          (campaign.budget_remaining / campaign.lifetime_budget) * 100
        return (
          remainingPercentage <= 10 &&
          (campaign.status === 'PAUSED' || campaign.status === 'ACTIVE')
        )
      })

      if (filteredCampaigns?.length > 0) {
        setAllCampaignsData(filteredCampaigns)
      } else {
        setAllCampaignsData([])
      }
      setCampaignTab(tab)
    } else if (tab === 'Needs Creative Refresh') {
      //
      const filteredListCampaigns = campaignListData2?.filter(
        (campaign: any) => {
          const isActiveOrPaused =
            campaign?.status === 'ACTIVE' || campaign?.status === 'PAUSED'
          const hasHighFrequency = campaign.frequency > 2

          return isActiveOrPaused && hasHighFrequency
        },
      )

      if (filteredListCampaigns?.length > 0) {
        setListCampaigns(filteredListCampaigns)
      } else {
        setListCampaigns([])
      }

      setCampaignTab(tab)
    }
  }

  return (
    <div className="container  ps-4 w-full overflow-hidden   p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Campaigns</h1>
        <div className="flex gap-3 items-center space-x-2">
          {/* filter */}
          <div className="flex justify-end space-x-4">
            <DateRangePicker
              date={date}
              setDate={setDate}
              className={className}
            />
          </div>

          <Toggle
            aria-label="Toggle Card View"
            pressed={viewMode === 'card'}
            onPressedChange={() => setViewMode('card')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle List View"
            pressed={viewMode === 'list'}
            onPressedChange={() => setViewMode('list')}
          >
            <ListIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {/* <div className="flex space-x-2 mb-6 overflow-x-auto">
        <Button onClick={() => handleCampaignsTab("All Campaigns")} variant={campaignsTab === 'All Campaigns' ? 'default' : 'outline'} className=''>All Campaigns</Button>
        <Button onClick={() => handleCampaignsTab("Ending Soon")} variant={campaignsTab === 'Ending Soon' ? 'default' : 'outline'} className=''>Ending Soon</Button>
        <Button onClick={() => handleCampaignsTab("Needs Budget")} variant={campaignsTab === 'Needs Budget' ? 'default' : 'outline'} className=''> Needs Budget</Button>
        <Button onClick={() => handleCampaignsTab("Needs Creative Refresh")} variant={campaignsTab === 'Needs Creative Refresh' ? 'default' : 'outline'} className=''>Needs Creative Refresh</Button>
       
      </div> */}

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCampaignLoading ? (
            <CampaignGridViewSkeleton />
          ) : (
            <>
              {allCampaignsData?.map((campaign: any) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  updateCampaign={''}
                  onViewDetails={() => setViewMode('list')}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        // <ListView campaignsdata={allCampaignDataList} />
        <>
          {campaignListLoading ? (
            <CampaignsListViewSkelton />
          ) : (
            <>
              <ListView2
                campaignsdata={listCampaigns}
                googleCampaignsData={gCampaignAdgroup}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

function CampaignCard({
  campaign,
  updateCampaign,
  onViewDetails,
}: {
  campaign: any
  updateCampaign: any
  onViewDetails: any
}) {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'Impressions',
    'Clicks',
    'CTR',
    'Conversions',
  ])

  const [adPlatform, setAdPlatform] = useState<'meta' | 'google'>('meta')
  const allMetrics = [
    {
      label: 'Impressions',
      value: campaign?.insights?.data[0]?.impressions
        ? campaign?.insights?.data[0]?.impressions
        : 0,
    },
    {
      label: 'Clicks',
      value: campaign?.insights?.data[0]?.clicks
        ? campaign?.insights?.data[0]?.clicks
        : 0,
    },
    {
      label: 'CTR',
      value: campaign?.insights?.data[0]?.ctr
        ? campaign?.insights?.data[0]?.ctr
        : 0,
    },
    {
      label: 'Conversions',
      value: campaign?.insights?.data[0]?.conversions
        ? campaign?.insights?.data[0]?.conversions
        : 0,
    },
    {
      label: 'Cost Per Click',
      value: campaign?.insights?.data[0]?.cpc
        ? campaign?.insights?.data[0]?.cpc
        : 0,
    },
    {
      label: 'Cost Per Conversion',
      value: campaign?.insights?.data[0]?.costPerConversion
        ? campaign?.insights?.data[0]?.costPerConversion
        : 0,
    },
    {
      label: 'Spend',
      value: campaign?.insights?.data[0]?.spend
        ? campaign?.insights?.data[0]?.spend
        : 0,
    },
    {
      label: 'Leads',
      value: campaign?.insights?.data[0]?.conversions
        ? campaign?.insights?.data[0]?.conversions
        : 0,
    },
  ]

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric)
      } else if (prev.length < 4) {
        return [...prev, metric]
      }
      return prev
    })
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className=" px-6 pt-2 pb-1 space-y-0">
        <h2 className="text-lg font-semibold">
          {campaign.name?.length > 34 ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-transparent p-0 capitalize"
                      variant="link"
                    >
                      {campaign.name.slice(0, 34) + '...'}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className=" dark:bg-black dark:text-white">
                    <p>{campaign.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            campaign.name
          )}
        </h2>
        <div>
          <Badge
            className={`text-sm mt-1 font-medium px-2 py-1 text-[12px] rounded-full hover:${getStatusColor(
              campaign.status,
            )}  ${getStatusColor(campaign.status)}`}
            variant="destructive"
          >
            {' '}
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-1 flex-grow">
        <div className="flex justify-between items-center text-xs pb-1 mb-1">
          <div className="flex items-center  rounded-md p-1">
            <span>
              {campaign.start_time
                ? getFormattedDate(formatDate(campaign?.start_time))
                : ''}
            </span>
            <span className="px-2"> to </span>
            <span>
              {formatDate(campaign?.stop_time ? campaign?.stop_time : '')}
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Pencil className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h3 className="font-semibold mb-2">Select Metrics (max 4)</h3>
              <div className="space-y-2">
                {allMetrics?.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={metric.label}
                      checked={selectedMetrics.includes(metric.label)}
                      onCheckedChange={() => handleMetricToggle(metric.label)}
                      disabled={
                        selectedMetrics.length >= 4 &&
                        !selectedMetrics?.includes(metric.label)
                      }
                    />
                    <label
                      htmlFor={metric.label}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {metric.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-4">
          {allMetrics
            .filter((metric) => selectedMetrics.includes(metric.label))
            .map((metric) => (
              <Metric
                key={metric.label}
                label={metric.label}
                value={formatMetricValue(metric.label, metric.value)}
                color={getMetricColor(metric.label)}
              />
            ))}
        </div>
        <BudgetProgress
          spent={
            campaign?.insights?.data[0]?.spend
              ? FormatNumber(campaign?.insights?.data[0]?.spend)
              : 0
          }
          total={Number(campaign?.lifetime_budget)}
        />
        <div className="flex justify-between items-center mt-2 mb-1">
          <h1 className="font-bold m-0 p-0">Ad Preview</h1>
          <p>
            {' '}
            {adPlatform === 'meta' ? (
              <Image src={Metaicon} height={30} width={30} alt="meta" />
            ) : (
              'Google'
            )}
          </p>
        </div>
        <AdPreview
          fbPreview={campaign?.campaignCreative}
          platform={adPlatform}
        />
        {/* <AIInsights /> */}
      </CardContent>
      <CardFooter className="pb-2 pt-0 px-6 flex flex-col space-y-2 mt-auto">
        <div className="flex justify-between w-full">
          <AddCampaignBudget
            campaign={campaign}
            updateCampaign={updateCampaign}
          />
          <ChangeCampaignEndDate
            campaign={campaign}
            updateCampaign={updateCampaign}
          />
          <EditCampaignSettings
            campaign={campaign}
            updateCampaign={updateCampaign}
          />
        </div>
        <Button className="w-full" onClick={onViewDetails}>
          View Campaign Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function BudgetProgress({ spent, total }: any) {
  const percentage = (spent / total) * 100
  return (
    <div className="mt-0">
      <div className="flex justify-between text-xs  mb-1">
        <span>Spend vs Budget </span>
        <span>
          ₹{FormatNumber(Math.round(Number(spent)))} / ₹
          {FormatNumber(Math.round(Number(total)))}
        </span>
      </div>
      <Progress value={percentage} className="h-1" />
    </div>
  )
}

function AIInsights() {
  return (
    <div className="mt-3 space-y-1">
      <h3 className="font-semibold text-sm mb-1">AI Insights</h3>
      <div className="bg-green-100 p-1 rounded-md flex items-center">
        <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
        <span className="text-xs text-green-800">
          CTR improved by 15% this week
        </span>
      </div>
      <div className="bg-blue-100 p-1 rounded-md flex items-center">
        <Users className="h-3 w-3 mr-1 text-blue-600" />
        <span className="text-xs text-blue-800">
          Audience engagement up 20%
        </span>
      </div>
      <div className="bg-yellow-100 p-1 rounded-md flex items-center">
        <DollarSign className="h-3 w-3 mr-1 text-yellow-600" />
        <span className="text-xs text-yellow-800">CPC decreased by 10%</span>
      </div>
      <div className="bg-purple-100 p-1 rounded-md flex items-center">
        <BarChart2 className="h-3 w-3 mr-1 text-purple-600" />
        <span className="text-xs text-purple-800">
          Conversion rate steady at 3.5%
        </span>
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  color,
  bgColorClass,
}: {
  label: string
  value: string
  color: string
  bgColorClass?: string
}) {
  const bgColor = bgColorClass || `bg-${color}-100`
  const textColor = `text-${color}-800`
  return (
    <div className={`${bgColor} ${textColor} p-1 rounded text-xs text-center`}>
      <div className="text-sm truncate">{label}</div>
      <div className="font-bold truncate text-base">{value}</div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatMetricValue(label: string, value: number): string {
  switch (label) {
    case 'Impressions':
    case 'Clicks':
    case 'Conversions':
    case 'Leads':
      return FormatNumber(Number(value))
    case 'CTR':
    case 'VTR':
      return `${value}%`
    case 'Cost per Click':
    case 'Cost per Conversion':
      return `₹${value}`
    default:
      return value.toString()
  }
}

function getMetricColor(label: string): string {
  switch (label) {
    case 'Impressions':
      return 'blue'
    case 'Clicks':
      return 'green'
    case 'CTR':
      return 'yellow'
    case 'Conversions':
      return 'purple'
    case 'Cost per Click':
      return 'orange'
    case 'Cost per Conversion':
      return 'red'
    case 'VTR':
      return 'indigo'
    case 'Leads':
      return 'pink'
    default:
      return 'gray'
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800'
    case 'PAUSED':
      return 'bg-orange-100 text-orange-800'
    case 'COMPLETED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
