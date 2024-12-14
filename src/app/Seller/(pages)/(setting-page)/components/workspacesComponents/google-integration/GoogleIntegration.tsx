import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import Axios from '@/Axios/Axios';

interface GoogleCustomer {
  descriptiveName: string;
  id: string;
  manager: boolean;
  resourceName: string;
  testAccount: boolean;
}

interface GoogleDetails {
  adAccountList: Array<{
    manager: string;
    customers: GoogleCustomer[];
  }>;
  googleAdAccount?: {
    managerId: string;
    customerResource: string;
  };
}

interface WorkspacePayload {
  googleDetails: GoogleDetails;
  // ... other fields
}

interface Props {
  accessibleAccounts: GoogleCustomer[];
  isLoading: boolean;
  onAccountLinked: (accountId: string) => void;
  workspaceDetails: WorkspacePayload;
}

const GoogleAdsIntegration: React.FC<Props> = ({ 
  accessibleAccounts = [],
  isLoading = false,
  onAccountLinked,
  workspaceDetails
}) => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&response_type=code&client_id=251256943422-gaaqc6ovi9a28rm4t68js4820crtpr12.apps.googleusercontent.com&redirect_uri=https://demo2.leapxads.com/settings/workspaces";
  
  // Get the linked account from workspace details
  const linkedAdAcountId = workspaceDetails?.googleDetails?.googleAdAccount?.customerResource.split('/')[1];
  const linkedAccountDetails = linkedAdAcountId && workspaceDetails?.googleDetails?.adAccountList?.[0]?.customers?.find(
    customer => customer.id === linkedAdAcountId
  );

  const [selectedAccount, setSelectedAccount] = useState<string | null>(linkedAdAcountId || null);
  const [linkingStatus, setLinkingStatus] = useState<'idle' | 'linking' | 'linked' | 'error'>(
    linkedAdAcountId ? 'linked' : 'idle'
  );

  const handleAccountLinking = async (accountId: string) => {
    try {
      setLinkingStatus('linking');
      setSelectedAccount(accountId);

      // Step 1: Send request to client
      const sendRequestResponse = await Axios.post('/send-request-client', {
        customer: `customers/${accountId}`
      }); 

      if (!sendRequestResponse.data.valid) {
        throw new Error('Failed to send client request');
      }

      // Step 2: Get pending requests
      const getRequestsResponse = await Axios.get('/get-all-requests', {
        params: {
          customer: `customers/${accountId}`,
          managerId: accountId
        }
      });

      if (!getRequestsResponse.data.valid) {
        throw new Error('Failed to get requests');
      }

      // Step 3: Accept the request
      const acceptResponse = await Axios.post('/accept-request', {
        customer_resource: `customers/${accountId}`,
        managerId: accountId,
        managerLinkId: getRequestsResponse.data.message[0]?.customerManagerLink?.managerLinkId
      });

      if (!acceptResponse.data.valid) {
        throw new Error('Failed to accept request');
      }

      setLinkingStatus('linked');
      // Call the onAccountLinked callback
      onAccountLinked(accountId);

    } catch (error) {
      console.error('Account linking error:', error);
      setLinkingStatus('error');
      setSelectedAccount(null);
    }
  };

  // If there's a linked account, show it in read-only mode
  if (linkedAccountDetails) {
    return (
      <div className="border flex items-center justify-between dark:border-gray-600 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <RadioGroup defaultValue="checked">
            <RadioGroupItem value="checked" id="linked-account" />
          </RadioGroup>
          <span>
            {linkedAccountDetails && linkedAccountDetails.descriptiveName || `Google Ad Account(${linkedAdAcountId})`}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading || linkingStatus === 'linking') {
    return (
      <Button disabled className="w-full dark:bg-[#383838] dark:text-white">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {isLoading ? 'Loading Accounts...' : 'Linking Account...'}
      </Button>
    );
  }

  if (accessibleAccounts.length > 0) {
    return (
      <div className="space-y-4">
        {selectedAccount && linkingStatus === 'linked' ? (
          <div className="border flex items-center justify-between dark:border-gray-600 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <RadioGroup defaultValue="checked">
                <RadioGroupItem value="checked" id="selected-account" />
              </RadioGroup>
              <span>
                {accessibleAccounts.find(acc => acc.id === selectedAccount)?.descriptiveName || `Google Ads Account(${linkedAdAcountId})`}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedAccount(null);
                setLinkingStatus('idle');
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <Select onValueChange={handleAccountLinking}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Google Ads Account" />
            </SelectTrigger>
            <SelectContent>
              {accessibleAccounts.map((account) => (
                <SelectItem 
                  key={account.id} 
                  value={account.id}
                >
                  {account.descriptiveName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {linkingStatus === 'error' && (
          <p className="text-sm text-red-500">
            Failed to link account. Please try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <a href={url}>
      <Button className="w-full dark:bg-[#383838] dark:text-white">
        Link Ad A/C
      </Button>
    </a>
  );
};
export default GoogleAdsIntegration;

/*import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import Axios from '@/Axios/Axios';

const GoogleAdsIntegration = ({ 
  accessibleAccounts = [], 
  isLoading = false,
  onAccountLinked = (accountId: string) => {},
  linkedAccount = null
}) => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&response_type=code&client_id=251256943422-gaaqc6ovi9a28rm4t68js4820crtpr12.apps.googleusercontent.com&redirect_uri=https://demo2.leapxads.com/settings/workspaces";
  
  const [selectedAccount, setSelectedAccount] = useState(linkedAccount);
  const [linkingStatus, setLinkingStatus] = useState('idle');
  const [pendingRequests, setPendingRequests] = useState(null);
  const [testingStep, setTestingStep] = useState('select'); // 'select' | 'check' | 'accept'

  // Function to check pending requests
  const checkPendingRequests = async (accountId: string) => {
    try {
      const response = await Axios.get('/get-all-requests', {
        params: {
          customer: `customers/${accountId}`,
          managerId: accountId
        }
      });
      
      console.log('Pending requests response:', response.data);
      setPendingRequests(response.data.message);
      setTestingStep('accept');
    } catch (error) {
      console.error('Error checking requests:', error);
    }
  };

  // Function to accept request
  const acceptRequest = async (accountId: string) => {
    try {
      if (!pendingRequests?.[0]?.results?.[0].customerManagerLink?.managerLinkId) {
        console.error('No manager link ID found');
        return;
      }

      const response = await Axios.post('/accept-request', {
        customer_resource: `customers/${accountId}`,
        managerId: accountId,
        managerLinkId: pendingRequests?.[0]?.results?.[0].customerManagerLink?.managerLinkId
      });

      console.log('Accept response:', response.data);
      if (response.data.valid) {
        setLinkingStatus('linked');
        onAccountLinked(accountId);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  // Handle account selection
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    setTestingStep('check');
  };

  // Render testing interface
  if (testingStep === 'check' || testingStep === 'accept') {
    return (
      <div className="space-y-4">
        <div className="border p-4 rounded-md">
          <p className="mb-2">Testing Account ID: {selectedAccount}</p>
          
          {testingStep === 'check' && (
            <Button 
              onClick={() => checkPendingRequests(selectedAccount!)}
              className="w-full"
            >
              Check Pending Requests
            </Button>
          )}

          {testingStep === 'accept' && pendingRequests && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-2 rounded">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(pendingRequests, null, 2)}
                </pre>
              </div>
              
              <Button 
                onClick={() => acceptRequest(selectedAccount!)}
                className="w-full"
              >
                Accept Request
              </Button>
            </div>
          )}

          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => {
              setTestingStep('select');
              setPendingRequests(null);
            }}
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  // Regular render logic
  if (isLoading) {
    return (
      <Button disabled className="w-full dark:bg-[#383838] dark:text-white">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading Accounts...
      </Button>
    );
  }

  if (accessibleAccounts && accessibleAccounts.length > 0) {
    return (
      <div className="space-y-4">
        {selectedAccount && linkingStatus === 'linked' ? (
          <div className="border flex items-center justify-between dark:border-gray-600 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <RadioGroup defaultValue="checked">
                <RadioGroupItem value="checked" id="selected-account" />
              </RadioGroup>
              <span>
                {accessibleAccounts.find(acc => acc.id === selectedAccount)?.descriptiveName || 'Google Ads Account'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedAccount(null);
                setLinkingStatus('idle');
                setTestingStep('select');
                setPendingRequests(null);
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <Select onValueChange={handleAccountSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Google Ads Account" />
            </SelectTrigger>
            <SelectContent>
              {accessibleAccounts.map((account) => (
                <SelectItem 
                  key={account.id} 
                  value={account.id}
                >
                  {account.descriptiveName || 'Google Ads Account'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {linkingStatus === 'error' && (
          <p className="text-sm text-red-500">
            Failed to link account. Please try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <a href={url}>
      <Button className="w-full dark:bg-[#383838] dark:text-white">
        Link Ad A/C
      </Button>
    </a>
  );
};

export default GoogleAdsIntegration;*/