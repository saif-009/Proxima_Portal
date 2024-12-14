// types/workspace.ts
export interface Workspace {
  id: number
  sellerName: string
  sellerRefNo: string
  contactName: string
  email: string
  phone: string
  state: string
  adAccountName: string
  adAccountId: string
  workspaceId: string
  integrations: string[]
  spendsTillDate: number
  status: 'Active' | 'Inactive' | 'Pending'
  walletBalance: number
  joinedOn: string | null
}

export interface FilterBarProps {
  stateFilter: string
  setStateFilter: (value: string) => void
  integrationFilter: string
  setIntegrationFilter: (value: string) => void
}

export interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  prevPage: () => void
  nextPage: () => void
  jumpToPage: string
  setJumpToPage: (page: string) => void
  setCurrentPage: (page: number) => void
  totalSellers: number
  filteredItems: Workspace[]
}
