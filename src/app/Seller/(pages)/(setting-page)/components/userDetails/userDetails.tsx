import React from 'react'

import { fetchUserRoles } from '../../setting-page-api/SettingPageApi'
import { useQuery } from '@tanstack/react-query'
import Details from './Details'

function UserDetails({ userData }: any) {
  const { data: memberRole, isLoading, error } = useQuery({
    queryKey: ['userRoles'],
    queryFn: () => fetchUserRoles(),
  })

  return (
    <>
      <div className="w-full mx-aut ">
        <p className="mb-6 text-sm">
          Manage your personal information, account details, and notification
          preferences
        </p>
        <Details userData={userData} />
    
      </div>
    </>
  )
}

export default UserDetails
