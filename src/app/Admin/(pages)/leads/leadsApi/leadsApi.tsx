import Axios from "@/Axios/Axios";
import { comment } from "postcss";


export const getAllCampaignData = async () => {
  const res = await Axios.get("/get-list-of-campaigns")
  return res?.data?.message
}



// export const getAllLeadsData = async (id: any) => {

//   if (id) {
//     const res = await Axios.get("/get-campaign-leads", {
//       params: {
//         campaign_id: id,
//       }
//     })

//     if (res?.data?.message) {
//       const leadsData = res?.data?.message?.all_leads
//       // Dynamic mapping of leads data to the required format
//       const initialLeads = leadsData.map((lead: any, index: number) => {
//         // Create an object that dynamically stores field data as key-value pairs
//         const dynamicFields = lead.field_data.reduce((acc: any, field: any) => {
//           acc[field.name] = field.values[0]; // Use the field's name as the key and the value as its value
//           return acc;
//         }, {});

//         // Add other non-field_data related properties
//         return {
//           id: index + 1, // Assuming ID starts from 1 and increments
//           createdAt: lead.created_time,
//           campaignId: 1, // Static value for now
//           quality: "Hot", // Static value for now
//           feedbackProvided: true, // Static value for now
//           purchaseTimeline: "within 15 days", // Static value for now
//           ...dynamicFields // Spread dynamic key-value pairs
//         };
//       });

//     }

//     return res?.data?.message
//   }



// }

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
    const res = await Axios.get("/get-campaign-leads", {
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



