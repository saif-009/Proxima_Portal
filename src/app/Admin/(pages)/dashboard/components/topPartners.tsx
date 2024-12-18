import React, { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '../../../../../../components/ui/tabs'
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'

const TopSellers = () => {
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [sortConfig, setSortConfig] = useState({
    key: 'leads',
    direction: 'desc',
  })

  const sellers = [
    // Naturamore sellers
    {
      dealer: 'Seller 01',
      spends: '₹11,97,422',
      leads: 1397,
      cpl: 492,
      brand: 'Naturamore',
    },
    {
      dealer: 'Seller 02',
      spends: '₹6,25,299',
      leads: 1381,
      cpl: 515,
      brand: 'Naturamore',
    },
    // Herbs & More sellers
    {
      dealer: 'Seller 03',
      spends: '₹11,92,266',
      leads: 1125,
      cpl: 610,
      brand: 'Herbs & More',
    },
    {
      dealer: 'Seller 04',
      spends: '₹14,51,199',
      leads: 996,
      cpl: 635,
      brand: 'Herbs & More',
    },
    // Clean & More sellers
    {
      dealer: 'Seller 07',
      spends: '₹14,51,199',
      leads: 996,
      cpl: 635,
      brand: 'Clean & More',
    },
    {
      dealer: 'Seller 08',
      spends: '₹6,25,299',
      leads: 1381,
      cpl: 515,
      brand: 'Clean & More',
    },
  ]

  const brands = ['All Brands', 'Naturamore', 'Herbs & More', 'Clean & More']

  const requestSort = (key) => {
    let direction = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  const sortedSellers = useMemo(() => {
    let sortedData = [...sellers]
    if (activeBrand !== 'All Brands') {
      sortedData = sortedData.filter((seller) => seller.brand === activeBrand)
    }

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === 'spends') {
          aValue = parseInt(a[sortConfig.key].replace(/[₹,]/g, ''))
          bValue = parseInt(b[sortConfig.key].replace(/[₹,]/g, ''))
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortedData
  }, [sellers, sortConfig, activeBrand])

  return (
    <div className="bg-gray-50 dark:bg-black">
      <div className="rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-4">
          <h2 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">
            Top Sellers
          </h2>

          {/* Brand Tabs */}
          <Tabs defaultValue="All Brands" className="w-full mb-4">
            <TabsList className="bg-gray-100 dark:bg-zinc-900 w-full flex flex-wrap">
              {brands.map((brand) => (
                <TabsTrigger
                  key={brand}
                  value={brand}
                  onClick={() => setActiveBrand(brand)}
                  className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 
                 text-gray-500 dark:text-zinc-400 
                 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                 px-4 py-2.5 min-h-[40px]
                 text-sm font-medium
                 hover:text-gray-900 dark:hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {brand}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Sellers Table */}
          <div className="rounded-md border border-gray-200 dark:border-zinc-800 min-h-[400px] w-full">
            <Table className="w-full">
              <TableHeader className="bg-gray-50 dark:bg-zinc-500/40">
                <TableRow className="hover:bg-gray-100/80 dark:hover:bg-zinc-900/40 border-gray-200 dark:border-zinc-800">
                  <TableHead
                    className="text-gray-900 dark:text-white cursor-pointer w-1/4"
                    onClick={() => requestSort('dealer')}
                  >
                    <div className="flex items-center gap-2">
                      Sellers
                      {getSortIcon('dealer')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-gray-900 dark:text-white cursor-pointer w-1/4"
                    onClick={() => requestSort('spends')}
                  >
                    <div className="flex items-center gap-2">
                      Spends
                      {getSortIcon('spends')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-gray-900 dark:text-white cursor-pointer w-1/4"
                    onClick={() => requestSort('leads')}
                  >
                    <div className="flex items-center gap-2">
                      Leads
                      {getSortIcon('leads')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-gray-900 dark:text-white cursor-pointer w-1/4"
                    onClick={() => requestSort('cpl')}
                  >
                    <div className="flex items-center gap-2">
                      Cost Per Lead
                      {getSortIcon('cpl')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSellers.map((seller, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 border-gray-200 dark:border-zinc-800"
                  >
                    <TableCell className="font-medium text-gray-700 dark:text-zinc-300 w-1/4">
                      {seller.dealer}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-zinc-300 w-1/4">
                      {seller.spends}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-zinc-300 w-1/4 pl-4 lg:pl-0">
                      {seller.leads}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-zinc-300 w-1/4 pl-4 md:pl-8">
                      ₹{seller.cpl}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSellers
