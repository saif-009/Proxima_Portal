// @ts-nocheck
// AdColumns.js
'use client'
import React, { useCallback } from 'react'
import axios from 'axios'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../../../../components/ui/dialog'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query';
import StatusSwitch from './StatusSwitch.tsx'
import {
  getAdTypeIcon,
  getFormattedDate,
  FormatNumber,
  formatPercentage,
  formatCurrency,
  formatDuration,
} from './utils'
import AdPreview from './AdPreview'
import Axios from '../../../../../../../Axios/Axios'
import TruncateText from './truncatedText'

export default function AdColumns() {
  const useAdCreative = (adId) => {
  return useQuery({
    queryKey: ['adCreative', adId],
    queryFn: async () => {
      const { data } = await Axios.get(`/get-ad-creative`, {
        params: { adid: adId },
      });
      return data;
    },
    enabled: false, // We'll manually trigger this query
  });
};
  return [
    {
      Header: 'Name',
      accessor: 'name',
      width: 290,
      Cell: ({ value, row }) => {
        const [isPreviewOpen, setIsPreviewOpen] = useState(false);
        const timeoutRef = useRef(null);

        const {
          data: adCreative,
          refetch,
          isLoading,
          isError,
        } = useAdCreative(row.original.id);

        const handleMouseEnter = () => {
          refetch(); // Trigger the query
          timeoutRef.current = setTimeout(() => {
            setIsPreviewOpen(true);
          }, 300);
        };

        const handleMouseLeave = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };

        return (
          <div className="flex items-right justify-end pr-4 space-x-2">
            <TruncateText text={value} />

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Button variant="ghost" className="p-0">
                {row.original.thumbnailUrl ? (
                  <img
                    src={row.original.thumbnailUrl}
                    alt="Ad Thumbnail"
                    width="40"
                    height="40"
                    className="rounded-sm cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-xs text-gray-500">No image</span>
                  </div>
                )}
              </Button>
            </div>

            <AdPreview
              adCreative={adCreative}
              isOpen={isPreviewOpen}
              setIsOpen={setIsPreviewOpen}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        );
      },
    },
    {
      Header: 'Platform',
      accessor: 'platform',
      minWidth: 100,
      width: 100,
      Cell: ({ value }: any) => <span className="capitalize">-</span>,
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 150,
      width: 150,
      Cell: ({ value, row }: any) => (
        <StatusSwitch
          value={value}
          onChange={(newStatus: any) => handleStatusChange(row, newStatus)}
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
      Cell: ({ value }: any) => `${Number(value)?.toFixed(2) || 0}%`,
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
      minWidth: 110,
      width: 110,
      Cell: ({ value }: any) => FormatNumber(Number(value) || 0),
    },
    {
      Header: 'Conv. Rate',
      accessor: (row: any) => row,
      minWidth: 130,
      width: 130,
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
      Header: 'Budget (Total)',
      accessor: 'budget',
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
      width: 130,
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
