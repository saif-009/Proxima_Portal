'use client'
// @ts-nocheck
import { useState, useMemo, useEffect, useContext } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'

import { ScrollArea } from '../../../../../components/ui/scroll-area'
import { Separator } from '../../../../../components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select'
import {
  CalendarIcon,
  PhoneIcon,
  StarIcon,
  MessageCircleIcon,
  FolderIcon,
} from 'lucide-react'
// import BucketSelector from './BucketSelector'
// import { IoRadioButtonOnSharp } from 'react-icons/io5'
import { DropdownMenuRadioGroupDemo } from './dropDownMenu'
import axios, { all } from 'axios'
import { headers } from 'next/headers'
import Axios from '@/Axios/Axios'
import { settingsContext } from '@/context/settingContext'
import { useQuery } from '@tanstack/react-query'
import { getAllCampaignData, getAllLeadsData } from './leadsApi/leadsApi'
import LeadsSkelton from '@/utils/LeadsSkelton'
// Mock data for campaigns and leads
const campaigns = [
  { id: 1, name: 'Summer Sale 2023' },
  { id: 2, name: 'New Product Launch' },
  { id: 3, name: 'Customer Reactivation' },
]

const initialLeads = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    number: '123-456-7890',
    datetime: '2023-06-15 10:30 AM',
    grade: 7,
    campaignId: 1,
    bucket: 'Interested - details shared',
    lastFollowUp: '2023-06-20',
    collectedDate: '2023-06-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    number: '987-654-3210',
    datetime: '2023-06-14 2:45 PM',
    grade: 5,
    campaignId: 1,
    bucket: 'Site visit planned',
    lastFollowUp: '2023-06-18',
    collectedDate: '2023-06-09',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    number: '456-789-0123',
    datetime: '2023-06-13 11:15 AM',
    grade: 8,
    campaignId: 2,
    bucket: 'Negotiation',
    lastFollowUp: '2023-06-19',
    collectedDate: '2023-06-08',
  },
  {
    id: 4,
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    number: '789-012-3456',
    datetime: '2023-06-16 9:00 AM',
    grade: 6,
    campaignId: 3,
    bucket: 'Not interested',
    lastFollowUp: '2023-06-17',
    collectedDate: '2023-06-11',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    number: '321-654-0987',
    datetime: '2023-06-17 1:30 PM',
    grade: 9,
    campaignId: 2,
    bucket: 'Closed',
    lastFollowUp: '2023-06-21',
    collectedDate: '2023-06-12',
  },
]

