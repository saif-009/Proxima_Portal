"use client"
import React, { useState, useMemo, useEffect } from "react"
import { Button } from "../../../../../components/ui/button"
import { Label } from "../../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { BarChartIcon } from 'lucide-react'
import LeadList from "./LeadList"
import LeadDetails from "./LeadDetails"
import { subDays, isWithinInterval, parseISO } from "date-fns"
import { useTheme } from "next-themes"
import { useQuery } from '@tanstack/react-query'
import { getAllCampaignData, getAllLeadsData } from './leadsApi/leadsApi'
import Axios from "../../../../../Axios/Axios"
import LeadSkeleton from "./lead-skeleton/LeadSkeleton"
import MobileLeadDetails from "./MobileLeadDetails"
import DateRangePicker from "../dashboard/components/daterangePicker"

export default function LeadManagementInterface() {
  const { theme, setTheme } = useTheme()
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [loadLeadQuality, setLoadLeadQuality] = useState(false)
  const [loadComment, setLoadComment] = useState(false)
  const [date, setDate] = useState({
    from: subDays(new Date(), 13),
    to: new Date(),
  })

  const { data: allCampaign, isLoading: allCampaignLoading } = useQuery<any>({
    queryKey: ['allCampaigndata'],
    queryFn: getAllCampaignData,
    staleTime: 1000 * 30,
  })

  const { data: campaignLeads, isLoading: campaignLeadsLoading, refetch: refetchLeads } = useQuery<any>({
    queryKey: ['campaignLeads', selectedCampaign],
    queryFn: () => getAllLeadsData(selectedCampaign),
    staleTime: 1000 * 30,
    enabled: !!selectedCampaign,
  })

  const filteredLeads = useMemo(() => {
    if (!campaignLeads) return []
    return campaignLeads.filter((lead: any) => {
      const leadDate = parseISO(lead.createdAt)
      return isWithinInterval(leadDate, { start: date.from, end: date.to })
    })
  }, [campaignLeads, date])

  const { leadCoverage, qualityScore } = useMemo(() => {
    const totalLeads = filteredLeads.length
    const leadsWithFeedback = filteredLeads.filter((lead: any) => lead?.feedbackProvided).length
    const leadCoverage = Math.round((leadsWithFeedback / totalLeads) * 100) || 0

    const qualityPoints: any = { Hot: 3, Warm: 2, Relevant: 1, Irrelevant: 0 }
    const totalQualityPoints = filteredLeads.reduce((sum: number, lead: any) => {
      return sum + (qualityPoints[lead?.quality] ?? 0)
    }, 0)

    const maxQualityPoints = totalLeads * 3
    const qualityScore = Math.round((totalQualityPoints / maxQualityPoints) * 100) || 0

    return { leadCoverage, qualityScore }
  }, [filteredLeads])

  const handleQualityChange = async (leadId: string, newQuality: string) => {
    setLoadLeadQuality(true)
    const body = { leadId, type: newQuality }
    
    try {
      const res = await Axios.post("/update-lead", body)
      if (res.status === 200 && res?.data?.valid) {
        refetchLeads()
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prevState: any) => ({
            ...prevState,
            quality: newQuality,
          }))
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadLeadQuality(false)
    }
  }

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead)
  }

  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId)
    setSelectedLead(null)
  }

  const handleCommentSubmit = async (comment: string, leadId: string) => {
    setLoadComment(true)
    const body = { leadId, comment }
    
    try {
      const res = await Axios.post("/update-lead", body)
      if (res.status === 200 && res?.data?.valid) {
        refetchLeads()
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prevState: any) => ({
            ...prevState,
            comment: res?.data?.updatedLead?.comment,
            feedbackProvided: true
          }))
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadComment(false)
    }
  }

  useEffect(() => {
    if (allCampaign?.length > 0 && !selectedCampaign) {
      setSelectedCampaign(allCampaign[0]?.campaign_id || "")
    }
  }, [allCampaign, selectedCampaign])

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 md:gap-2 mt-4 md:flex-row flex-col md:items-center justify-between px-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="md:w-1/2 pr-4">
          <Label htmlFor="campaign-select" className="text-xl font-bold mb-2 block">Select Campaign</Label>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Select value={selectedCampaign} onValueChange={handleCampaignChange} >
              <SelectTrigger id="campaign-select" className=" bg-background border-input " >
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent >
                {allCampaign?.map((campaign: any, index: number) => (
                  <SelectItem key={campaign?.campaign_id} value={campaign?.campaign_id}>
                    {index + 1}.&nbsp;{campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DateRangePicker
              date={date}
              setDate={setDate}
              className=""
            />
          </div>
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
      {campaignLeadsLoading ? (
        <LeadSkeleton />
      ) : (
        <div className="flex md:flex-row flex-col flex-1 overflow-hidden">
          <LeadList 
            leads={filteredLeads}
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
          <div className="md:hidden">
          <MobileLeadDetails
            selectedLead={selectedLead}
            onQualityChange={handleQualityChange}
            onCommentSubmit={handleCommentSubmit}
            loadComment={loadComment}
            onClose={() => setSelectedLead(null)}
          />
            </div>
         
        </div>
      )}
    </div>
  )
}

