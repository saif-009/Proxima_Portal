
"use client"
import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../../../../components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../../../../components/ui/dialog";
import { Button } from "../../../../../../components/ui/button";
import { Label } from "../../../../../../components/ui/label";
import { Input } from "../../../../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../../../components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeamMember, fetchTeamMembers, removeTeamMember } from "../../setting-page-api/SettingPageApi";
import { settingsContext } from "../../../../../../../context/settingContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "../../../../../../components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../../../../../../components/ui/toast";

// Define Zod schema for form validation
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z
  .string()
  .length(10, "Mobile number must be exactly 10 digits")
  .regex(/^\d{10}$/, "Mobile number must only contain digits"),
  workspace_id: z.string().min(1, "Workspace is required"),
  role_id: z.string().min(1, "Role is required"),
});

// Define TypeScript types for form data
type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMembersProps {
  memberRole: Array<{ id: string; name: string }>;
}

export default function TeamMembers({ memberRole, refetch }: any) {
  const { getAllTeamMember, allWorkSpace } = useContext<any>(settingsContext);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  
  // React Hook Form setup with Zod resolver and TypeScript typing for form data
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
  });

  const maxMembers = 5 * 3; // Example of 5 members per workspace, 3 workspaces

  // Fetching team members using React Query
  const { data: allTeamMembers = [], isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
    staleTime: 1000 * 30,
  });

  // Adding a team member using React Query Mutation
  const mutationAddMember = useMutation({
    mutationFn: addTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      setIsOpen(false);
      toast({title:'Success', description:'Team member created'})
      getAllTeamMember();
      refetch()
    },
    onError: (error: any) => {
       console.log(error?.response?.data?.message, "error")
      toast({
        title: "Failed",
        description:error?.response?.data?.message?error?.response?.data?.message:'Faield to add team member',
        action: <ToastAction altText="">Try Again</ToastAction>,
      });
    },
  });

  // Handle adding a new member
  const AddTeamMember: SubmitHandler<TeamMemberFormData> = (data) => {
    mutationAddMember.mutate(data);
  };

   // Removing a team member using React Query Mutation
   const mutationRemoveMember = useMutation({
    mutationFn:removeTeamMember,
    onSuccess: () => {
      // Refetch team members after removing one
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      getAllTeamMember();
      refetch()
      toast({title:'Success', description:'Team member removed'})
    },
  });

  // Handle removing a member
  const handleRemoveMember = (id: any) => {
    mutationRemoveMember.mutate(id);
  };

  console.log("mutationAddMember?.error", mutationAddMember?.error)

  return (
    <div className="py-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              You are using {allTeamMembers.length} out of {maxMembers} available member slots.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Team Member List */}
          {allTeamMembers.length > 0 && (
            <div className="mt-4 space-y-2 dark:bg-black rounded-sm">
              {allTeamMembers?.map((member: any) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2  rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({member.mobile})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{member.email}</span>
                    <Button
                    className='dark:bg-[#383838] dark:text-white'
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger disabled={allTeamMembers?.length === 15} asChild>
              <Button variant="outline" className='dark:bg-[#383838] dark:text-white mt-4' >
                + Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member to a particular workspace.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(AddTeamMember)}>
                <div className="grid gap-4 py-4">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      {...register("name")}
                      id="name"
                      placeholder="Enter team member's name"
                    />
                    <p className="text-red-600 text-sm ">{errors.name && errors.name.message}</p>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      {...register("mobileNumber")}
                      id="mobileNumber"
                      placeholder="Enter mobile number"
                    />
                    <p className="text-red-600 text-sm ">{errors.mobileNumber && errors.mobileNumber.message}</p>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      placeholder="Enter email"
                    />
                    <p className="text-red-600 text-sm ">{errors.email && errors.email.message}</p>
                  </div>

                  {/* Workspace */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="workspace">Workspace</Label>
                    <Select
                      onValueChange={(value) => setValue("workspace_id", value)}
                    >
                      <SelectTrigger id="workspace">
                        <SelectValue placeholder="Select Workspace" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {allWorkSpace?.map((val: any) => (
                          <SelectItem key={val.id} value={val.id}>
                            {val.workspace?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-600 text-sm ">{errors.workspace_id && errors.workspace_id.message}</p>
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="role" className="">Role</Label>
                    <Select
                      onValueChange={(value) => setValue("role_id", value)}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {memberRole?.map((val: any) => (
                          <SelectItem key={val.id} value={val.id}>
                            {val.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-600 text-sm">{errors.role_id && errors.role_id.message}</p>
                  </div>

                </div>
                <div className="">
                  <Button className='dark:bg-[#383838] dark:text-white' type="submit">Add Member</Button>

                </div>
              </form>
              <p className="w-full text-red-600 text-[12px]">{mutationAddMember?.error?.response?.data?.message?mutationAddMember?.error?.response?.data?.message:''}</p>

            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
