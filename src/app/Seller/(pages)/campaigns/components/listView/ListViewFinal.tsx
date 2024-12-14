// @ts-nocheck

"use client"
import React, { useState, useMemo, useEffect } from 'react'
import { useTable, useExpanded, useSortBy, useGlobalFilter, Row } from 'react-table'
import { Card } from '../../../../../../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import { Input } from '../../../../../../../components/ui/input'
import { Search as SearchIcon, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image';
import CampaignColumns from './CampaignColumns'
import AdSetColumns from './AdSetColumns'
import AdColumns from './AdColumns'
import SubComponentTable from './SubComponentTable'
import { Button } from '../../../../../../../components/ui/button'
import GCampaignData from '../listViewGoogle/mockData.json'
import GoogleIcon from '../../../../../../../public/images/google-icon.svg'
import MetaIcon from '../../../../../../../public/images/meta-icon.svg'


// Function to highlight matched text
const HighlightedText = ({ text, searchTerm }: { text: string, searchTerm: string }) => {
  if (!searchTerm || !text) return <>{text}</>

  const parts = String(text).split(new RegExp(`(${searchTerm})`, 'gi'))
  return (
    <>
      {parts.map((part, index) => (
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-900 dark:text-white">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </>
  )
}

// Custom global filter function
function globalFilterFunction(
  rows: Row[],
  columnIds: string[],
  filterValue: string
): Row[] {
  if (!filterValue) return rows

  const searchTerms = filterValue.toLowerCase().split(' ')
  
  return rows.filter(row => {
    return searchTerms.every(searchTerm => {
      return columnIds.some(columnId => {
        const cellValue = row.values[columnId]
        return cellValue !== undefined && 
               String(cellValue).toLowerCase().includes(searchTerm)
      })
    })
  })
}

interface ListViewFinalProps {
  campaignsdata: any[]; // Meta campaigns
  googleCampaignsData?: any[]; // Google campaigns
}

export default function ListViewFinal({ campaignsdata, googleCampaignsData }: ListViewFinalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignData2, setCampaignsData2] = useState<any>([])
  const [activePlatform, setActivePlatform] = useState('All')
  const { theme } = useTheme()
 // const [googleCampaigns, setgoogleCampaigns] = useState<any>([])

  // Enhance column definitions to use HighlightedText
const campaignColumns = useMemo(() => {
    const columns = CampaignColumns({ activePlatform })
    return columns.map(column => ({
      ...column,
      Cell: ({ value, row }: any) => {
        // Preserve the original Cell renderer for Name column (which has the dropdown)
        if (column.accessor === 'name' && column.Cell) {
          return column.Cell({ value, row })
        }
        
        // For columns with custom Cell renderers
        if (column.Cell) {
          const originalCell = column.Cell({ value, row })
          // Only apply highlighting if the cell content is simple text/number
          if (typeof originalCell === 'string' || typeof originalCell === 'number') {
            return <HighlightedText text={String(originalCell)} searchTerm={searchTerm} />
          }
          return originalCell
        }
        
        // For regular cells without custom renderers
        return <HighlightedText text={String(value)} searchTerm={searchTerm} />
      }
    }))
  }, [activePlatform, searchTerm])

  const adSetColumns = useMemo(() => AdSetColumns(), [])
  const adColumns = useMemo(() => AdColumns(), [])


  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const calculateTotalBudget = (dailyBudget: number, startDate: string): number => {
    const today = new Date();
    const start = new Date(startDate);
    
    // If start date is in the future, return 0
    if (start > today) {
      return 0;
    }
  
    const days = calculateDaysBetween(startDate, today.toISOString());
    return dailyBudget * days;
  };

  const transformGoogleData = (googleData: any[]) => {
    
    return googleData?.map(item => {
      /**
        const totalBudget = calculateTotalBudget(
          item.campaign.g_campaign_budget,
          item.campaign.startDate
        );
      */
      return {
      id: item.campaign.id,
      name: item.campaign.name,
      status: item.campaign.status,
      startDate: item.campaign.startDate,
      endDate: item.campaign.endDate,
      platform: 'Google',
      //budget: totalBudget,
      daily_budget: item.campaign.g_campaign_budget,
      spend: item.metrics.cost,
      impressions: item.metrics.impressions,
      clicks: item.metrics.clicks,
      ctr: item.metrics.ctr * 100, // Convert to percentage
      cpc: item.metrics.averageCpc,
      cpm: item.metrics.averageCpm,
      ctrLinkClicks: item.metrics.interactionRate,
      conversions: item.metrics.conversions,
      reach: item.metrics.reach,
      roas:Number(item.metrics.conversionsValue)/ Number(item.metrics.cost),
      adsets: item.adGroups?.map((adGroup: any) => ({
        id: adGroup.adGroup.id,
        name: adGroup.adGroup.name,
        status: adGroup.adGroup.status,
        spend: adGroup.metrics.cost,
        impressions: adGroup.metrics.impressions,
        clicks: adGroup.metrics.clicks,
        ctr: adGroup.metrics.ctr * 100,
        cpc: adGroup.metrics.averageCpc,
        cpm: adGroup.metrics.averageCpm,
        ctrLinkClicks: item.metrics.interactionRate,
        conversions: adGroup.metrics.conversions,
        roas:Number(adGroup.metrics.conversionsValue)/ Number(adGroup.metrics.cost),
        ads: [] // Google structure doesn't include ads data
      }))
    }
    });
  };

  useEffect(() => {
    if (activePlatform === 'Meta') {
      setCampaignsData2(campaignsdata?.filter(campaign => campaign.platform === 'Meta'));
    } else if (activePlatform === 'Google') {
      const transformedGoogleData = transformGoogleData(googleCampaignsData || []);
      setCampaignsData2(transformedGoogleData);
    } else {
      // For 'All' platform, combine both sets of data
      const transformedGoogleData = transformGoogleData(googleCampaignsData || []);
      const combinedData = [
        ...(campaignsdata || []),
        ...transformedGoogleData
      ];
      setCampaignsData2(combinedData);
    }
  }, [campaignsdata, googleCampaignsData, activePlatform]);

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => {
      const adSets = row.original.adsets || []
      return (
        <div style={{ marginLeft: '-0.5rem', marginRight: '-0.5rem' }}>
          <SubComponentTable 
            columns={adSetColumns} 
            data={adSets} 
            adColumns={adColumns} 
            showHeader={false}
            searchTerm={searchTerm} // Pass searchTerm to highlight in nested tables
          />
        </div>
      )
    },
    [adSetColumns, adColumns, searchTerm]
  )

  function handleMetaCampaignView() {
    setActivePlatform('Meta');
  }

  function handleGoogleCampaignView() {
    setActivePlatform('Google');
  }

  function handleAllCampaignView() {
    setActivePlatform('All');
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: campaignColumns,
      data: campaignData2,
      globalFilter: globalFilterFunction,
      autoResetGlobalFilter: false,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded
  )

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setGlobalFilter(value)
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
      <header className={`${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'} w-full shadow-sm z-10 overflow-hidden border-gray-200 dark:border-gray-700`}>
        <div className=" py-4 pr-4 flex items-center justify-between">
          <div className="campaignPlatformFilterButton flex space-x-2 overflow-x-auto">
            <Button onClick={handleAllCampaignView} variant={`${activePlatform === 'All' ? 'default' : 'outline'}`} className='w-32'>Blended</Button>
            <Button onClick={handleMetaCampaignView} variant={`${activePlatform === 'Meta' ? 'default' : 'outline'}`} className='w-32 gap-4'><Image src={ MetaIcon } height={20} width={20}alt='' /><span className='text-md'>Meta</span></Button>
            <Button onClick={handleGoogleCampaignView} variant={`${activePlatform === 'Google' ? 'default' : 'outline'}`} className='w-32 gap-4'><Image src={GoogleIcon} height={20} width={20}alt='' /><span className='text-md'>Google</span></Button>
          </div>
          <div className="relative w-64">
            <SearchIcon className={`absolute left-2 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
            <Input
              placeholder="Search campaigns"
              className={`pl-8 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>
      {rows.length > 0 ? (
        <div className={`w-auto ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'} `}>  
          <Card className={`${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'} mb-8 mr-4  `}>
            <div className="overflow-x-auto  !rounded-lg">
              <Table {...getTableProps()} style={{ tableLayout: 'fixed', width: '100%'  }}>
                <TableHeader className='!pl-8  '>
                  {headerGroups.map((headerGroup) => (
                    <TableRow
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup.id}
                      className='ml-4  '
                    >
                      {headerGroup.headers.map((column: any) => (
                        <TableHead
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={column.id}
                          className={`${theme === 'dark' ? 'text-gray-300' : ''} cursor-pointer `}
                          style={{
                            width: column.width,
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{column.render('Header')}</span>
                            <span className="inline-block w-4">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <ArrowUp className="h-4 w-4" />
                                )
                              ) : column.canSort ? (
                                <ArrowUpDown className="h-4 w-4" />
                              ) : null}
                            </span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                  {rows.map((row: any) => {
                    prepareRow(row)
                    return (
                      <React.Fragment key={row.id}>
                        <TableRow {...row.getRowProps()} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          {row.cells.map((cell: any) => (
                            <TableCell
                              {...cell.getCellProps()}
                              key={cell.column.id}
                              className={theme === 'dark' ? 'text-gray-300' : ''}
                              style={{
                                width: cell.column.width,
                                minWidth: cell.column.minWidth,
                                maxWidth: cell.column.maxWidth,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {cell.render('Cell')}
                            </TableCell>
                          ))}
                        </TableRow>
                        {row.isExpanded && (
                          <TableRow>
                            <TableCell colSpan={campaignColumns?.length} className='!py-0'>
                              {renderRowSubComponent({ row })}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      ) : <h1 className='m-12 font-semibold'>No matching results found</h1>}
    </div>
  )
}