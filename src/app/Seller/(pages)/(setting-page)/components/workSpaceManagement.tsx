'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CircleCheckBig, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  PlusCircle,
  Zap,
  Globe,
  ShieldCheck,
  Settings,
  Users,
  Hash,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { headers } from 'next/headers'
import axios from 'axios'
import Integrations from './workspacesComponents/Integrations'
import Members from './workspacesComponents/Members'
import AdPreferences from './workspacesComponents/AdPreferences'
import Axios from '@/Axios/Axios'
import { settingsContext } from '@/context/settingContext'
import AdPreferences2 from './workspacesComponents/AdPreferences2'
import { useToast } from '@/hooks/use-toast'

export default function WorkSpaceManagement({allWorkSpace}:any) {
  const { getAllWorkSpace, getUserDetails, userDetails, tokens } = useContext<any>(settingsContext)
  const [activeWorkspace, setActiveWorkspace] = useState<any>('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [workspaceToDelete, setWorkspaceToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [adAccountDetails, setAdAccountDetails] = useState("")
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [teamsDetails, setTeamsDetails] = useState<any[]>([])
  const [workSpaceDetails, setWorkSpaceDetails] = useState({})
  const [workSpaceMesaage, setWorkSpaceMessage] = useState<any>('')
  const [fbPage, setFbPages] = useState<any>([])
  const [newTone, setNewTone] = useState('')
  const workspaceCardRef = useRef<any>(null);
  const [loadBrand, setLoadBrand] = useState<any>(false)
  const [workSpaceDetailsData, setWorkSPaceDetailsData] = useState<any>('')
  const [updateWorkSpaceLoad, setUpdateWorkSpaceLoad] = useState(false)
  const [loadWorkSpaceMgn, setLoadWorkSpaceMgn] = useState(false)
  const { toast } = useToast()
  const [loadCreateWorkSpace, setLoadCreateWorkSpace] = useState(false)
  const [branDetails, setBrandDetails] = useState<any>({
    brandName: '',
    brandUrl: '',
    description: '',
    logoUrl: '',
    category: '',
    brandTone: [],
  })


  useEffect(()=>{
    if (userDetails?.activeWorkspaceId) {
        console.log('workspace details', activeWorkspace)
        setActiveWorkspace(userDetails?.activeWorkspaceId)
      }
    
  },[userDetails?.activeWorkspaceId])

  const handleDeleteClick = (e: React.MouseEvent, workspace: any) => {
     
    e.stopPropagation() // Prevent card click event from firing
     if (workspace.workspace_id === userDetails?.activeWorkspaceId) {
      toast({
        title: "Cannot Delete Active Workspace",
        description: "Please switch to another workspace before deleting this one.",
        variant: "destructive",
      })
      return
    }
    setWorkspaceToDelete(workspace)
    setDeleteDialogOpen(true)
  }

  const handleDeleteWorkspace = async () => {
    if (!workspaceToDelete) return

    setIsDeleting(true)
    try {
      const response = await Axios.post('/delete-workspace', {
        workSpaceId: workspaceToDelete.workspace_id
      })
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Workspace deleted successfully",
        })
        getAllWorkSpace() // Refresh workspace list
        setDeleteDialogOpen(false)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete workspace",
      })
    } finally {
      setIsDeleting(false)
      setWorkspaceToDelete(null)
    }
  }


  const addTone = () => {
    // Get the current brandTone array
    const brandTone = [...branDetails.brandTone]

    // Add the new tone to the array
    if (newTone) {
      brandTone.push(newTone)
    }

    // Update the brandDetails state with the updated brandTone array
    setBrandDetails({
      ...branDetails,
      brandTone: brandTone,
    })

    // Optionally clear the newTone after adding it
    setNewTone('')
  }

  const removeTone = (index: any) => {
    const updatedTones = branDetails.brandTone.filter(
      (_: any, i: any) => i !== index,
    )
    setBrandDetails({ ...branDetails, brandTone: updatedTones })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const saveChanges = () => {
    // Save changes logic here
    setEditMode(false)
  }

  const updateWorkSpace = async () => {
    setUpdateWorkSpaceLoad(true)
    const body = {
      workspaceId: workSpaceMesaage?.id,
      brandName: branDetails?.brandName,
      brandTone:
        branDetails?.brandTone?.length > 0
          ? branDetails?.brandTone.join(', ')
          : '',
      brandDescription: branDetails?.description,
      brandCategory: branDetails?.category,
      brandUrl: branDetails?.brandUrl,
      brandLogoUrl: branDetails?.logoUrl,
    }
    try {
      const res = await Axios.post('/update-brand-details', body)
    } catch (error) {
    } finally {
      setUpdateWorkSpaceLoad(false)
    }
  }

  const createWorkspace = async () => {
    setLoadCreateWorkSpace(true)
    const body = {
      name: newWorkspaceName,
    }
    try {
      // const body = {}
      const res = await Axios.post('/create-workspace', body)
      if ((res.status === 200 || res.status === 201) && res?.data?.valid) {
        getAllWorkSpace()
        setDialogOpen(false)
        toast({
          title: "Success",
          description:res?.data?.message?res?.data?.message:'Workspace created' ,
        })
      }else{
        toast({
          title: "Error",
          description:res?.data?.message?res?.data?.message:'Server error' ,
        })
      }
    } catch (error:any) {
      console.log("error", error)
      toast({
        title: "Error",
        description:error?.response?.data?.message?error?.response?.data?.message:'Server error',
      })
    } finally {
      setLoadCreateWorkSpace(false)
    }
  }

  const getWorkSpaceDetails = async (id: any) => {
    setBrandDetails((prev: any) => ({
      ...prev,
      brandName: '',
      brandUrl: '',
      description: '',
      logoUrl: '',
      category: '',
      brandTone: [],
    }))
    try {
      // const body = {}
      const res = await Axios.get(
        `/get-workspace`,

        {
          params: { workSpaceId: id },
        },
      )

      if (res.status === 200) {
        setActiveWorkspace(id)
        const details = res.data
        setWorkSpaceDetails(details)
        console.log(workSpaceDetails);
        // message
        const messagedata = res?.data?.message
        if (messagedata) {
          setWorkSpaceMessage(messagedata)
        }

        const brand = res?.data?.brands || null
        setWorkSPaceDetailsData(brand)
        setBrandDetails((prev: any) => ({
          ...prev,
          brandName: brand?.brandName || '',
          brandUrl: brand?.brandUrl || '',
          description: brand?.brandDescription || '',
          logoUrl: brand?.brandLogoUrl || '',
          category: brand?.brandCategory || '',
          brandTone:
            brand?.brandTone.split(', ').map((item: any) => item.trim()) || '',
        }))

        const fbDetails = res?.data?.fbDetails?.fbPages?.slice(0, 3)
        const addAccountDetails = res?.data?.fbDetails;
        // console.log("fbDetails", fbDetails)
        if (fbDetails?.length > 0) {
          setFbPages(fbDetails)
        }
        if(addAccountDetails?.id){
          setAdAccountDetails(addAccountDetails)
        }else{
          setAdAccountDetails("")
        }

        // team details
        const teamdetails = res?.data?.team
        setTeamsDetails(teamdetails)
        setWorkSpaceDetails(details)
        console.log('details', details)
      }
    } catch (error) {
     
    } finally {
      setLoadWorkSpaceMgn(false)
      
    }
  }
  useEffect(() => {
    console.log('Updated workSpaceDetails:', workSpaceDetails)
  }, [workSpaceDetails])
  
  const ActivateWorkSpace = async (id: string) => {
    setLoadWorkSpaceMgn(true)
    if (id) {
      try {
        const res = await Axios.get(`/update-activated-workspace-id?workspaceId=${id}`)
        if (res.status === 200 || res.status === 201) {
         
          getUserDetails()
          getWorkSpaceDetails(id)
          handleScrollToWorkspaceDetails()
          // window.location.reload()
        }
      } catch (error) {
        console.log("error", error)
        setLoadWorkSpaceMgn(false)
      }finally{
        
      }
    }
  }

  useEffect(() => {
    console.log(workSpaceDetails);
    if (activeWorkspace) {
      console.log(activeWorkspace);
      ActivateWorkSpace(activeWorkspace)
    }
  }, [activeWorkspace])



  const saveBrandDetails = async () => {
    setLoadBrand(true)
    const body = {
      workspaceId: workSpaceMesaage?.id,
      brandName: branDetails?.brandName,
      brandTone:
        branDetails?.brandTone?.length > 0
          ? branDetails?.brandTone.join(', ')
          : '',
      brandDescription: branDetails?.description,
      brandCategory: branDetails?.category,
      brandUrl: branDetails?.brandUrl,
      brandLogoUrl: branDetails?.logoUrl,
    }
    try {
      const res = await Axios.post('/create-brand-details', body)
      if (res.status === 200) {
        setEditMode(false)
        toast({
          title: "Failed",
          description:res?.data?.message?res?.data?.message:'Brand details saved',
          
        });
      }
    } catch (error:any) {
      console.log('error', error)
      toast({
        title: "Failed",
        description:error?.response?.data?.message?error?.response?.data?.message:'Failed to add brand details',
        
      });
    } finally {
      setLoadBrand(false)
    }
  }


  const handleScrollToWorkspaceDetails = () => {
    if (workspaceCardRef.current) {
      workspaceCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  // console.log("allWorkSpace", allWorkSpace)

  return (
    <div className="container mx-auto p-4   min-h-screen overflow-auto mt-6">
      <h1 className="text-2xl font-semibold mb-8 text-left ">Workspace Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {allWorkSpace?.map((workspace: any) => (
          <Card
            onClick={() => ActivateWorkSpace(workspace.workspace_id)}
            key={workspace.id}
            className={`hover:shadow-lg cursor-pointer relative transition-shadow ${
              userDetails?.activeWorkspaceId === workspace.workspace_id
                ? 'border border-primary'
                : ''
            }`}
          >
           {userDetails?.activeWorkspaceId === workspace.workspace_id && (
              <span className='absolute right-3 top-3'>
                <CircleCheckBig className='text-[#2DC071] w-17 h-17' />
              </span>
            )}
             <span 
              className='absolute right-3 top-3 hover:text-red-500 transition-colors'
              onClick={(e) => handleDeleteClick(e, workspace)}
            >
              <Trash2 className={`w-5 h-5 ${userDetails?.activeWorkspaceId === workspace.workspace_id ? 'hidden' : ''}`} />
            </span>
           
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-[40px] flex justify-center items-center h-[40px] rounded-full border ">
                <p className=" font-bold uppercase">
                  {workspace?.workspace?.name
                    ? workspace?.workspace?.name?.slice(0, 1)
                    : ''}
                </p>
              </div>

              <div>
                <CardTitle className=' capitalize'>{workspace?.workspace?.name}</CardTitle>
                {/* <p className="text-sm text-muted-foreground">
                  {workspace?.workspace?.category}
                </p> */}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full dark:bg-[#383838] dark:text-white"
                
              >
                Manage Workspace
              </Button>
              <p className='text-[12px] text-muted-foreground mt-1'>Team Members : {workspace?.userCount}</p>
            </CardContent>
          </Card>
        ))}
       {allWorkSpace?.length === 50?'' : <Card className="border-dashed hover:border-solid hover:shadow-lg transition-all flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-center">New Workspace</CardTitle>
          </CardHeader>
          <CardContent className='mb-6'>
            <Button className="w-full dark:bg-[#383838] dark:text-white"  onClick={() => setDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Workspace
            </Button>
          </CardContent>
        </Card>} 
      
      </div>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="text-lg py-1 px-4">
          {50 - (allWorkSpace?.length > 0 ? allWorkSpace?.length : 0)} workspace
          remaining in your plan
        </Badge>
      </div>

      {/* work space details */}
      {workSpaceMesaage?.id?.length > 0 && (
        <Card className="mb-24" ref={workspaceCardRef}>
          <CardHeader>
            <CardTitle className="text-2xl flex justify-between">
              <span className=" capitalize bg-gradient-to-r from-[#DA5946] to-[#864D8E] inline-block text-transparent bg-clip-text">
                {workSpaceMesaage?.name || ''}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="brand">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="brand">
                  <Globe className="mr-2 h-4 w-4" /> Brand
                </TabsTrigger>
                <TabsTrigger value="integrations">
                  <Zap className="mr-2 h-4 w-4" /> Integrations
                </TabsTrigger>
               
                <TabsTrigger value="preferences2">
                  <Settings className="mr-2 h-4 w-4" /> Ad Preferences
                </TabsTrigger>
                <TabsTrigger value="compliance">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Compliance
                </TabsTrigger>
                <TabsTrigger value="members">
                  <Users className="mr-2 h-4 w-4" /> Team
                </TabsTrigger>
              </TabsList>
              {/* brands */}
              <TabsContent value="brand">
                <div className="grid grid-cols-1  gap-3">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Brand Name</label>
                      <Input
                        placeholder="Brand Name"
                        value={branDetails?.brandName}
                        onChange={(e) =>
                          setBrandDetails({
                            ...branDetails,
                            brandName: e.target.value,
                          })
                        }
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Brand URL</label>
                      <Input
                        placeholder="Brand URL"
                        value={branDetails?.brandUrl}
                        onChange={(e) =>
                          setBrandDetails({
                            ...branDetails,
                            brandUrl: e.target.value,
                          })
                        }
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Logo URL</label>
                      <Input
                        placeholder="Logo URL"
                        value={branDetails?.logoUrl}
                        onChange={(e) =>
                          setBrandDetails({
                            ...branDetails,
                            logoUrl: e.target.value,
                          })
                        }
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Description"
                        value={branDetails?.description}
                        onChange={(e) =>
                          setBrandDetails({
                            ...branDetails,
                            description: e.target.value,
                          })
                        }
                        className='dark:bg-[#262626] '
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select
                      
                        value={branDetails?.category}
                        onValueChange={(value) =>
                          setBrandDetails({ ...branDetails, category: value })
                        }
                        disabled={!editMode}
                      >
                        <SelectTrigger className='dark:bg-[#262626]'>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className=''>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Agriculture">
                            Agriculture
                          </SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Brand Tone</label>
                      {branDetails?.brandTone ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {branDetails?.brandTone?.map(
                            (tone: any, index: any) => (
                              <Badge
                                key={tone}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Hash className="w-3 h-3" />
                                {tone}
                                {editMode && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => removeTone(index)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </Badge>
                            ),
                          )}
                        </div>
                      ) : (
                        ''
                      )}

                      {editMode && (
                        <div className="flex mt-2">
                          <Input
                            placeholder="Add new tone"
                            value={newTone}
                            onChange={(e) => setNewTone(e.target.value)}
                            className="mr-2"
                          />
                          <Button onClick={addTone}>Add</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  {!editMode ? (
                    <Button className=' dark:bg-[#383838] text-white' onClick={toggleEditMode} variant="outline">
                      Edit
                    </Button>
                  ) : (
                    <>
                      {workSpaceDetailsData ? (
                        <Button
                          disabled={updateWorkSpaceLoad ? true : false}
                          onClick={updateWorkSpace}
                          variant="outline"
                        >
                          {updateWorkSpaceLoad ? 'Update...' : 'Update'}
                        </Button>
                      ) : (
                        <Button
                          disabled={loadBrand ? true : false}
                          onClick={saveBrandDetails}
                          variant="outline"
                        >
                          {loadBrand ? 'Save...' : 'Save'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="integrations">
                <Integrations
                  getWorkSpaceDetails={getWorkSpaceDetails}
                  activeWorkspace={activeWorkspace}
                  fbPages={fbPage}
                  workSpaceMesaage={workSpaceMesaage}
                  adAccountDetails={adAccountDetails}
                  workspaceDetails={workSpaceDetails} 
                />
              </TabsContent>
              
              <TabsContent value="preferences2">
                <AdPreferences2 activeWorkspace={ activeWorkspace} />
              </TabsContent>
              <TabsContent value="members">
                <Members
                  getWorkSpaceDetails={getWorkSpaceDetails}
                  activeWorkspace={activeWorkspace}
                  teamsDetails={teamsDetails}
                />
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      )}
       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Workspace</DialogTitle>
            <DialogDescription className="text-center pt-4">
              Are you sure you want to delete workspace &quot;{workspaceToDelete?.workspace?.name}&quot;? 
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4 sm:justify-center">
            <Button
              type="button"
              variant="outline"
              className="w-24"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-24 bg-red-500 hover:bg-red-600"
              onClick={handleDeleteWorkspace}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Workspace Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Workspace Name"
            value={newWorkspaceName}

            onChange={(e) => setNewWorkspaceName(e.target.value)}
            className="mb-4"
          />
          <Button disabled={loadCreateWorkSpace?true:false} className=' dark:bg-[#383838] text-white' onClick={createWorkspace}>{loadCreateWorkSpace?'Create...':'Create'}</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
