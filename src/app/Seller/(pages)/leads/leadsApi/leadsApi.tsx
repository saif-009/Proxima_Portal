import Axios from '../../../../../../Axios/Axios';
import { comment } from "postcss";


export const getAllCampaignData = async ()=> {
  try {
    const res = await Axios.get("/campaigns/campaigns_list")
    // If message exists, return it, otherwise return empty array
    return res?.data?.campaign_list || []
    
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    // Return empty array on error instead of undefined
    return []
  }
}





function formatDate(dateStr:any) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export const getAllLeadsData = async (id: any) => {
  if (id) {
    const res = await Axios.get("/campaigns/leads", {
      params: {
        campaign_id: id,
      }
    });

    if (res?.data?.message) {
      const leadsData = res?.data?.message?.all_leads[0];
          console.log("leadsData23", leadsData)
      // Dynam ic mapping of leads data to the required format
      const initialLeads = leadsData?.map((lead: any, index: number) => {
        // Create an object that dynamically stores field data as key-value pairs
        const dynamicFields = lead.field_data.reduce((acc: any, field: any) => {
          acc[field?.name] = field?.values[0]; // Use the field's name as the key and the value as its value
          return acc;
        }, {});

       

        // Add other non-field_data related properties
        return {
          id:lead?.id || "" , // Assuming ID starts from 1 and increments
          createdAt: formatDate(lead.created_time) || "",
          name:lead?.name || "",
          type:lead?.type || "",
          comment:lead?.comment ||[],
          // campaignId: 1, // Static value for now
          quality:lead?.type || "", // Static value for now
          feedbackProvided:lead?.feedbackProvided, // Static value for now 
          ...dynamicFields // Spread dynamic key-value pairs
        };
      });

      // Return the transformed leads data
      return initialLeads;
    }

    return []; // Return an empty array if no leads data is found
  }

  return null; // Return null if no ID is provided
};



