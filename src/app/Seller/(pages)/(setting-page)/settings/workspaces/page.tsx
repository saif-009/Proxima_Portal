'use client'

import { settingsContext } from '../../../../../../../context/settingContext'
import React, { useContext } from 'react'
import WorkSpaceManagement from '../../components/workSpaceManagement'

function WorkSpaces() {
  const { allWorkSpace } = useContext<any>(settingsContext)
  return <WorkSpaceManagement allWorkSpace={allWorkSpace} />
}

export default WorkSpaces
