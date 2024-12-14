import Axios from "../../../../../../Axios/Axios";



export const fetchUserRoles = async () => {
    const res = await Axios.get('/user-roles');
    if (res.status === 200) {
      return res.data?.userRoles;
    }
    throw new Error('Failed to fetch user roles');
  };

// for member

 export const fetchTeamMembers = async () => {
    const { data } = await Axios.get("/get-team-member"); // Adjust API path as per your backend
    return data?.teamMembers;
  };
  
  // Add new team member
 export const addTeamMember = async (newMember: any) => {
    const { data } = await Axios.post("/add-team-member", newMember);
    return data;
  };
  
  // Remove team member
 export const removeTeamMember = async (memberId: any) => {
    const { data } = await Axios.post("/remove-team-member", { memberId });
    return data;
  };


  //for workspace

 // Add new team member

export const fetchWorkspaces = async () => {
  const res = await Axios.get("/get-all-workspaces");
  const data = res?.data?.message;
  return data;
};

// Function to create a new workspace
export const createWorkspaceApi = async (newWorkspace: { name: string }) => {
  const response = await Axios.post("/create-workspace", newWorkspace);
  return response.data;
};




  