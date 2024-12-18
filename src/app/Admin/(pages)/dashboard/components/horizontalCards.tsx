import { Card } from '../../../../../../components/ui/card'
import React from 'react'

function horizontalCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-4">
            <div className="text-gray-900 dark:text-white">
              <h3 className="text-2xl font-bold">156/4000</h3>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-green-600 dark:bg-green-500"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-white">Active Sellers</p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-6 w-6 text-orange-600 dark:text-orange-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-4">
            <div className="text-gray-900 dark:text-white">
              <h3 className="text-2xl font-bold">15</h3>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-green-600 dark:bg-green-500"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-white">Active Campaigns</p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-6 w-6 text-emerald-600 dark:text-emerald-500"
              >
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Commented card remains the same structure but with updated classes */}
      </div>
  )
}


export default horizontalCards