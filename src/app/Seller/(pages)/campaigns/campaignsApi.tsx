import Axios from "../../../../../Axios/Axios";
import { addDays, format, subDays, isAfter, startOfDay } from "date-fns";


export const fetchCampaignsData = async (date:any) => {
    const body = {
      date_start: format(date?.from, 'yyyy-MM-dd'),
      date_stop: format(date?.to, 'yyyy-MM-dd'),
    };
    const res = await Axios.get(`/campaign-card-view-data?date_start=${body?.date_start}&date_stop=${body?.date_stop}`);
    return res.data.message;
  };

//   

export const fetchListCampaignsData = async (date:any) => {
    const body = {
      start_date: format(date?.from, 'yyyy-MM-dd'),
      end_date: format(date?.to, 'yyyy-MM-dd'),
    };
    const res = await Axios.get('/list-view-campaign', {
      params: {
        date_start: body?.start_date,
        date_stop: body?.end_date,
      },
    });
    return res?.data?.data;
  };

  export const GoogleCampaignsAdGroupData = async (date:any) => {
    const body = {
      start_date: format(date?.from, 'yyyy-MM-dd'),
      end_date: format(date?.to, 'yyyy-MM-dd'),
    };
    const res = await Axios.get('/fetch_campaign_and_adGroup', {
      params: {
        startDate: body?.start_date,
        endDate: body?.end_date,
      },
    });
    return res?.data?.data;
  };
