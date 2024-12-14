'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '../../../../components/ui/button'
import { Skeleton } from '../../../../components/ui/skeleton'

export default function SidebarSkeleton({ className = '' }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)


  return (
    <aside
      className={`${
        isCollapsed ? 'w-[4.5rem]' : 'w-48'
      } h-screen p-4 pt-0 flex flex-col justify-between rounded-xl dark:border-none dark:shadow-md border-r-2 transition-all duration-300 ${className}`}
    >
      <div>
        <div
          className={`mt-4 ${
            isCollapsed
              ? 'pl-0 border-black dark:border-white border-b-2'
              : 'pl-2'
          } relative h-[3.5rem] flex flex-row justify-left items-center text-center pb-[16px]`}
        >
          <Skeleton className={`h-8 ${isCollapsed ? 'w-12' : 'w-32'}`} />
          
           
          
        </div>
        <nav className="space-y-2 mt-4">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className={`h-10 w-full ${isCollapsed ? 'p-0' : ''}`} />
          ))}
        </nav>
      </div>
      <div className="pt-4 space-y-2">
        <Skeleton className={`h-10 w-full ${isCollapsed ? 'p-0' : ''}`} />
        <Skeleton className={`h-10 w-full ${isCollapsed ? 'p-0' : ''}`} />
      </div>
    </aside>
  )
}