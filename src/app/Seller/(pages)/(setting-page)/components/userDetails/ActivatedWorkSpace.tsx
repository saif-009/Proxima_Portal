"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../../../components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../../../../../components/ui/dialog";
import { Button } from "../../../../../../components/ui/button";
import { Label } from "../../../../../../components/ui/label";
import { Input } from "../../../../../../components/ui/input";
import { Progress } from "../../../../../../components/ui/progress";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkspaceApi, fetchWorkspaces } from "../../setting-page-api/SettingPageApi";
import { settingsContext } from "../../../../../../../context/settingContext";

export default function ActivatedWorkspaces() {
  const queryClient = useQueryClient();
  const {allWorkSpace, getAllWorkSpace} = useContext<any>(settingsContext)
  const [workSpaceName, setWorkSpaceName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
   
  // Mutation to create a workspace
  const mutationCreateWorkspace = useMutation({
    mutationFn: createWorkspaceApi,
    onSuccess: () => {
      // Refetch workspaces after creating a new one
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      getAllWorkSpace();
      setDialogOpen(false);
    },
    onError: (error: any) => {
      console.error("Error creating workspace", error);
      // Optional: Show an error message to the user
    }
  });

  const createWorkspace = () => {
    mutationCreateWorkspace.mutate({ name: workSpaceName });
  };

  return (
    <div className="py-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Activated Workspaces</CardTitle>
            <CardDescription>You are using {allWorkSpace?.length>0?allWorkSpace?.length:0} out of 5 available workspaces</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="usage" className="text-sm font-medium leading-none">
              Workspace Usage
            </Label>
            <Progress value={((allWorkSpace?.length>0?allWorkSpace?.length:0)/5)*100} className="w-full" />
            <div className="text-right text-sm text-muted-foreground">{allWorkSpace?.length>0?allWorkSpace?.length:0}/5</div>
          </div>
          <div className="mt-4 space-y-2">
            {allWorkSpace?.map((val: any) => (
              <div key={val?.id} className="flex items-center justify-between p-2 dark:bg-black bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>{val?.workspace?.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{val?.userCount?val?.userCount:0} members</span>
              </div>
            ))}
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger disabled={allWorkSpace?.length===5} asChild>
              <Button variant="outline" className='dark:bg-[#383838] dark:text-white mt-4'>
                + Add Workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Workspace</DialogTitle>
                <DialogDescription>Create a new workspace.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="workspace-name" className="text-right">
                    Workspace Name
                  </Label>
                  <Input
                    id="workspace-name"
                    onChange={(e: any) => setWorkSpaceName(e.target.value)}
                    placeholder="Enter workspace name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button className='dark:bg-[#383838] dark:text-white' disabled={mutationCreateWorkspace.isPending} type="button" onClick={createWorkspace}>
                  Create Workspace
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
