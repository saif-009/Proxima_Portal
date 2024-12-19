// SubComponentTable.js
// @ts-nocheck
"use client"
import React from 'react'
import { useTable, useExpanded } from 'react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SubComponentTable = React.memo(({ columns, data, adColumns, showHeader = false }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
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
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <React.Fragment key={row.id}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell
                    {...cell.getCellProps()}
                    key={cell.column.id}
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
              {row.isExpanded && row.original.ads && (
                <TableRow >
                  <TableCell colSpan={columns.length} >
                    <SubComponentTable columns={adColumns} data={row.original.ads} adColumns={adColumns} showHeader={false} />
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


SubComponentTable.displayName = 'SubComponentTable';
export default SubComponentTable