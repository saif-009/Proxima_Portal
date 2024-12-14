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
        className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
  )
}