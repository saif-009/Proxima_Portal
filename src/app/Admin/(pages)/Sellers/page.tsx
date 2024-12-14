'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { WorkspaceTable } from './components/WorkspaceTable'
import { Pagination } from './components/Pagination'
import { useSortableData } from './components/useSortableData'
import { workspaces } from './components/data/workspaces'

export default function WorkspaceHub() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [stateFilter, setStateFilter] = useState('All')
  const [integrationFilter, setIntegrationFilter] = useState('All')
  const itemsPerPage = 10
  const totalSellers = 1000

  // Sorting
  const { items, requestSort, sortConfig } = useSortableData(workspaces)

  // Filtering
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchFields = [
        item.sellerName,
        item.sellerRefNo,
        item.contactName,
        item.email,
        item.phone,
        item.state,
        item.adAccountName,
        item.adAccountId,
        item.workspaceId
      ]
      
      const matchesSearch = searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )

      const matchesState =
        stateFilter === 'All' || item.state === stateFilter

      const matchesIntegration =
        integrationFilter === 'All' ||
        (integrationFilter === 'None' && item.integrations.length === 0) ||
        (integrationFilter !== 'None' &&
          item.integrations.includes(integrationFilter))

      return matchesSearch && matchesState && matchesIntegration
    })
  }, [items, searchTerm, stateFilter, integrationFilter])

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  // Ensure currentPage is within bounds when data changes
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [currentPage, totalPages])

  return (
    <div className="container mx-auto p-4 bg-black text-gray-100 min-h-screen">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold text-white">
          Netsurf Workspace Hub
        </h1>
        <FilterBar
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          integrationFilter={integrationFilter}
          setIntegrationFilter={setIntegrationFilter}
        />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <WorkspaceTable
        currentItems={currentItems}
        indexOfFirstItem={indexOfFirstItem}
        requestSort={requestSort}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalSellers={totalSellers}
        filteredItems={filteredItems}
      />
    </div>
  )
}