'use client'
import React from 'react'
import TeamMembers from '../../components/userDetails/TeamMembers'
import { useQuery } from '@tanstack/react-query'
// import { fetchUserRoles } from '../../setting-page-api/SettingPageApi'

function Teams() {
  // const { data: memberRole, isLoading, error, refetch } = useQuery({
  //   queryKey: ['userRoles'],
  //   queryFn: () => fetchUserRoles(),
  // })

  return (
    <>
      <div>
        <TeamMembers  />
      </div>
    </>
  )
}

export default Teams
