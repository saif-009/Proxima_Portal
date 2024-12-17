
"use client"
import { useState, useMemo, useEffect } from "react"
import { Button } from "../../../../../components/ui/button"
import { Label } from "../../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { BarChartIcon} from "lucide-react"
import LeadList from "./LeadList"
import LeadDetails from "./LeadDetails"
import { useTheme } from "next-themes"
import { settingsContext } from '../../../../../context/settingContext'
import { useQuery } from '@tanstack/react-query'
import { getAllCampaignData, getAllLeadsData } from './leadsApi/leadsApi'
import Axios from "../../../../../Axios/Axios"
import LeadSkeleton from "./lead-skeleton/LeadSkeleton"

const campaigns = [
  { id: 1, name: "Summer Sale 2023" },
  { id: 2, name: "New Product Launch" },
  { id: 3, name: "Customer Reactivation" },
]

const initialLeads = [
  { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com", campaignId: 1, quality: "Hot", feedbackProvided: true, createdAt: "2023-06-10T10:30:00Z", purchaseTimeline: "within 15 days" },
  { id: 2, name: "Jane Smith", phone: "987-654-3210", email: "jane@example.com", campaignId: 1, quality: "Warm", feedbackProvided: false, createdAt: "2023-06-14T14:45:00Z", purchaseTimeline: "within 15 days" },
  { id: 3, name: "Alice Johnson", phone: "456-789-0123", email: "alice@example.com", campaignId: 2, quality: "Relevant", feedbackProvided: true, createdAt: "2023-06-13T11:15:00Z", purchaseTimeline: "within 15 days" },
  { id: 4, name: "Bob Williams", phone: "789-012-3456", email: "bob@example.com", campaignId: 3, quality: "Warm", feedbackProvided: true, createdAt: "2023-06-16T09:00:00Z", purchaseTimeline: "within 15 days" },
  { id: 5, name: "Charlie Brown", phone: "321-654-0987", email: "charlie@example.com", campaignId: 2, quality: "Irrelevant", feedbackProvided: false, createdAt: "2023-06-17T13:30:00Z", purchaseTimeline: "within 15 days" },
]

// {
//   "id": "854751233540134",
//   "createdAt": "2024-09-28T11:10:26+0000",
//   "quality": "Hot",
//   "feedbackProvided": true,
//   "purchaseTimeline": "within 15 days",
//   "your_whatsapp_number": "9717684788",
//   "full_name": "Yogeeta Phogat Kadian",
//   "phone_number": "+919717684788",
//   "email": "phog_yog@yahoo.com"
// }

export default function LeadManagementInterface() {
  const { theme, setTheme } = useTheme()
  const [leads, setLeads] = useState(initialLeads)
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0].id)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [loadLeadQuality, setLoadLeadQuality] = useState(false)
  // new state
  const [selectedLeadId, setSelectedLeadId] = useState<string>("")
  const [allLeadsData, setAllLeadsData] = useState<any>([])
  // const [comment, setComment] = useState<any>([])
  const [loadComment, setLoadComment] = useState(false)
// query
const { data: allCampaign, error: allCampaignError, isLoading: allCampaignLoading } = useQuery<any>({
  queryKey: ['allCampaigndata'],
  queryFn: () => getAllCampaignData(),
  staleTime: 1000 * 30, // Cache data for 24 hours
});

const { data: allLeads, error: allLeadsError, isLoading: allLeadsLoading, refetch } = useQuery<any>({
  queryKey: ['allLeadsdata', selectedLeadId],
  queryFn: () => getAllLeadsData(selectedLeadId),
  staleTime: 1000 * 30, // Cache data for 24 hours
});


