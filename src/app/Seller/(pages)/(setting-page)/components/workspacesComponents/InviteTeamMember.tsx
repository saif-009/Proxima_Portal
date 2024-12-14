'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Users } from "lucide-react"
import Axios from '@/Axios/Axios'



export default function InviteTeamMemberPopup({ allTeamMember, activeWorkspace,  getWorkSpaceDetails }:any) {
  const [isOpen, setIsOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<any[]>([])

  useEffect(() => {
    setTeamMembers(allTeamMember)
  }, [allTeamMember])

  const inviteMember = async (member:any) => {
    try {
      const body = {
        userId: member.id,
        workspaceId: activeWorkspace
      }
      const res = await Axios.post("/assign-workspace", body)
      
      if (res.status === 200) {
       
        setTeamMembers(prevMembers =>
          prevMembers.map(m =>
            m.id === member.id ? { ...m, invited: true } : m
          )
        )
        getWorkSpaceDetails(activeWorkspace)
      }
    } catch (error) {
      console.error("Error inviting member:", error)
    //   alert("Failed to invite member. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=' dark:bg-[#383838] text-white'>Invite Members</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {teamMembers.map((member:any) => (
            <div key={member.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm">{member.email}</p>
                <p className="text-xs">{member.mobile}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => inviteMember(member)}
                disabled={member?.invited}
              >
                {member.invited ? 'Invited' : 'Invite'}
                <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}