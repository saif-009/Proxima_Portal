"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Chrome, Facebook, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import googleicon from '../../../../../../public/google icon.svg'
// import ConnectToFacebook from './ConnectToFacebook'

import Axios from '@/Axios/Axios'
const ConnectToFacebook = dynamic(
  () => import('./ConnectToFacebook'),
  { ssr: false }
)

import ShowAndConnectPage from './ShowAndConnectPage'
import LinkAdAccounts from './LinkAddAccounts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RefreshCw } from 'lucide-react'
import { settingsContext } from '@/context/settingContext'
import dynamic from 'next/dynamic'
import GoogleAdsIntegration from './google-integration/GoogleIntegration'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import ActivatedAdAccountPopup from './ActivatedAdAccountPopup'
import {RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { string } from 'yup'
import { activeAccountAtom } from '@/store/activeAdAccount'
import { useRecoilState } from 'recoil'

const accesstoken = "EAAO9e3ZAvFL4BOZB27xWdxu0748iTOUxSbsFMDc0yrCUUUHfgEZCQyOvxnAzdpD2c6HEjMHZBqFW3WAZCjmKIYQAU7iGGpeARKbkKFkr6VAGOnCNFd4r3XYhSAwTF1aILg5ZCsHGXGyZC7v8sxzxgaxd0jjdPckRZAD1wILTIaxEpmKZCxka8Txup1t3iAbB1jzSwD2uzZB4ncSIp3rWRzDLYZD"
// const tokenn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRjMmMwZDZiYWJlYjE0ZDYyNzU3MWUiLCJpYXQiOjE3MjU5NzAxMDAsImV4cCI6MTcyNjU3NDkwMH0.pUlsO7FFNak9ZHSx5gGg_YsTmaP5aZGLDzq5RKLygik"
//const accesstoken = "EAAO9e3ZAvFL4BO4AflXDW4IbDxl8VbP9Od5vKZBWqOHcO8LzwpnFZB9ZBmqW63dkTzjNvDzmrB0ido5rP3ZBETSu0w4w8mVg1Cim2sriCOTyarbVZBjBlLvnKUXZCPQMQtjsnYnp4pGT5aLuwrO0ZCL7ZCivF18nuiosEpgrHhZBLFggiDZBiWbnuAatufVHGskzVUhI5f4pk9vcWitDYVuGgZDZD"

function Integrations({ fbPages, getWorkSpaceDetails, activeWorkspace, workSpaceMesaage, adAccountDetails,workspaceDetails }: any) {
  const [brandTones, setBrandTones] = useState(['Professional', 'Innovative', 'Trustworthy'])
  const searchParams = useSearchParams()
  const [showList, setShowList] = useState(false)
  const [accessibleAccount, setaccessibleAccount] = useState([])
  const [linkedGoogleAccount, setLinkedGoogleAccount] = useState<any>(null);
  const [newTone, setNewTone] = useState('')
  const [userName, setUserName] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [fetchFbPageLoad, setFetchFbPageLoad] = useState(false)
  const [activetedAdAccountName, setActivatedAdAccountName] = useState<any>([])
 
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  // const [facebookPages, setFacebookPages] = useState([
  //   { id: 1, name: 'Luxury Properties in Goa', connected: false },
  //   { id: 2, name: 'TechGrow Community', connected: false },
  //   { id: 3, name: 'TechGrow Support', connected: false },
  // ])
  // const [workspaces, setWorkspaces] = useState([
  //   { id: 1, name: "TechGrow", url: "techgrow.com", logo: "/placeholder.svg?height=50&width=50", tone: "Professional", category: "Technology", isDefault: true },
  //   { id: 2, name: "EcoFashion", url: "ecofashion.com", logo: "/placeholder.svg?height=50&width=50", tone: "Friendly", category: "Fashion", isDefault: false },
  // ])

  // const handleLinkClick = () => {
  //   setShowList(true)
  // }

  
  console.log('activetedAdAccountName from integrations', activetedAdAccountName)

// google integration
const googleToken = searchParams.get('code')

const generateGoogleRefreshToken = async (googletoken: string) => {
  try {
    const res = await Axios.get(`/generate-refresh-token?code=${googletoken}`);
    if (res?.status === 200 && res?.data?.valid) {
      const data = res?.data;
      console.log("google token", data);
    }
  } catch (error) {
    console.log("error", error);
  }
};


useEffect(() => {
  console.log("workspace details: ",workspaceDetails);

},[workspaceDetails])

// console.log(workspaceDetails);
const getListOfGoogleAccount = async () => {
  if (isLoadingAccounts) return; // Prevent multiple simultaneous calls
  
  try {
    setIsLoadingAccounts(true);
    const res = await Axios.get("/list-of-accounts");
    
    if (res.status === 200 && res?.data?.valid) {
      const newAccounts = res.data.message?.[0]?.customers || [];
      console.log(newAccounts);
      setaccessibleAccount(prevAccounts => {
        // Only update if there are actual changes
        if (JSON.stringify(prevAccounts) === JSON.stringify(newAccounts)) {
          return prevAccounts;
        }
        return newAccounts;
      });
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
    setaccessibleAccount([]);
  } finally {
    setIsLoadingAccounts(false);
  }
};

// Using useEffect for state synchronization
useEffect(() => {
  if (googleToken) {
    const handleAuthentication = async () => {
      try {
        await generateGoogleRefreshToken(googleToken);
        // Wait a bit for the backend to process the token
        setTimeout(() => {
          getListOfGoogleAccount();
        }, 1000);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    handleAuthentication();
  }
}, [googleToken]);

// Using useEffect for periodic updates
/**
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoadingAccounts) {
        getListOfGoogleAccount();
      }
    }, 10000); // Check every 10 seconds
  
    return () => clearInterval(interval);
  }, [isLoadingAccounts]);
*/

// Track state updates with useEffect
useEffect(() => {
  console.log("Accessible accounts updated:", accessibleAccount);
}, [accessibleAccount]);
/**
  useEffect(()=>{
   getListOfGoogleAccount()
  },[accessibleAccount])
 */ 

  const onSelectAdAccount = async (accountid:any)=>{
       try {
        const body = {adaccountId:accountid}
        const res = await Axios.post("/connect-adaccount", body)
          if(res?.status===200 && res?.data?.val){
            getWorkSpaceDetails(activeWorkspace)
          }
       } catch (error) {
        console.log("error", error)
       }
      
  }
  const handleGoogleAccountLinked = async (accountId: any) => {
    try {
      setLinkedGoogleAccount(accountId);
      await getWorkSpaceDetails(activeWorkspace);
      await getListOfGoogleAccount();
    } catch (error) {
      console.error("Error handling account link:", error);
    }
  };
  const handleAccountSelect = (value: string) => {
    setSelectedAccount(value)
    onSelectAdAccount(value)
  }

  const handleReconnect = () => {
    setShowList(false)
    setSelectedAccount(null)
  }

  const addTone = () => {
    if (newTone && !brandTones.includes(newTone)) {
      setBrandTones([...brandTones, newTone])
      setNewTone('')
    }
  } 

  const removeTone = (tone: any) => {
    setBrandTones(brandTones.filter(t => t !== tone))
  }

  // const togglePageConnection = (pageId: any) => {
  //   setFacebookPages(facebookPages.map(page =>
  //     page.id === pageId ? { ...page, connected: !page.connected } : page
  //   ))
  // }

  // const deleteFacebookPage = (pageId: any) => {
  //   setFacebookPages(facebookPages.filter(page => page.id !== pageId))
  // }

  // const setDefaultWorkspace = (id: any) => {
  //   setWorkspaces(workspaces.map(workspace => ({
  //     ...workspace,
  //     isDefault: workspace.id === id
  //   })))
  // }
  // console.log("adAccountDetails", adAccountDetails)
useEffect(()=>{
    if(adAccountDetails){
       const activatedadaccount = adAccountDetails?.fbAdAccount;
        if(activatedadaccount){
          setSelectedAccount(activatedadaccount)
          // setSelectedAccount("")
        }else{
          setSelectedAccount(null)
        }
      
    }
},[adAccountDetails])

console.log("adAccountDetails?.fbAdAccount", adAccountDetails?.fbAdAccount)
  //  console.log("clientPages", clientPages)
  // console.log("activeWorkspac", activeWorkspace)
  //get facebook pages 
  const handelClientsPage = async (token: any) => {
     setFetchFbPageLoad(true);
    const body = {
      access_token: token
    }
    try {
      const res = await Axios.post(`/user-pages`, body);
      if (res.status === 200) {
        if (res?.data?.valid) {
          getWorkSpaceDetails(activeWorkspace)

        } else {
          // setFetchFbPageLoad(false);
        }
      }
    } catch (error) {

    } finally {
      setFetchFbPageLoad(false);
    }
  };

  
useEffect(()=>{
  // console.log("activeAdAccountName", "activeAdAccountName")
    if(adAccountDetails?.adAccountList?.length>0 && selectedAccount?.length>0){
         const activeAdAccountName = adAccountDetails?.adAccountList?.filter((val:any)=>val?.id === selectedAccount);
         console.log("activeAdAccountName", activeAdAccountName)
         if(activeAdAccountName){
          setActivatedAdAccountName(activeAdAccountName)
         }
        
    }
},[adAccountDetails, selectedAccount])


// console.log("selectedAccount123", selectedAccount)

  return (
    <>
   
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className=" ">
              
              <div><Facebook className="h-5 w-5 text-blue-600 inline-block" /> Facebook Integration</div>
          

            </CardTitle>
          </CardHeader>
          <CardContent>
           
                {/* <ConnectToFacebook handelClientsPage={handelClientsPage} fetchFbPageLoad={fetchFbPageLoad}  /> */}
                {/* <LinkAdAccounts/> */}               
                  
                    {(adAccountDetails?.adAccountList?.length > 0 && workSpaceMesaage?.category === 'userDefined' && selectedAccount?.length>0) ? (
                      // <Select onValueChange={handleAccountSelect} disabled={selectedAccount?true:false} value={selectedAccount || undefined}>
                      //   <SelectTrigger className="w-full">
                      //     <SelectValue placeholder="Select Ad Account" />
                      //   </SelectTrigger>
                      //   <SelectContent>
                      //     {adAccountDetails?.adAccountList?.map((val:any)=>(
                      //       <>
                      //        <SelectItem key={val?.id} value={val?.id}>{val?.name}</SelectItem>
                      //       </>
                      //     ))}
                         
                        
                      //   </SelectContent>
                      // </Select>
                      <div className='border flex items-center justify-start gap-1 dark:border-gray-600 p-2 rounded-sm'>
                         <div className=''>
                         <RadioGroup defaultValue="checked">
                         <RadioGroupItem value="checked" id="r2" />
                         </RadioGroup>
                         </div>
                        
                       <p>{activetedAdAccountName[0]?.name}</p> 
                        </div>

                    ) :adAccountDetails?.adAccountList?.length > 0? (
                      <ActivatedAdAccountPopup adAccountList={adAccountDetails?.adAccountList} getWorkSpaceDetails={getWorkSpaceDetails} activeWorkspace={activeWorkspace} />
                      // <ConnectToFacebook handelClientsPage={handelClientsPage} fetchFbPageLoad={fetchFbPageLoad} text={workSpaceMesaage?.category === 'userDefined'?"Link Ad A/C":'Add Pages'} />
                    ):(<>
                      <ConnectToFacebook handelClientsPage={handelClientsPage} fetchFbPageLoad={fetchFbPageLoad} />
                    
                    </>)}
                   
                   
                   
                    {/* {selectedAccount && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        Selected account: {selectedAccount}
                      </p>
                    )} */}
                 
             
          </CardContent>
        </Card>
        {workSpaceMesaage?.category === 'userDefined' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image src={googleicon} width={30} height={30} alt="google icon" />
              Google Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleAdsIntegration 
              accessibleAccounts={accessibleAccount}
              isLoading={isLoadingAccounts}
              onAccountLinked={handleGoogleAccountLinked}
              workspaceDetails={workspaceDetails}
            />
          </CardContent>
        </Card>
      )}

      </div>
      <div>
        {workSpaceMesaage?.category === 'userDefined' ? (<>
         {adAccountDetails?.fbPages?.length > 0 &&  
        <div className=' max-w-[48%]'> 
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fb-pages">
              <AccordionTrigger>FB Pages</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {adAccountDetails?.fbPages?.map((page:any) => (
                    <li  key={page?.id} className="text-sm border rounded-sm p-2">{page?.name}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion></div>} 
        

        </>) : (<>
        
          {/* <div>
            <p className='mt-3 font-bold'>Facebook Pages</p>
            <ShowAndConnectPage getWorkSpaceDetails={getWorkSpaceDetails} activeWorkspace={activeWorkspace} fbpage={fbPages} />
          </div> */}
        </>)}
      </div>

    </div>
    
  {/* (<>
    
       <ActivatedAdAccountPopup adAccountList={adAccountDetails?.adAccountList} getWorkSpaceDetails={getWorkSpaceDetails} activeWorkspace={activeWorkspace} />
    
    </>) */}
   
</>
  )
}

export default Integrations;

