// @ts-nocheck
'use client'
 
import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card'
import FormatNumber from '../../../../../components/FormatNumber'
import { Badge } from '../../../../../components/ui/badge'
import { useRouter } from 'next/navigation'
import LeadGenerationFunnelDashboard from './components/LeadFlow'
import LeadDistribution from './components/LeadDistribution'
 
import { Switch } from '../../../../../components/ui/switch'
import WalletDashboard from './components/WalletDashboard'
 
// Import subDays to subtract 7 days
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Image from 'next/image'
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../components/ui/table'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../../../../components/ui/carousel'
 
const metrics: MetricType[] = [
  {
    id: 'total_leads',
    value: 298,
    isIncrease: 'inc',
    perc: 20.1,
    time: 'from last month',
    imagePath: '/images/total_leads.svg',
  },
  {
    id: 'live_campaigns',
    value: 5,
    isIncrease: 'inc',
    perc: 2,
    time: 'new this week',
    imagePath: '/images/live_campaigns.svg',
  },
  {
    id: 'total_spend',
    value: 314577,
    isIncrease: 'inc',
    perc: 65,
    time: 'of budget used',
    imagePath: '/images/total_spend.svg',
  },
  {
    id: 'cost_per_lead',
    value: 1055.633,
    isIncrease: 'dec',
    perc: 3.2,
    time: 'from last week',
    imagePath: '/images/cost_per_lead.svg',
  },
]
 
type MetricType = {
  id: string
  value: string | number
  isIncrease?: 'inc' | 'dec'
  perc?: number
  time: string
  imagePath: string
}
 
