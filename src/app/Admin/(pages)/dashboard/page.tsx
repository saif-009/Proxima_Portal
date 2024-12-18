// @ts-nocheck
'use client'

import * as React from 'react'
import { subDays } from 'date-fns'

import DateRangePicker from './components/dateRangePicker'
import DashboardAnalytics from './components/DashboardAnalytics'

interface DateRange {
  from: Date
  to: Date
}

export default function Dashboard({ className }: { className?: string }) {
  const [date, setDate] = React.useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  return (
    <div className="bg-gray-50 dark:bg-[#000000] pt-2 pl-2">
      <div className="flex justify-end my-4 space-x-4 px-3">
        <DateRangePicker
          date={date}
          setDate={setDate}
          className={className}
          page="dashboard"
        />
      </div>

      <DashboardAnalytics />
    </div>
  )
}
