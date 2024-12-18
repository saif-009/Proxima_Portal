// components/SearchBar.tsx
import { Input } from "../../../../../../components/ui/input"
import { Search } from "lucide-react"
import type { SearchBarProps } from './Types/workspace'

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:w-96">
      <Input
        placeholder="Search by seller name, reference, contact info..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 
        dark:text-gray-100 text-gray-900 dark:placeholder-gray-400 placeholder-gray-500 
        focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500"
        size={18}
      />
    </div>
  )
}