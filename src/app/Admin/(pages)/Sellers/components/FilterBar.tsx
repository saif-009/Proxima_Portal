// components/FilterBar.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"
import type { FilterBarProps } from './Types/workspace'

export const FilterBar: React.FC<FilterBarProps> = ({ 
  stateFilter, 
  setStateFilter, 
  integrationFilter, 
  setIntegrationFilter 
}) => {
  // List of Indian states
  const states = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 
    'Gujarat', 'Kerala', 'Rajasthan', 'Punjab', 
    'Haryana', 'Other'
  ]

  return (
    <div className="flex space-x-4 w-full md:w-auto">
      {/* State Filter - Commented out as requested
      <Select value={stateFilter} onValueChange={setStateFilter}>
        <SelectTrigger className="w-full md:w-[180px] bg-[#262626] border border-gray-200/20 text-gray-100">
          <SelectValue placeholder="Filter by State" />
        </SelectTrigger>
        <SelectContent className="bg-[#262626] border border-gray-200/20 text-gray-100">
          <SelectItem value="All">All States</SelectItem>
          {states.map(state => (
            <SelectItem key={state} value={state}>{state}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      */}

      {/* Integration Filter - Commented out as requested
      <Select value={integrationFilter} onValueChange={setIntegrationFilter}>
        <SelectTrigger className="w-full md:w-[180px] bg-[#262626] border border-gray-200/20 text-gray-100">
          <SelectValue placeholder="Filter by Integration" />
        </SelectTrigger>
        <SelectContent className="bg-[#262626] border border-gray-200/20 text-gray-100">
          <SelectItem value="All">All Integrations</SelectItem>
          <SelectItem value="Meta">Meta</SelectItem>
          <SelectItem value="Google">Google</SelectItem>
          <SelectItem value="None">No Integration</SelectItem>
        </SelectContent>
      </Select>
      */}
    </div>
  )
}