useEffect(()=>{
    if(allLeads?.length>0){
      setAllLeadsData(allLeads)
    }else{
      setAllLeadsData([])
    }
},[allLeads])
   

  // const filteredLeads = allLeads?.filter((lead:any) => lead?.campaignId === selectedLeadId)

  const { leadCoverage, qualityScore } = useMemo(() => {
    const totalLeads = allLeadsData?.length || 0;
    const leadsWithFeedback = allLeadsData?.filter((lead: any) => lead?.feedbackProvided)?.length || 0;
    const leadCoverage = Math.round((leadsWithFeedback / totalLeads) * 100) || 0;
  
    const qualityPoints: any = { Hot: 3, Warm: 2, Relevant: 1, Irrelevant: 0 };
    const totalQualityPoints = allLeadsData?.reduce((sum: any, lead: any) => {
      const points = qualityPoints[lead?.quality] ?? 0; // Default to 0 if quality is undefined
      return sum + points;
    }, 0);
  
    const maxQualityPoints = totalLeads * 3;
    const qualityScore = Math.round((totalQualityPoints / maxQualityPoints) * 100) || 0;
  
    return { leadCoverage, qualityScore };
  }, [allLeadsData]);

  const handleQualityChange = (leadId:any, newQuality:any) => {
    handleUpdateLeadQuality(leadId, newQuality)
    // setAllLeadsData(allLeadsData?.map((lead:any) =>
    //   lead.id === leadId ? { ...lead, quality: newQuality, feedbackProvided: true } : lead
    // ))
  }

  const handleUpdateLeadQuality = async (leadid:string, leadquality: any,) => {
    setLoadLeadQuality(true)
  const body: any = {
    leadId: leadid,
    type :leadquality
  }
  
  try {
    const res = await Axios.post("/update-lead", body)
    if (res.status === 200 && res?.data?.valid) {
        
      if (res?.data?.valid) {
         const commentarr = res?.data?.updatedLead?.comment
        setAllLeadsData(allLeadsData?.map((lead:any) => 
          lead.id === leadid ? { ...lead, quality:leadquality } : lead
        ))
        setSelectedLead((prevState: any) => ({
          ...prevState,
          quality:leadquality, // Append the new comment
        }));
  
       
        refetch()
      }
    }
  } catch (error) {
    console.log(error)
  
  } finally {
    setLoadLeadQuality(false)
  }
  }



  const handleLeadClick = (lead:any) => {
    setSelectedLead(lead)
  }

  const handleCampaignChange = (campaignId:any) => {
    setSelectedLeadId(campaignId)
    setSelectedLead(null)
  }

  const handleCommentSubmit = (comment:any, id:any) => {
    handleAdComment(comment, id)
    // if (comment.trim() && selectedLead) {
    //   setAllLeadsData(allLeadsData.map((lead:any) =>
    //     lead.id === selectedLead.id ? { ...lead, feedbackProvided: true } : lead
    //   ))
    // }
  }

  const handleAdComment = async (comment: any, leadid:any) => {
    setLoadComment(true)
  const body: any = {
    leadId: leadid,
    comment: comment
  }
  
  try {
    const res = await Axios.post("/update-lead", body)
    if (res.status === 200 && res?.data?.valid) {
        
      if (res?.data?.valid) {
         const commentarr = res?.data?.updatedLead?.comment
        setAllLeadsData(allLeadsData?.map((lead:any) => 
          lead.id === leadid ? { ...lead, comment:commentarr, feedbackProvided: true } : lead
        ))
        setSelectedLead((prevState: any) => ({
          ...prevState,
          comment:commentarr, // Append the new comment
          feedbackProvided: true
        }));
  
       
        refetch()
      }
    }
  } catch (error) {
    console.log(error)
  
  } finally {
    setLoadComment(false)
  }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

useEffect(()=>{
    if(allCampaign?.length>0){
       const campId = allCampaign[0]?.campaign_id;
       if(campId){
        setSelectedLeadId(campId)
       }else{
        setSelectedLeadId("")
       }
    }
},[allCampaign])








  return (
    <div className="flex flex-col h-full mt-5 md:mt-0">
      <div className="flex md:flex-row flex-col gap-2 md:gap-0 md:items-center justify-between px-4 pb-2  border-b border-gray-200 dark:border-gray-800">
        <div className="md:w-1/2 md:pr-4">
          <Label htmlFor="campaign-select" className="text-xl font-bold mb-2 block">Select Campaign</Label>
          <Select value={selectedLeadId} onValueChange={handleCampaignChange}>
            <SelectTrigger id="campaign-select" className="w-full bg-background border-input">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent>
              {allCampaign?.map((campaign:any, index:number) => (
                <SelectItem key={campaign?.campaign_id} value={campaign?.campaign_id}>
                  {index+1}.&nbsp;{campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:w-1/2 flex justify-end space-x-4">
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lead Coverage</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadCoverage}%</div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qualityScore}%</div>
            </CardContent>
          </Card>
         
        </div>
      </div>
      {allLeadsLoading?<LeadSkeleton/>:(<>
        <div className="flex md:flex-1 md:flex-row flex-col overflow-hidden">
        <LeadList 
          leads={allLeadsData}
          onLeadClick={handleLeadClick}
          onQualityChange={handleQualityChange}
          selectedLead={selectedLead}
        />
        <LeadDetails
          selectedLead={selectedLead}
          onQualityChange={handleQualityChange}
          onCommentSubmit={handleCommentSubmit}
          loadComment={loadComment}
        />
      </div>
      </>)}
      
    </div>
  )
}