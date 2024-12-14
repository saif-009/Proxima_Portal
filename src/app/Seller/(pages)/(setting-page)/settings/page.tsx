// @ts-nocheck
'use client'

import React, { useContext } from 'react'
import UserDetails from '../components/userDetails/userDetails'
import { settingsContext } from '../../../../../../context/settingContext'

function Settings() {
  const { userDetails } = useContext<any>(settingsContext)

  console.log('user details', userDetails)
  return (
    <>
      <UserDetails userData={userDetails} />
    </>
  )
}

export default Settings
