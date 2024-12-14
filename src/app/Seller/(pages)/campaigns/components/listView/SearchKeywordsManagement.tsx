//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function SearchKeywordsManagement({ isOpen, onClose, keywords: initialKeywords, onUpdateKeywords }) {
  const [keywords, setKeywords] = useState(initialKeywords || [])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedMatchType, setSelectedMatchType] = useState("")

  useEffect(() => {
    setKeywords(initialKeywords || [])
  }, [initialKeywords])

  const handleCheckboxChange = (id) => {
    const updatedKeywords = keywords.map(keyword => 
      keyword.id === id ? { ...keyword, selected: !keyword.selected } : keyword
    )
    setKeywords(updatedKeywords)
    onUpdateKeywords(updatedKeywords)
  }

  const handleSelectAll = (checked) => {
    const updatedKeywords = keywords.map(keyword => ({ ...keyword, selected: checked }))
    setKeywords(updatedKeywords)
    onUpdateKeywords(updatedKeywords)
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedKeywords = keywords.map(keyword => 
      keyword.id === id ? { ...keyword, status: newStatus } : keyword
    )
    setKeywords(updatedKeywords)
    onUpdateKeywords(updatedKeywords)
  }

  const handleMatchTypeChange = (id, newMatchType) => {
    const updatedKeywords = keywords.map(keyword => 
      keyword.id === id ? { ...keyword, matchType: newMatchType } : keyword
    )
    setKeywords(updatedKeywords)
    onUpdateKeywords(updatedKeywords)
  }

  const applyBulkAction = (action) => {
    let updatedKeywords
    if (action === 'status' && selectedStatus) {
      updatedKeywords = keywords.map(keyword => 
        keyword.selected ? { ...keyword, status: selectedStatus } : keyword
      )
    } else if (action === 'matchType' && selectedMatchType) {
      updatedKeywords = keywords.map(keyword => 
        keyword.selected ? { ...keyword, matchType: selectedMatchType } : keyword
      )
    }
    if (updatedKeywords) {
      setKeywords(updatedKeywords)
      onUpdateKeywords(updatedKeywords)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Enabled': return 'bg-green-100 text-green-800'
      case 'Paused': return 'bg-yellow-100 text-yellow-800'
      case 'Removed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMatchTypeColor = (matchType) => {
    switch (matchType) {
      case 'Broad match': return 'bg-blue-100 text-blue-800'
      case 'Phrase match': return 'bg-purple-100 text-purple-800'
      case 'Exact match': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[90%] sm:max-w-[90%] lg:max-w-[90%] xl:max-w-[90%]">
        <SheetHeader>
          <SheetTitle>Search Keywords Management</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="status-select" className="text-sm font-medium">Keyword Status</label>
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger id="status-select" className="w-[140px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enabled">Enable</SelectItem>
                    <SelectItem value="Paused">Pause</SelectItem>
                    <SelectItem value="Removed">Remove</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" onClick={() => applyBulkAction('status')}>
                  Apply
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="match-type-select" className="text-sm font-medium">Match Type</label>
              <div className="flex gap-2">
                <Select value={selectedMatchType} onValueChange={setSelectedMatchType}>
                  <SelectTrigger id="match-type-select" className="w-[140px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Broad match">Broad match</SelectItem>
                    <SelectItem value="Phrase match">Phrase match</SelectItem>
                    <SelectItem value="Exact match">Exact match</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" onClick={() => applyBulkAction('matchType')}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table className='rounded-lg'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={keywords.every(k => k.selected)}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all keywords"
                    />
                  </TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="w-[140px]">Match type</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Impr.</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>Avg. CPC</TableHead>
                  <TableHead>Conv. rate</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Cost / conv.</TableHead>
                  <TableHead>Quality Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell>
                      <Checkbox
                        checked={keyword.selected}
                        onCheckedChange={() => handleCheckboxChange(keyword.id)}
                        aria-label={`Select keyword ${keyword.keyword}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Select onValueChange={(value) => handleStatusChange(keyword.id, value)} defaultValue={keyword.status}>
                        <SelectTrigger className="w-[110px] border-none shadow-none">
                          <SelectValue>
                            <Badge className={`${getStatusColor(keyword.status)} font-normal`}>
                              {keyword.status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Enabled">Enabled</SelectItem>
                          <SelectItem value="Paused">Paused</SelectItem>
                          <SelectItem value="Removed">Removed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{keyword.keyword}</TableCell>
                    <TableCell>
                      <Select onValueChange={(value) => handleMatchTypeChange(keyword.id, value)} defaultValue={keyword.matchType}>
                        <SelectTrigger className="w-[130px] border-none shadow-none">
                          <SelectValue>
                            <Badge className={`${getMatchTypeColor(keyword.matchType)} font-normal`}>
                              {keyword.matchType}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Broad match">Broad match</SelectItem>
                          <SelectItem value="Phrase match">Phrase match</SelectItem>
                          <SelectItem value="Exact match">Exact match</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{keyword.clicks}</TableCell>
                    <TableCell>{keyword.impr}</TableCell>
                    <TableCell>{keyword.ctr}</TableCell>
                    <TableCell>{keyword.avgCpc}</TableCell>
                    <TableCell>{keyword.convRate}</TableCell>
                    <TableCell>{keyword.conversions}</TableCell>
                    <TableCell>{keyword.costPerConv}</TableCell>
                    <TableCell>{keyword.qualityScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}