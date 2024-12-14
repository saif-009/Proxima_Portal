// services/adPreferencesService.ts
import Axios from '../../../../../../Axios/Axios';

export interface TimeBlock {
  days: number[];
  start_minute: number;
  end_minute: number;
  timezone_type: string;
}

export interface AdPreferencesFormData {
  advantageCampaignStatus: boolean;
  budgetPreference: string;
  specialAdCat: string;
  bussinessLocation: string;
  PreferredPage: string;
  instantForms: string;
  websiteType: string;
  awarenessType: string;
  adSchedule: TimeBlock[];
  advantageAudience: boolean;
  TypesOfInventory: string;
  advantagePlacements: boolean;
  selectedPlatforms: {
    facebook: boolean;
    instagram: boolean;
    audienceNetwork: boolean;
  };
  siteLink: boolean;
  isDynamicCreativeOn: boolean;
}

interface ApiPreference {
  name: string;
  default_value: string;
  param: string;
}

// Define the mapping constants
export const INSTANT_FORM_OPTIONS = [
  { key: "LEAD_GENERATION", value: "Maximise number of leads" },
  { key: "QUALITY_LEAD", value: "Maximise number of conversion leads" }
];

export const WEBSITE_OPTIONS = [
  { key: "OFFSITE_CONVERSIONS", value: "Maximise number of conversion" },
  { key: "LINK_CLICKS", value: "Maximise number of link clicks" },
  { key: "REACH", value: "Maximise daily unique reach" },
  { key: "LANDING_PAGE_VIEWS", value: "Maximise number of landing page views" },
  { key: "IMPRESSIONS", value: "maximise number of impressions" }
];

export const AWARENESS_OPTIONS = [
  { key: "REACH", value: "Maximise Reach of Ads" },
  { key: "IMPRESSIONS", value: "Maximise Number of Impressions" },
  { key: "AD_RECALL_LIFT", value: "Maximise Ad Recall" },
  { key: "THRUPLAY", value: "Maximise ThruPlays" },
  { key: "TWO_SECOND_CONTINUOUS_VIDEO_PLAY", value: "Maximise 2 second continuous Video Plays" }
];


// Helper functions to convert between keys and values
const getInstantFormKey = (value: string): string => {
  const option = INSTANT_FORM_OPTIONS.find(opt => opt.value === value);
  return option?.key || value;
};

const getInstantFormValue = (key: string): string => {
  const option = INSTANT_FORM_OPTIONS.find(opt => opt.key === key);
  return option?.value || key;
};

const getWebsiteKey = (value: string): string => {
  const option = WEBSITE_OPTIONS.find(opt => opt.value === value);
  return option?.key || value;
};

const getWebsiteValue = (key: string): string => {
  const option = WEBSITE_OPTIONS.find(opt => opt.key === key);
  return option?.value || key;
};

const getAwarenessKey = (value: string): string => {
  const option = AWARENESS_OPTIONS.find(opt => opt.value === value);
  return option?.key || value;
};

const getAwarenessValue = (key: string): string => {
  const option = AWARENESS_OPTIONS.find(opt => opt.key === key);
  return option?.value || key;
};

// Constants
const PARAM_MAPPING: Record<string, string> = {
  advantageCampaignStatus: 'cbo',
  budgetPreference: 'lpx_budget_type',
  specialAdCat: 'special_ad_categories',
  bussinessLocation: 'business_location',
  PreferredPage: 'page_id',
  instantForms: 'on_ad_optimization_goal',
  websiteType: 'website_optimization_goal',
  awarenessType: 'awareness_optimization_goal',
  advantageAudience: 'advantage_audience',
  TypesOfInventory: 'inventory_type',
  advantagePlacements: 'advantage_placements',
  selectedPlatforms: 'platform_selection',
  siteLink: 'site_links',
  isDynamicCreativeOn: 'is_dynamic_creative',
  adSchedule: 'adset_schedule'
};

const NAME_MAPPING: Record<string, string> = {
  advantageCampaignStatus: 'Meta Advantage Budget',
  budgetPreference: 'Budget Type',
  specialAdCat: 'Special Ad Category',
  bussinessLocation: 'Business Location',
  PreferredPage: 'Preferred Page',
  instantForms: 'Instant Forms Goal',
  websiteType: 'Website Goal',
  awarenessType: 'Awareness Goal',
  advantageAudience: 'Advantage+ Audience',
  TypesOfInventory: 'Inventory Type',
  advantagePlacements: 'Advantage+ Placements',
  selectedPlatforms: 'Platform Selection',
  siteLink: 'Site Links',
  isDynamicCreativeOn: 'Dynamic Creative',
  adSchedule: 'Ad Schedule'
};
const formatBooleanValue = (value: boolean): string => value ? "True" : "False";
const formatCBOValue = (value: boolean): string => value ? "On" : "Off";
const formatBudgetValue = (value: string): string => value.toUpperCase() + '_BUDGET';

const formatSelectedPlatforms = (platforms: Record<string, boolean>): string[] => {
  return Object.entries(platforms)
    .filter(([_, isSelected]) => isSelected)
    .map(([platform]) => {
      if (platform.toLowerCase() === 'facebook') return 'FB';
      if (platform.toLowerCase() === 'instagram') return 'INSTAGRAM';
      if (platform.toLowerCase() === 'audiencenetwork') return 'AUDIENCE_NETWORK';
      return platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase();
    });
};