function formatDate(dateTimeStr: any) {
  const date: any = new Date(dateTimeStr);
  if (isNaN(date)) {
    return 'Invalid Date'; // Handles invalid date input
  }
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const initialComments = [
  {
    id: 1,
    leadId: 1,
    text: 'Interested in our new product line',
    timestamp: '2023-06-15 11:00 AM',
  },
  {
    id: 2,
    leadId: 1,
    text: 'Scheduled a follow-up call for next week',
    timestamp: '2023-06-15 2:30 PM',
  },
  {
    id: 3,
    leadId: 2,
    text: 'Not interested at the moment',
    timestamp: '2023-06-14 3:00 PM',
  },
]

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNjY2U5MzBiMDM4NGIyYzlkNDIxYjMiLCJpYXQiOjE3MjUyNzUyNTEsImV4cCI6MTcyNTg4MDA1MX0.MxOrDZFVjQcXFNJJ43O-fOfQZThvjrSuMsOLzlHfAoo"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIzN2QyNzJkNDRlZTM4NTdkYWU3MmIiLCJpYXQiOjE3MjUyODIxNzUsImV4cCI6MTcyNTg4Njk3NX0.nWKzUB9NZj7yrQOrmC-Lp744kdPg6BicMbtd0l0xqkM"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIzN2QyNzJkNDRlZTM4NTdkYWU3MmIiLCJpYXQiOjE3MjU4ODgxMDksImV4cCI6MTcyNjQ5MjkwOX0.SA8IvwE64BUy7X1TGAhhBqScSCYgsRzS01HCz7qa8f4"


const CircularProgress = ({ value, label }: any) => (
  <div className="relative   w-16 h-16">
    <div>
      <svg className="w-full h-full " viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="text-primary stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={`${2 * Math.PI * 40}`}
          strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center text-center justify-center">
        <span className="  text-sm font-bold">{value}%</span>
      </div>
    </div>

    <h5 className="text-xs sm:text-center text-gray-500">{label}</h5>
  </div>
)


function getFieldDataValue(lead: any, fieldName: any) {
  const field = lead.field_data.find((data: any) => data?.name === fieldName);
  return field ? field.values[0] : null;
}

const excludedKeys = ["email", "full_name", "phone_number", "created_time", "id", 'comment'];

export default function LeadsPage2() {

  const { userDetails } = useContext<any>(settingsContext)
  // const [leads, setLeads] = useState(initialLeads)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(initialComments)
  const [leadStatus, setLeadStatus] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLeadId, setSelectedLeadId] = useState<any>("")
  const [loadLeadData, setLoadLeadData] = useState(false)
  const [filterLeads2, setFilterLeads2] = useState<any>([])
  const [forFormLeads, setForFormLeads] = useState<any>([])
  const [allCampaigns, setAllCampaigns] = useState<any[]>([])
  const [isShowForm, setisShowForm] = useState(false)
  const [signleleads, setSignleleads] = useState<any>("")
  const [ratings, setRatings] = useState<any>({})  // Store ratings for each lead
  const [hover, setHover] = useState<any>({})  // To handle hover effect for each lead
  const [loadComment, setLoadComment] = useState(false)

  // query
  const { data: allCampaign, error: allCampaignError, isLoading: allCampaignLoading } = useQuery<any>({
    queryKey: ['allCampaign'],
    queryFn: () => getAllCampaignData(),
    staleTime: 1000 * 60, // Cache data for 24 hours
  });

  const { data: allLeads, error: allLeadsError, isLoading: allLeadsLoading, refetch } = useQuery<any>({
    queryKey: ['allLeads', selectedLeadId],
    queryFn: () => getAllLeadsData(selectedLeadId),
    staleTime: 1000 * 60, // Cache data for 24 hours
  });


  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

 

  const handleGradeChange = (id: any, newGrade: any) => {
    setRatings((prevRatings: any) => ({
      ...prevRatings,
      [id]: newGrade,
    }));

    handleUpdateRating(id, newGrade)

  }


  console.log("allCampaign", allCampaign)

  const handleCampaignChange = (campaignId: any) => {
      setSignleleads("")
      setisShowForm(false)
    // setSelectedCampaign(parseInt(campaignId))
    console.log("campaignId", campaignId)
    const singlecampaigndata = allCampaigns?.filter((val: any) => val?.campaign_id === campaignId);
    if (singlecampaigndata) {
      const Name = singlecampaigndata[0]?.name;
      setSelectedCampaign(campaignId)
      // setSelectedCampaign(Name)
      // setSelectedCampaign()
      console.log("singlecampaigndata", singlecampaigndata[0]?.name)
    }

    setSelectedLeadId(campaignId)


  }



  const getAllLeads = (allLead: any) => {
    console.log("alda;dasd", allLead)
    if (allLead) {

      const data = allLead;


      console.log("allea", data)
      if (data) {

        const leadsdata = [];
        data?.all_leads?.forEach((val: any) => {
          const leadsarray: any[] = []
          const allleads = [leadsarray, ...val]
          if (allleads?.length) {
            leadsdata.push(allleads)
          }
        })
        if (leadsdata?.length) {
          //  console.log("leadsdata", leadsdata)
        }
        const transformedLeads = data?.all_leads?.flat()?.map((lead: any) => ({

          time: lead?.created_time,
          name: getFieldDataValue(lead, "full_name") || getFieldDataValue(lead, "question1"),
          phone: getFieldDataValue(lead, "phone_number") || getFieldDataValue(lead, "question3"),

          id: lead?.id,
          type: lead?.type ? lead?.type : '',
          rating: lead?.rating ? lead?.rating : 0,
          leadBucket: lead?.leadBucket ? lead?.leadBucket : "",
          updatedAt: lead?.updatedAt ? lead?.updatedAt : '',
          comment: lead?.comment?.length > 0 ? lead?.comment : []
          // Add more properties as needed
        }));

        if (transformedLeads) {
          // console.log("transformedLeads", transformedLeads)
          setFilterLeads2(transformedLeads)
        }
      }



      if (data) {

        const leadvalue = data?.all_leads?.flat()
        if (leadvalue) {


          let leadsResult: any[] = [];

          leadvalue.forEach((val: any) => {
            let innerlead: any = {}

            val?.field_data?.forEach((data: any) => {
              innerlead[data?.name] = data?.values[0];
              innerlead['created_time'] = val?.created_time;
              innerlead['id'] = val?.id;
              innerlead['comment'] = val?.comment;

            });
            if (Object.keys(innerlead)?.length) {
              leadsResult.push(innerlead)
            }
          });

          if (leadsResult?.length) {

            // Get a set of all unique keys in the array
            const allKeys = Array.from(new Set(leadsResult?.flatMap(obj => Object.keys(obj))));

            // Update each object to include all keys with values or null
            const updatedArray = leadsResult?.map(obj => {
              const updatedObj = { ...obj };
              allKeys.forEach(key => {
                if (!obj.hasOwnProperty(key)) {
                  updatedObj[key] = null;
                }
              });
              return updatedObj;
            });
            if (updatedArray?.length > 0) {
              setForFormLeads(updatedArray)
            }

          }
        }
      }


    }

  }
  //  console.log("allLeads", allLeads)
  useEffect(() => {
    if (allLeads) {
      getAllLeads(allLeads)
    }
  }, [allLeads]) 

  const getAllCampaignData2 = async (allCampaigndata: any) => {

    if (allCampaigndata) {
      const data = allCampaigndata;
      if (data?.length>0) {
        setAllCampaigns(data)
        setSelectedCampaign(data[0]?.campaign_id)
        setSelectedLeadId(data[0]?.campaign_id)

      } else {
        setAllCampaigns([])
      }

    }

  }

  useEffect(() => {
    if (allCampaign?.length > 0) {
      getAllCampaignData2(allCampaign)
    }
  }, [allCampaign])

  const handleAdComment = async (leadid: any) => {
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
          setFilterLeads2(filterLeads2?.map((lead:any) => 
            lead.id === leadid ? { ...lead, comment:commentarr } : lead
          ))
          setSignleleads((prevState: any) => ({
            ...prevState,
            comment:commentarr, // Append the new comment
          }));

          setComment("")
          refetch()
        }
      }
    } catch (error) {
      console.log(error)

    } finally {
      setLoadComment(false)
    }
  }

  const handleCommentSubmit = (e: any, id: any) => {
    e.preventDefault()
    handleAdComment(id)
  }



  // console.log("getall", allCampaigns)


  const SendleadsToForm = (id: string) => {
    // setIsRowSlelect(id)
    // scrollToTop()
    const filterleadsForm = forFormLeads?.filter((val: any) => val?.id === id)
    if (filterleadsForm?.length) {
      setisShowForm(true)
      setSignleleads(filterleadsForm[0])
    }

  }


  const handleBucketChnage = async (id: any, bucketName: any) => {
    console.log(id, bucketName)
    const body = {
      leadId: id,
      leadBucket: bucketName
    }

    try {
      const res = await Axios.post("/update-lead", body)
      if (res.status === 200 && res?.data?.valid) {

        const updatedData: any = filterLeads2?.map((item: any) =>
          item?.id === id
            ? { ...item, leadBucket: bucketName }
            : item
        );
        if (updatedData?.length > 0) {
          setFilterLeads2(updatedData);
        }
        refetch()
      } else {
        alert("failed")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  // updated rating
  const handleUpdateRating = async (id: any, rating: any) => {

    const body = {
      leadId: id,
      rating: rating
    }

    try {
      const res = await Axios.post("/update-lead", body)
      if (res.status === 200 && res?.data?.valid) {
        setFilterLeads2(filterLeads2?.map((lead:any) => 
          lead.id === id ? { ...lead, rating: rating } : lead
        ))

        refetch()
       
      } else {
        alert("failed")
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  // console.log("signleleads", signleleads)


   console.log("filterleads", filterLeads2)

   const handleRatingChange = (leadId: string, newRating: number) => {
    handleUpdateRating(leadId, newRating)

  }

  // console.log("selectedCampaign", selectedCampaign)
  return (
    <div className="flex flex-row justify-right">
      <div className="flex flex-col  h-screen w-[74rem] overflow-auto">
        <div className="head-section md:border-b flex flex-col items-center h-96 pt-1 sm:pt-0 sm:p-1 md:p-4 sm:h-32 sm:flex-row sm:justify-between">
          <div className="w-2/4 flex flex-row min-[500px]:gap-12 max-[500px]:flex-col">
            <Label className="text-lg sm:text-xl md:text-2xl mb-2 block max-[500px]:text-center">
              Campaign
            </Label>
            <Select
               value={selectedCampaign}
              onValueChange={handleCampaignChange}
            >
              <SelectTrigger value={selectedCampaign?.toString()} className="w-full">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent>
                {allCampaigns?.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.campaign_id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-8">
            <CircularProgress
              value={0}
              label="Feedback Coverage"
            />
            <CircularProgress value={0} label="Lead Quality" />
          </div>
        </div>
        <div className="main-section flex flex-col  sm:flex-row md:overflow-hidden">

          {allLeadsLoading ? <LeadsSkelton /> : (<>
            <div className="leads-list w-full md:w-4/6 p-4 border-r md:overflow-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Leads
              </h2>
              <ScrollArea className="">

                {filterLeads2.map((lead: any) => (
                  <div
                    key={lead.id}
                    className="mb-2 py-2 px-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => SendleadsToForm(lead.id)}
                  >
                    <div className="card_first_row flex flex-col  md:flex-row justify-between mb-2">
                      <div className="lead_contact flex flex-col md:flex-row justify-start ">
                        <h3 className="lead_name text-xl sm:text-2xl font-semibold">
                          {lead?.name}
                        </h3>
                        <div className="lead_status my-1   md:ml-4 text-base text-gray-600 flex items-center">
                        
                         {lead?.leadBucket?<span>{lead?.leadBucket}</span>:''} 
                          {/* <DropdownMenuRadioGroupDemo

                            defaultBucket={'Select Lead Bucket'}
                            onBucketChange={(newBucket) =>
                              handleBucketChnage(lead?.id, newBucket)
                              // console.log(`Bucket changed to: ${newBucket}`)
                            }

                          /> */}
                        </div>
                      </div>
                      <div className="lead_number text-sm md:text-lg text-gray-600 flex items-end sm:items-center">
                        <PhoneIcon className="w-5 h-5 mr-1 " />
                        {lead?.phone}
                      </div>
                    </div>
                    <div className="card_second_row flex flex-col justify-between items-start mb-2">
                      {/* <div className="lead_rating flex mr-4">
                        {[...Array(10)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-4 h-4 md:w-5 md:h-5 ${(hover[lead.id] || ratings[lead.id]) > index
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                              }`}
                            onMouseEnter={() => setHover({ ...hover, [lead.id]: index + 1 })}
                            onMouseLeave={() => setHover({ ...hover, [lead.id]: null })}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleGradeChange(lead.id, index + 1)
                            }}
                          />
                        ))}
                      </div> */}

                      <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${star <= lead?.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRatingChange(lead.id, star)
                    }}
                  />
                ))}
              </div>

                      <div className="text-base md:text-lg my-2 text-gray-600 flex items-center mt-1">
                        <CalendarIcon className="w-5 h-5 mr-1" />
                        Collected: {formatDate(lead?.time)}
                      </div>
                      <div className="text-base md:text-lg text-gray-600 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-1" />
                        Last follow-up: {formatDate(lead.updatedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <div className="form-section w-full md:w-2/6 p-4 md:overflow-auto">
              {isShowForm ? (
                <div>
                  <div className="">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                      {signleleads?.name}
                    </h1>
                    <div className="flex flex-row">
                      <p className="text-gray-400">Contact Number :</p>
                      <p className="text-purple-400">{signleleads?.phone_number}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-gray-400">Email :</p>
                      <p className="text-purple-400">{signleleads?.email}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />


                  <div className="lead_status my-1   md:ml-4 text-base text-gray-600 flex items-center">
                    <DropdownMenuRadioGroupDemo

                      defaultBucket={'Select Lead Bucket'}
                      onBucketChange={(newBucket) =>
                        handleBucketChnage(signleleads?.id, newBucket)
                        // console.log(`Bucket changed to: ${newBucket}`)
                      }
                    />
                  </div>



                  <p style={{ fontSize: '20px', fontWeight: '700' }} className='text-start'>Form Answer</p>


                  {signleleads && Object.keys(signleleads)?.map(key => (
                    !excludedKeys.includes(key) && (

                      <>
                        {signleleads[key]?.length > 0 ? <div className='' key={key}>
                          <p className='text-start pb-0 mb-0 ' style={{ color: 'rgba(110, 110, 110, 1)', fontSize: '.92rem', fontWeight: '500' }}><b>Ques.</b>&nbsp;<span className=''>{key && key?.charAt(0)?.toUpperCase() + key?.slice(1)?.replace(/_/g, ' ')}</span> </p>
                          <p className='text-start fw-bold ' style={{ fontSize: '600' }}><b>Ans.</b>&nbsp;{signleleads[key]?.replace(/_/g, ' ')}</p>
                        </div> : null}

                      </>
                    )
                  ))}


                  <ScrollArea className="h-64 mb-4">
                    {

                      signleleads?.comment?.map((comment: any, idx:number) => (
                        <div
                          key={idx+1}
                          className="mb-4 p-3 bg-gray-100 rounded-lg"
                        >

                          <div className="flex mb-2">
                            {/* <span className="font-bold text-sm text-gray-500 antialiased box-border font-sans leading-5 my-1 text-[14px]">
                            Ans:
                          </span> */}
                            <p className="font-bold text-sm text-gray-500 antialiased box-border font-sans leading-5 my-1 text-[14px]">
                              {comment?.comment?comment?.comment:""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </ScrollArea>
                  <form onSubmit={(e) => handleCommentSubmit(e, signleleads?.id)}>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your discussion notes here..."
                      className="mb-2"
                    />
                    <Button disabled={loadComment?true:false} type="submit">Add Comment</Button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                  Select a lead to view details
                </div>
              )}
            </div>
          </>)}


        </div>
      </div>
    </div>
  )
}
