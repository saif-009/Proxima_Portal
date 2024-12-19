// @ts-nocheck
// CampaignColumns.js
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, PencilIcon } from 'lucide-react'
import StatusSwitch from './StatusSwitch'
import {
  getFormattedDate,
  FormatNumber,
  formatPercentage,
  formatCurrency,
  formatDuration,
} from './utils'
import metaLogo from '@/../public/meta icon.svg'
import googleLogo from '@/../public/google icon.svg'
import TruncateText from './truncatedText'




export default function CampaignColumns({ activePlatform }) {


  return [
    {
      Header: () => <span className="pl-6">Name</span>,
      accessor: 'name',
      width: 300,
      Cell: ({ row }: any) => {
        console.log('active platform', activePlatform)

        return (
          <div className="flex items-center space-x-2 mr-12">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => row.toggleRowExpanded(!row.isExpanded)}
            >
              {row.isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <TruncateText text={row.original.name} maxLength={ 20} />
            {row.original.platform !== 'meta' && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => {
                  console.log('Open campaign settings for:', row.original.name)
                }}
              >
                {activePlatform === 'Meta' && (
                  <PencilIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        )
      },
    },
    {
      Header: 'Platform',
      accessor: 'platform',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) => {
        let platformLogo = value === 'meta' ? metaLogo : googleLogo;
        return
        (
          <span className=" capitalize">{value || 'Meta'}</span>
        )
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 150,
      width: 150,
      Cell: ({ value, row }: any) => (
        <StatusSwitch
          value={value}
          onChange={(newStatus: any) =>
            handleStatusChange(row.original, newStatus)
          }
        />
      ),
    },

    {
      Header: 'Start Date',
      accessor: 'startDate',
      minWidth: 120,
      width: 120,

      Cell: ({ value }: any) => getFormattedDate(value) || '-',
    },
    {
      Header: 'End Date',
      accessor: 'endDate',
      minWidth: 120,
      width: 120,
      Cell: ({ value }: any) => getFormattedDate(value) || '-',
    },
    {
      Header: 'Opt. Score',
      accessor: 'optimizationScore',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) => `${value || '-'}%`,
    },
    {
      Header: 'Spend',
      accessor: 'spend',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) =>
        `₹${FormatNumber(Math.round(Number(value)) || 0)}`,
    },
    {
      Header: 'Budget Remaining',
      accessor: 'budget_remaining',
      minWidth: 140,
      width: 140,
      Cell: ({ value }: any) =>
        `₹${FormatNumber(Math.round(Number(value)) || 0)}`,
    },
    {
      Header: 'Impressions',
      accessor: 'impressions',
      minWidth: 120,
      width: 120,
      Cell: ({ value }: any) => FormatNumber(Number(value) || 0),
    },
    {
      Header: 'CTR',
      accessor: 'ctr',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) => {
        const ctrValue = Number(value)?.toFixed(2) || 0
        return <span className="">{ctrValue}%</span>
      },
    },
    {
      Header: 'CPC',
      accessor: 'cpc',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) => `₹${Number(value)?.toFixed(2) || 0}`,
    },
    {
      Header: 'Conversions',
      accessor: 'leads',
      minWidth: 120,
      width: 120,
      Cell: ({ value }: any) => FormatNumber(Number(value) || 0),
    },
    {
      Header: 'Conv. Rate',
      accessor: (row: any) => row,
      minWidth: 120,
      width: 120,
      Cell: ({ value }: any) => {
        const convRate =
          Number(value.clicks) > 0
            ? value.leads && value.clicks
              ? ((Number(value.leads) / Number(value.clicks)) * 100)?.toFixed(2)
              : 0
            : 0
        return `${convRate}%`
      },
    },
    {
      Header: activePlatform === 'Google'?'Daily Budget':'Budget (Total)',
      accessor: activePlatform === 'Google'?'daily_budget':'budget',
      width: 130,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'Reach',
      accessor: 'reach',
      width: 100,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Frequency',
      accessor: 'frequency',
      width: 100,
      Cell: ({ value }) => Number(value).toFixed(2),
    },
    {
      Header: 'CPM',
      accessor: 'cpm',
      width: 100,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'CTR (All)',
      accessor: 'ctrAll',
      width: 100,
      Cell: ({ value }) => {
        return value != undefined ? formatPercentage(value) : '-'
      },
    },
    {
      Header: 'CTR (Link Clicks)',
      accessor: 'ctrLinkClicks',
      width: 130,
      Cell: ({ value }) => formatPercentage(value),
    },
    {
      Header: 'Thru Plays',
      accessor: 'thruPlays',
      width: 100,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Completed Views',
      accessor: 'completedViews',
      width: 130,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Cost per Lead',
      accessor: 'costPerLead',
      width: 120,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'Purchase',
      accessor: 'purchase',
      width: 100,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Cost per Purchase',
      accessor: 'costPerPurchase',
      width: 140,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'ROAS',
      accessor: 'roas',
      width: 100,
      Cell: ({ value }) => Number(value).toFixed(2),
    },
    {
      Header: 'Landing Page View',
      accessor: 'landingPageView',
      width: 140,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Add to Wishlist',
      accessor: 'addToWishlist',
      width: 130,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Add to Cart',
      accessor: 'addToCart',
      width: 110,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Add Payment Info',
      accessor: 'addPaymentInfo',
      width: 140,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Checkout',
      accessor: 'checkout',
      width: 100,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Subscriptions',
      accessor: 'subscriptions',
      width: 120,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Cost per Subscription',
      accessor: 'costPerSubscription',
      width: 160,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'Results',
      accessor: 'results',
      width: 100,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Cost per Result',
      accessor: 'costPerResult',
      width: 130,
      Cell: ({ value }) => formatCurrency(value),
    },
    {
      Header: 'Appointment Scheduled',
      accessor: 'appointmentScheduled',
      width: 170,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Game Plays',
      accessor: 'gamePlays',
      width: 110,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Registration Completed',
      accessor: 'registrationCompleted',
      width: 180,
      Cell: ({ value }) => FormatNumber(value),
    },
    {
      Header: 'Quality Ranking',
      accessor: 'qualityRanking',
      width: 130,
      Cell: ({ value }) => (value != 'UNKNOW' ? value : '-'),
    },
    {
      Header: 'Engagement Ranking',
      accessor: 'engagementRanking',
      width: 150,
      Cell: ({ value }) => (value != 'UNKNOW' ? value : '-'),
    },
    {
      Header: 'Conversion Ranking',
      accessor: 'conversionRanking',
      width: 150,
      Cell: ({ value }) => (value != 'UNKNOW' ? value : '-'),
    },
    {
      Header: '3 sec Video Play',
      accessor: 'threeSecVideoPlay',
      width: 140,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Video Plays 25%',
      accessor: 'videoPlays25',
      width: 130,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Video Plays 50%',
      accessor: 'videoPlays50',
      width: 130,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Video Plays 75%',
      accessor: 'videoPlays75',
      width: 130,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Video Plays 100%',
      accessor: 'videoPlays100',
      width: 140,
      Cell: ({ value }) => (value != undefined ? FormatNumber(value) : '-'),
    },
    {
      Header: 'Avg Video Play Duration',
      accessor: 'avgVideoPlayDuration',
      width: 170,
      Cell: ({ value }) => (value != undefined ? formatDuration(value) : '-'),
    },
  ]
}