const convertFormToApiFormat = (formData: AdPreferencesFormData): ApiPreference[] => {
  const apiData: ApiPreference[] = [];

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'selectedPlatforms') {
      if (!formData.advantagePlacements) {
        const platforms = formatSelectedPlatforms(value);
        platforms.forEach(platform => {
          apiData.push({
            name: NAME_MAPPING[key],
            default_value: platform,
            param: PARAM_MAPPING[key] || ''
          });
        });
      }
      return;
    }

    let formattedValue = value;
    if (typeof value === 'boolean') {
      formattedValue = key === 'advantageCampaignStatus' ? formatCBOValue(value) : formatBooleanValue(value);
    } else if (key === 'budgetPreference') {
      formattedValue = formatBudgetValue(value);
    } else if (key === 'adSchedule') {
      formattedValue = Array.isArray(value) ? JSON.stringify(value) : '[]';
    } else if (key === 'instantForms') {
      formattedValue = getInstantFormKey(value.toString());
    } else if (key === 'websiteType') {
      formattedValue = getWebsiteKey(value.toString());
    } else if (key === 'awarenessType') {
      formattedValue = getAwarenessKey(value.toString());
    }

    apiData.push({
      name: NAME_MAPPING[key],
      default_value: formattedValue.toString(),
      param: PARAM_MAPPING[key] || ''
    });
  });

  return apiData;
};

const convertApiToFormFormat = (apiData: ApiPreference[]): AdPreferencesFormData => {
  const formData: any = getDefaultPreferences();
  
  apiData?.forEach(item => {
    switch(item.name) {
      case 'Meta Advantage Budget':
        formData.advantageCampaignStatus = item.default_value === 'On';
        break;
      case 'Budget Type':
        formData.budgetPreference = item.default_value.replace('_BUDGET', '').toLowerCase();
        break;
      case 'Special Ad Category':
        formData.specialAdCat = item.default_value.toLowerCase();
        break;
      case 'Business Location':
        formData.bussinessLocation = item.default_value;
        break;
      case 'Preferred Page':
        formData.PreferredPage = item.default_value;
        break;
      case 'Instant Forms Goal':
        formData.instantForms = getInstantFormValue(item.default_value);
        break;
      case 'Website Goal':
        formData.websiteType = getWebsiteValue(item.default_value);
        break;
      case 'Awareness Goal':
        formData.awarenessType = getAwarenessValue(item.default_value);
        break;
      case 'Ad Schedule':
        try {
          formData.adSchedule = JSON.parse(item.default_value);
          if (!Array.isArray(formData.adSchedule)) {
            formData.adSchedule = [];
          }
        } catch {
          formData.adSchedule = [];
        }
        break;
      case 'Advantage+ Audience':
        formData.advantageAudience = item.default_value === 'On';
        break;
      case 'Inventory Type':
        formData.TypesOfInventory = item.default_value.toLowerCase();
        break;
      case 'Advantage+ Placements':
        formData.advantagePlacements = item.default_value === 'On';
        break;
      case 'Platform Selection':
        const platforms = item.default_value.split(', ').map(p => p.toLowerCase());
        formData.selectedPlatforms = {
          facebook: platforms.includes('fb'),
          instagram: platforms.includes('instagram'),
          audienceNetwork: platforms.includes('audience_network')
        };
        break;
      case 'Site Links':
        formData.siteLink = item.default_value === 'On';
        break;
      case 'Dynamic Creative':
        formData.isDynamicCreativeOn = item.default_value === 'On';
        break;
    }
  });

  return formData as AdPreferencesFormData;
};

// Update default preferences to use the correct default values
export const getDefaultPreferences = (): AdPreferencesFormData => ({
  specialAdCat: 'NONE',
  bussinessLocation: '',
  advantageCampaignStatus: true,
  budgetPreference: 'lifetime',
  PreferredPage: 'page1',
  instantForms: getInstantFormValue('LEAD_GENERATION'),
  websiteType: getWebsiteValue('OFFSITE_CONVERSIONS'),
  awarenessType: getAwarenessValue('AD_RECALL_LIFT'),
  adSchedule: [],
  advantageAudience: false,
  TypesOfInventory: 'moderate',
  advantagePlacements: false,
  selectedPlatforms: {
    facebook: true,
    instagram: true,
    audienceNetwork: false,
  },
  siteLink: false,
  isDynamicCreativeOn: true
});

export const getAdPreferences = async (): Promise<AdPreferencesFormData> => {
  try {
    const response = await Axios.get('/get-ad-preference');
    console.log('incoming ad preferences', response.data.message)
    return convertApiToFormFormat(response.data.message);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    throw error;
  }
};

export const saveAdPreferences = async (formData: AdPreferencesFormData): Promise<void> => {
  try {
    const apiData = convertFormToApiFormat(formData);
    
    const dataToSend = {
      data: apiData
    };
    console.log('saved preferences',apiData)
    const response = await Axios.post('/create-ad-preference', dataToSend);
    
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed to save preferences');
    }
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
};