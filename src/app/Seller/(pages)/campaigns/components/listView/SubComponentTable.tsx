// SubComponentTable.js
// @ts-nocheck
"use client"
import React from 'react'
import { useTable, useExpanded } from 'react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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

const SubComponentTable = React.memo(({ columns, data, adColumns, showHeader = false, searchTerm = '' }: any) => {
  // Enhance columns with text highlighting while preserving special renderers
  const enhancedColumns = React.useMemo(() => {
    return columns.map(column => ({
      ...column,
      Cell: ({ value, row }: any) => {
        // Special handling for the name column with dropdown
        if (column.accessor === 'name') {
          return (
            <div className="flex items-center space-x-2 pl-10">
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
              <span className="truncate">
                <HighlightedText text={String(value)} searchTerm={searchTerm} />
              </span>
            </div>
          )
        }

        // Handle other special cell renderers
        if (column.Cell && typeof column.Cell === 'function') {
          const cellContent = column.Cell({ value, row })
          if (typeof cellContent === 'string' || typeof cellContent === 'number') {
            return <HighlightedText text={String(cellContent)} searchTerm={searchTerm} />
          }
          return cellContent
        }

        // Default cell rendering with highlighting
        return <HighlightedText text={String(value)} searchTerm={searchTerm} />
      }
    }))
  }, [columns, searchTerm])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: enhancedColumns,
      data,
    },
    useExpanded
  )

  return (
    <Table {...getTableProps()} style={{ tableLayout: 'fixed', width: '100%' }} >
      {showHeader && (
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <TableHead
                  {...column.getHeaderProps()}
                  key={column.id}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth
                  }}
                >
                  {column.render('Header')}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody {...getTableBodyProps()} >
        {rows.map((row) => {
          prepareRow(row)
          return (
            <React.Fragment key={row.id} >
              <TableRow {...row.getRowProps()} >
                {row.cells.map((cell) => (
                  <TableCell
                    {...cell.getCellProps()}
                    className=''
                    key={cell.column.id}
                    style={{
                      width: cell.column.width,
                      minWidth: cell.column.minWidth,
                      maxWidth: cell.column.maxWidth,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                  
                    }}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
              {row.isExpanded && row.original.ads && (
                <TableRow>
                  <TableCell colSpan={columns.length} className='!py-0'>
                    <SubComponentTable 
                      columns={adColumns} 
                      data={row.original.ads} 
                      adColumns={adColumns} 
                      showHeader={false}
                      searchTerm={searchTerm}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
})

SubComponentTable.displayName = 'SubComponentTable'
export default SubComponentTable