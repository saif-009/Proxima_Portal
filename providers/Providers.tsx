'use client'

import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import ProfilePageProvider from '@/context/settingContext';

export function Providers({ children }:any) {

  const queryClient = new QueryClient();
  return(
  <QueryClientProvider client={queryClient}>
  <RecoilRoot>
  
    {children}
   
    </RecoilRoot>
    </QueryClientProvider>
  )
}
