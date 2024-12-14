// components/WorkspaceTable.tsx
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import { Badge } from '../../../../../../components/ui/badge'
import { Button } from '../../../../../../components/ui/button'
import { ArrowUpDown, Mail, Phone } from 'lucide-react'
import { Workspace } from './Types/workspace'

interface WorkspaceTableProps {
  currentItems: Workspace[]
  indexOfFirstItem: number
  requestSort: (key: string) => void
}

const TableHeaderSortable = ({ 
  label, 
  sortKey, 
  requestSort, 
  className 
}: { 
  label: string
  sortKey: string
  requestSort: (key: string) => void
  className?: string
}) => (
  <TableHead className={`text-gray-300 text-left  ${className}`}>
    <Button
      variant="ghost"
      className="text-gray-300 hover:text-white hover:bg-gray-700"
      onClick={() => requestSort(sortKey)}
    >
      {label} <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  </TableHead>
)

export const WorkspaceTable = ({
  currentItems,
  indexOfFirstItem,
  requestSort,
}: WorkspaceTableProps) => {
  return (
    <div className="bg-[#38383866] rounded-lg overflow-hidden shadow-xl border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="w-32  text-gray-300 text-center">S. No</TableHead>
            <TableHeaderSortable label="Seller Name" sortKey="sellerName" requestSort={requestSort} className="w-48" />
            <TableHead className="w-32 text-gray-300 text-left">Seller Ref No</TableHead>
            <TableHead className="w-64 text-gray-300 text-left">Contact Info</TableHead>
            <TableHead className="w-32 text-gray-300 text-left">State</TableHead>
            <TableHead className="w-48 text-gray-300 text-left">Ad A/c Name & ID</TableHead>
            <TableHead className="w-32 text-gray-300 text-left">Workspace ID</TableHead>
            <TableHeaderSortable label="Integrations" sortKey="integrations" requestSort={requestSort} className="w-32" />
            <TableHeaderSortable label="Spends" sortKey="spendsTillDate" requestSort={requestSort} className="w-32" />
            <TableHead className="w-24 text-gray-300 text-center">Status</TableHead>
            <TableHeaderSortable label="Wallet Balance" sortKey="walletBalance" requestSort={requestSort} className="w-32 " />
            <TableHeaderSortable label="Joined on" sortKey="joinedOn" requestSort={requestSort} className="w-32" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((workspace, index) => (
            <TableRow
              key={workspace.id}
              className="border-b border-gray-700 hover:bg-gray-750 transition-colors "
            >
              <TableCell className="font-medium text-gray-300 text-center ">
                {indexOfFirstItem + index + 1}
              </TableCell>
              <TableCell className="text-left">
                <div className="font-medium text-gray-100">{workspace.sellerName}</div>
              </TableCell>
              <TableCell className="text-gray-300 text-left">{workspace.sellerRefNo}</TableCell>
              <TableCell className="text-gray-300 text-left">
                <div className="flex items-center mb-1">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {workspace.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {workspace.phone}
                </div>
              </TableCell>
              <TableCell className="text-gray-300 text-left">{workspace.state}</TableCell>
              <TableCell className="text-gray-300 text-left">
                <div>{workspace.adAccountName}</div>
                <div className="text-sm text-gray-400">{workspace.adAccountId}</div>
              </TableCell>
              <TableCell className="text-gray-300 text-left">{workspace.workspaceId}</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-1 flex-wrap">
                  {workspace.integrations.map((integration) => (
                    <Badge
                      key={integration}
                      variant="outline"
                      className="bg-gray-700 text-gray-300 border-gray-600"
                    >
                      {integration}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-gray-300 text-center">
                ₹{workspace.spendsTillDate.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={workspace.status === 'Active' ? 'default' : 'secondary'}
                  className={
                    workspace.status === 'Active'
                      ? 'bg-green-600 text-white'
                      : workspace.status === 'Inactive'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }
                >
                  {workspace.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300 text-center">
                ₹{workspace.walletBalance.toLocaleString()}
              </TableCell>
              <TableCell className="text-gray-300 text-center ">
                {workspace.joinedOn}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}