const MetricCard = ({
  metric,
  index,
  moveCard = () => {},
  isSelected = false,
  onToggle = () => {},
  isInSheet = true,
}: {
  metric: MetricType
  index: number
  moveCard?: (dragIndex: number, hoverIndex: number) => void
  isSelected?: boolean
  onToggle?: (id: string) => void
  isInSheet?: boolean
}) => {
  return (
    <Card
      className={`relative cursor-pointer transition-all  h-full   ${
        isSelected && isInSheet ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2   ">
        <CardTitle className="md:text-lg flex text-md font-medium capitalize">
          {metric.id.replace(/_/g, ' ')}
        </CardTitle>
        {metric.imagePath && (
          <Image
            src={metric.imagePath}
            height={48}
            width={48}
            alt=""
            className=" "
          />
        )}
      </CardHeader>
      <CardContent className="">
        <div className="md:text-xl  text-lg font-bold">
          {metric.id === 'total_spend' || metric.id === 'cost_per_lead'
            ? '₹'
            : ''}
          {metric.id === ''
            ? metric.value
            : FormatNumber(Math.round(Number(metric.value)))}
          {metric.id === 'conversion_rate' || metric.id === 'ctr' ? '%' : ''}
        </div>
        <p
          className={`md:text-md text-sm flex items-center  text-black dark:text-white`}
        >
          {metric?.isIncrease === 'inc' ? (
            <span className="text-green-600">+</span>
          ) : metric?.isIncrease === 'dec' ? (
            <span className="text-red-600">-</span>
          ) : (
            ''
          )}
          <span
            className={
              metric?.isIncrease === 'inc'
                ? 'text-green-600'
                : metric?.isIncrease === 'dec'
                ? 'text-red-600'
                : ''
            }
          >
            {metric?.perc
              ? metric.id === 'ctr'
                ? `${metric?.perc?.toFixed(2)}%`
                : `${Math.round(metric?.perc)}%`
              : '0%'}
          </span>
          &nbsp; {metric.time}
        </p>
      </CardContent>
    </Card>
  )
}
 
export default function Dashboard({ className }: any) {
  const [budgetUtilization, setBudgetUtilization] = React.useState<any>([])
  // const [metrics, setMetrics] = React.useState<any[]>([])
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([])
  const router = useRouter()
 
  //   const { data:dashboarddata, error:dashboardError, isLoading:dashboardLoading } = useQuery<any>({
  //     queryKey: ['alldashboardCampaigns', formatedDate],
  //     queryFn:() => GetDashboardData(formatedDate),
  //     staleTime: 1000 * 30,
  //     retry: 2,  // Only retry twice
  //     retryDelay: 1000 // Wait 1 second between retries
  // });
 
  //   const { data:BudgetUtilizationData, error:budgetUtilizationError, isLoading:budgetUtilizationLoading } = useQuery({
  //     queryKey: ['budgetutilization'],
  //     queryFn:() =>GetBudgetUtilizationData(),
  //     staleTime: 1000 * 30,
 
  //   });
 
  //   const { data:metadsgraph, error:metaadsgrapherror, isLoading:metaadsgraphLoading } = useQuery({
  //     queryKey: ['metaadsgraphdata', formatedDate],
  //     queryFn:() =>GetfacebookAds(formatedDate),
  //     staleTime: 1000 * 30,
 
  //   });
 
  // console.log("metadsgraph", metadsgraph)
 
  //   React.useEffect(()=>{
  //       if(dashboarddata?.totalCampaignData){
  //            setMetrics(dashboarddata?.totalCampaignData)
 
  //       }
 
  //   },[dashboarddata?.totalCampaignData])
 
  // // funnel
  // React.useEffect(()=>{
  //     if(dashboarddata?.funnelData?.all){
  //       setFunnelGraphData(dashboarddata?.funnelData?.all)
  //     }
 
  // }, [dashboarddata?.funnelData?.all])
 
  // // setformated date
  // React.useEffect(() => {
  //   const newFormattedDate = {
  //     from:date?.from?format(date?.from, 'yyyy-MM-dd'):date?.from,
  //     to:date?.to?format(date?.to, 'yyyy-MM-dd'):date?.from,
  //   };
 
  //   // Use prevState callback to avoid race conditions or unnecessary updates
  //   setFormatedDate((prevFormattedDate:any) => {
  //     if (
  //       newFormattedDate?.from !== prevFormattedDate.from ||
  //       newFormattedDate?.to !== prevFormattedDate.to
  //     ) {
  //       return newFormattedDate;
  //     }
 
  //     // Return the previous state if no change is needed
  //     return prevFormattedDate;
  //   });
  // }, [date]);
 
  // //  Metric cards
  // React.useEffect(() => {
  //   if (totalSpendSection && totalSpendSection.length > 0) {
  //     setMetrics(totalSpendSection)
  //     setSelectedMetrics(totalSpendSection.map((m) => m.id)) // Select all metrics by default
  //   }
  // }, [totalSpendSection])
 
  // const moveCard = React.useCallback(
  //   (dragIndex: number, hoverIndex: number) => {
  //     setMetrics((prevMetrics) => {
  //       const updatedMetrics = [...prevMetrics]
  //       const [reorderedItem] = updatedMetrics.splice(dragIndex, 1)
  //       updatedMetrics.splice(hoverIndex, 0, reorderedItem)
  //       return updatedMetrics
  //     })
  //   },
  //   [],
  // )
 
  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((current) => {
      if (current.includes(metricId)) {
        return current.filter((id) => id !== metricId)
      } else {
        return [...current, metricId]
      }
    })
  }
 
  const renderMetricCards = () => {
    const sortedMetrics = [...metrics].sort((a, b) => {
      const aSelected = selectedMetrics.includes(a.id)
      const bSelected = selectedMetrics.includes(b.id)
      if (aSelected === bSelected) return 0
      return aSelected ? -1 : 1
    })
 
    return (
      <div className="relative   w-full  overflow-hidden">
       
          <div className="w-full  grid grid-cols-4 gap-2">
            {sortedMetrics.map((metric, index) => (
              <div
                key={metric.id}
                className=""
              >
            
                  <MetricCard
                    metric={metric}
                    index={index}
                    isSelected={false}
                    isInSheet={false}
                    onToggle={handleMetricToggle}
                  />
                
              </div>
            ))}
          </div>
          {/* <CarouselPrevious className="absolute md:flex hidden left-[-11px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute md:flex hidden -right-1 top-1/2 -translate-y-1/2" /> */}
        
      </div>
    )
  }
 
  // const getBudgetUtilization = async () => {
  //   try {
  //     const res = await Axios.get('/get-budget-content')
  //     if (res.status === 200) {
  //       const data = res.data?.message
  //       setBudgetUtilization(data)
  //       //  console.log("data")
  //     }
  //   } catch (error) {
  //   } finally {
  //   }
  // }
 
  // React.useEffect(() => {
  //   getBudgetUtilization()
  // }, [])
 
  //   const handleAllFunnel = () => {
  //     console.log('all')
  //      const all:any = dashboarddata?.funnelData?.all || []
  //     setFunnelGraphData(all)
  //   }
 
  //   const handleGoogleFunnel = () => {
  //     console.log('google')
  //     const googledata:any = dashboarddata?.funnelData?.google || []
  //     setFunnelGraphData(googledata)
  //   }
 
  //   const handleFacebookFunnel = () => {
  //     const metadata:any = dashboarddata?.funnelData?.meta || []
  //     console.log('facebook')
  //     setFunnelGraphData(metadata)
  //   }
 
  //   console.log("dashboarddata", dashboarddata)
 
  // console.log("totalcamp", totalCampaign)
  return (
    <div className="">
      <DndProvider backend={HTML5Backend}>
        <div className="w-full h-full md:p-5 p-3 md:mb-0">
          {/* Hero Section */}
          <div className="header-area mb-4  text-left flex md:hidden flex-col  md:gap-2">
            <div className="md:text-2xl text-xl bg-gradient-to-r from-[#FE6515] to-[#AC56FF] text-transparent bg-clip-text font-inter font-semibold">
              Hey{' '}
              <span className="bg-gradient-to-r from-[#FE6515] to-[#AC56FF] text-transparent bg-clip-text">
                Vishal,
              </span>
            </div>
            <div className="md:text-lg text-md dark:text-[#A7A7A7] text-[#2B2E48] font-inter font-medium ">
              Welcome Back!
            </div>
          </div>
          <div className="flex lg:flex-row h-full gap-5 lg:gap-3 flex-col-reverse lg:items-start relative  mb-8 ">
            <div className=" w-full   overflow-hidden  ">
              {/* {dashboardLoading ? (
                <TotalSpendSectionSkeleton />
              ) : ( */}
              {renderMetricCards()}
 
              {/* )} */}
            </div>
            <div className="w-1/2">
              <WalletDashboard />
            </div>
 
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 md:h-[123px] absolute md:relative  right-2 md:right-0 md:bottom-0 bottom-10 md:w-[104px]"
                >
                  <PlusCircle className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Select and Reorder Metrics</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)] mt-4">
                  <div className="grid grid-cols-1 gap-4 p-4">
                    {metrics?.map((metric:any, index:number) => (
                      <MetricCard
                        key={metric?.id}
                        metric={metric}
                        index={index}
                
                        isSelected={selectedMetrics.includes(metric.id)}
                        onToggle={handleMetricToggle}
                        isInSheet={true}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet> */}
          </div>
          <div className="flex md:flex-row flex-col gap-5 w-full">
            <div className="w-full">
              <LeadGenerationFunnelDashboard />
            </div>
            <div className="w-full">
              <LeadDistribution />
            </div>
          </div>
          <div className="mt-10 ">
            <Card className="mb-8 px-3">
              <CardHeader>
                <CardTitle className="text-xl  font-bold">
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="rounded-lg">
                  <TableHeader className="">
                    <TableRow className="">
                      <TableHead>Campaign</TableHead>
                      <TableHead>Spends</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Cost per Leads</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                      {/* <TableHead>Avg. Lead Quality</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <>
                      <TableRow className=" cursor-pointer">
                        <TableCell>Refreshing Cola Blast</TableCell>
                        <TableCell>₹5000</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell>₹41.67</TableCell>
                        <TableCell>2024-12-04</TableCell>
                        <TableCell>2024-12-05</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-400/30 font-normal text-black gap-2">
                            <div className="w-2 h-2  rounded-full  bg-green-500" />
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch />
                        </TableCell>
                      </TableRow>
                    </>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        {/*
       <div className='px-3'>
      <PerformanceDashboard pieChartData={dashboarddata?.pieChartData} forAnalytics={dashboarddata?.forAnalytics} formatedDate={formatedDate} metadsgraph={metadsgraph} />
 
       </div>
 
       <div className="flex md:flex-row flex-col justify-between md:items-stretch mb-8 gap-4 w-full  px-3">
         
         <DACDashboard />
         <div className="flex flex-col md:w-[50%] justify-between "> */}
        {/* <LeadGenerationFunnel
             funnelGraphData={funnelGraphData}
             handleAllFunnel={handleAllFunnel}
             handleGoogleFunnel={handleGoogleFunnel}
             handleFacebookFunnel={handleFacebookFunnel}
           /> */}
        {/* <LeadGenerationFunnelDashboard
             funnelGraphData={funnelGraphData}
             handleAllFunnel={handleAllFunnel}
             handleGoogleFunnel={handleGoogleFunnel}
             handleFacebookFunnel={handleFacebookFunnel}
           />
           <AdCards2
             metaLineChart={metadsgraph?.metaads}
             totalCampaign={dashboarddata?.campaignData?.length>0?dashboarddata?.campaignData:0}
             totalleads={metadsgraph?.totalconversions}
             totalspend={metadsgraph?.totalspend}
           />
         </div>
      
      
       </div>
        */}
 
        {/* Recent campaigns */}
        {/* {dashboarddata?.campaignData?.length>0 &&
     <>
     <div className='px-3'>
     <Card className="mb-8 px-3">
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className='rounded-lg'>
              <TableHeader className=''>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Cost per Lead</TableHead>
                  <TableHead>Conversion Rate</TableHead>
                  <TableHead>Status</TableHead> */}
        {/* <TableHead>Avg. Lead Quality</TableHead> */}
        {/* </TableRow>
              </TableHeader>
              <TableBody>
                {dashboarddata?.campaignData?.reverse()?.slice(0, 5)?.map((val:any, idx:number) => (
                <>
                    <TableRow onClick={() => router.push('/campaigns')} key={idx + 1} className=' cursor-pointer'>
                      <TableCell>{val?.campaignName?val?.campaignName?.length>20?val?.campaignName?.slice(0, 20) + '...':val?.campaignName:''}</TableCell>
                      <TableCell>
                        {val?.camp_start_date
                          ? formatDate(val?.camp_start_date)
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {val?.camp_stop_date ? formatDate(val?.camp_stop_date) : '-'}
                      </TableCell>
                      <TableCell>{val?.platform?val?.platform:'Meta'}</TableCell>
                      <TableCell>{val?.conversions?val?.conversions:0}</TableCell>
                      <TableCell>{Number(val?.conversions)>0?(Number(val?.spend)/Number(val?.conversions))?.toFixed(2) || 0 : 0 }</TableCell>
                      <TableCell>{Number(val?.clicks)>0?(Number(val?.conversions)/Number(val?.clicks))?.toFixed(2) || 0 : 0 }</TableCell>         
                      <TableCell><Badge className={val?.status==='ACTIVE'?'bg-green-600':val?.status==='PAUSED'?'bg-yellow-600':val?.status==='STOP'?'bg-red-600':''} variant="secondary">{val?.status?val?.status:'-'}</Badge></TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>    
      */}
 
        {/* </>}   */}
      </DndProvider>
    </div>
  )
}