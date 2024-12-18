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
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 dark:text-gray-300 text-gray-700 gap-4">
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
          className="dark:text-gray-100 text-gray-700 dark:border-gray-600 border-gray-300 
                   dark:hover:bg-gray-700 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900 
                   transition-colors dark:bg-gray-800 bg-white
                   disabled:dark:bg-gray-800 disabled:bg-gray-100
                   disabled:dark:text-gray-600 disabled:text-gray-400"
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
            className="w-16 mr-2 dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-300 
                     dark:text-gray-100 text-gray-900 dark:placeholder-gray-400 placeholder-gray-500"
            placeholder={currentPage.toString()}
          />
          <Button
            type="submit"
            variant="outline"
            className="dark:text-gray-100 text-gray-700 dark:border-gray-600 border-gray-300 
                     dark:hover:bg-gray-700 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900 
                     transition-colors dark:bg-gray-800 bg-white"
          >
            Go
          </Button>
        </form>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="dark:text-gray-100 text-gray-700 dark:border-gray-600 border-gray-300 
                   dark:hover:bg-gray-700 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900 
                   transition-colors dark:bg-gray-800 bg-white
                   disabled:dark:bg-gray-800 disabled:bg-gray-100
                   disabled:dark:text-gray-600 disabled:text-gray-400"
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}