'use client'

import { useState } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { Input } from '../../../../../../components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  totalSellers: number
  filteredItems: any[]
}

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalSellers,
  filteredItems,
}: PaginationProps) => {
  const [inputPage, setInputPage] = useState('')

  const handlePrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1))
  }

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNumber = parseInt(inputPage)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      setInputPage('') // Clear input after jumping
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-300 gap-4">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">
          {totalSellers - filteredItems.length} of {totalSellers} Sellers remaining
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="outline"
          className="text-gray-100 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <form onSubmit={handleJumpToPage} className="flex items-center">
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="w-16 mr-2 bg-gray-800 border-gray-700 text-gray-100"
            placeholder={currentPage.toString()}
          />
          <Button
            type="submit"
            variant="outline"
            className="text-gray-100 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors bg-gray-800"
          >
            Go
          </Button>
        </form>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="text-gray-100 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors bg-gray-800"
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}