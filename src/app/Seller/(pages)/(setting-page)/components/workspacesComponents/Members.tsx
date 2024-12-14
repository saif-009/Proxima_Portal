

import React, { useContext, useEffect, useState } from 'react'
import InviteTeamMemberPopup from './InviteTeamMember'
import { settingsContext } from '@/context/settingContext'


function Members({teamsDetails, activeWorkspace, getWorkSpaceDetails}:any) {
   const {allTeamMember} = useContext<any>(settingsContext)
   const [filterMember, setFilterMember] = useState<any>([])
  
    useEffect(()=>{
      const filteredMembers = allTeamMember.filter((member:any) => {
        // Check if the member id is not present in allselectedMember's user object
        return !teamsDetails?.some((selectedMember:any) => selectedMember?.user?.id === member?.id);
    });

    if(filteredMembers?.length>0){
      setFilterMember(filteredMembers)
    }
       
    },[teamsDetails, allTeamMember])


console.log("teamsDetails", teamsDetails)


  return (
    <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Team Members ({teamsDetails?.length>0?teamsDetails?.length:0})</span>
                 
                  < InviteTeamMemberPopup getWorkSpaceDetails={getWorkSpaceDetails}  activeWorkspace={activeWorkspace} allTeamMember={filterMember}/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamsDetails?.map((val:any)=>(
                    <>
                      <div className="p-4 light:bg-gray-50 dark:bg-[#313131]  rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className='w-[40px] border-4 h-[40px] rounded-full flex justify-center items-center '>
                        <p>{val?.name?val?.name?.slice(0, 1):''}</p>
                       </div>
                      {/* <Image src="/placeholder.svg?height=40&width=40" width={40} height={40} alt="User avatar" className="rounded-full" /> */}
                      <div>
                        <p className="font-medium">{val?.name?val?.name:''}</p>
                        <p className="text-sm text-muted-foreground">{val?.email?val?.email:''}</p>
                      </div>
                    </div>
                    
                  </div>
                    
                    </>
                  ))}
                 
                  
                </div>
              </div>
  )
}

export default Members