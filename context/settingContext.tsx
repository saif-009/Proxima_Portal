'use client'
import Axios from "../Axios/Axios";
import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";


import { usePathname } from 'next/navigation'
interface UserProfile {
  // Define the shape of the user profile here
  id: string;
  name: string;
  email: string;
}

interface SettingsContextType {
 

  loadUser: any;
  allCampaignDataList:any;
  setAllCampaignDataList:any;
  signupEmail:any
  setSignupEmail:any;
  setUserDetails:any;
  userDetails:any;
  setLoadUser:any;
  activeAdAccount:any;
   setActiveAdAcount:any;
   allWorkSpace:any;
   getAllWorkSpace:any;
   setAllWorkSpace:any;
   allTeamMember:any; 
   setAllTeamMember:any;
   getAllTeamMember:any;
   getUserDetails:any;
   gooleLoginName:any,
   setGooleLoginName:any
  
  

}

export const settingsContext = createContext<SettingsContextType | undefined>(undefined);


const ProfilePageProvider = ({ children }: { children: ReactNode }) => {
  

  const [loadUser, setLoadUser] = useState(false);
  const [allCampaignDataList, setAllCampaignDataList] = useState([])
  const [signupEmail, setSignupEmail] = useState("")
  const [userDetails, setUserDetails] = useState("")
  const [gooleLoginName, setGooleLoginName] = useState("")
  const [activeAdAccount, setActiveAdAcount] = useState("")
  const [allWorkSpace, setAllWorkSpace] = useState<any[]>([])
  const [allTeamMember, setAllTeamMember] = useState<any[]>([])
  const pathname = usePathname()

  const getUserDetails = async ()=>{
    setUserDetails("")
       try {
          const res = await Axios.get("/get-user")
            if(res.status===201){ 
                const data  = res.data?.user;
                setUserDetails(data)
            }
       } catch (error) {
        setUserDetails("")
       }
  }

  useEffect(()=>{
    if(pathname==="/login" || pathname==='/signup') return 
    getUserDetails()
  },[])


// all workspace
const getAllWorkSpace = async () => {
  setAllWorkSpace([])
  try {
    const res = await Axios.get('/get-all-workspaces',)
    if (res.status === 200) {
      const data = res?.data?.message;
      // console.log("allworkspace", data)
        setAllWorkSpace(data)

    }
  } catch (error) {
  } finally {
  }
}

useEffect(()=>{
  if(pathname==="/login" || pathname==='/signup') return 
    getAllWorkSpace()
   
},[])

// getall team member
const getAllTeamMember = async () => {
  setAllTeamMember([])
  try {
    const res = await Axios.get('/get-team-member')
    if (res.status === 200) {
      const data = res?.data?.teamMembers;
        setAllTeamMember(data)

    }
  } catch (error) {
  } finally {
  }
}

useEffect(()=>{
   if(pathname==="/login" || pathname==='/signup') return 
  getAllTeamMember()
},[])

  return (
    <settingsContext.Provider value={{ loadUser, setLoadUser, allCampaignDataList, signupEmail, setSignupEmail, getUserDetails, setUserDetails, userDetails, activeAdAccount, setActiveAdAcount, getAllWorkSpace, allWorkSpace, setAllWorkSpace, allTeamMember, setAllTeamMember, getAllTeamMember, setAllCampaignDataList, gooleLoginName, setGooleLoginName }}>
      {children}
    </settingsContext.Provider>
  );
};

export default ProfilePageProvider;
