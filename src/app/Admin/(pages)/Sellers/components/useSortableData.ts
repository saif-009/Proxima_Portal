// hooks/useSortableData.ts
import { useState, useMemo, useCallback } from 'react'
import type { Workspace } from './Types/workspace'

interface SortConfig {
  key: keyof Workspace
  direction: 'ascending' | 'descending'
}

export const useSortableData = (items: Workspace[], config: SortConfig | null = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config)

  const sortedItems = useMemo(() => {
    let sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle null values
        if (a[sortConfig.key] === null) return sortConfig.direction === 'ascending' ? 1 : -1
        if (b[sortConfig.key] === null) return sortConfig.direction === 'ascending' ? -1 : 1

        // Handle different types of values
        if (typeof a[sortConfig.key] === 'string' && typeof b[sortConfig.key] === 'string') {
          return sortConfig.direction === 'ascending'
            ? (a[sortConfig.key] as string).localeCompare(b[sortConfig.key] as string)
            : (b[sortConfig.key] as string).localeCompare(a[sortConfig.key] as string)
        }

        if (Array.isArray(a[sortConfig.key])) {
          return sortConfig.direction === 'ascending'
            ? (a[sortConfig.key] as string[]).length - (b[sortConfig.key] as string[]).length
            : (b[sortConfig.key] as string[]).length - (a[sortConfig.key] as string[]).length
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = useCallback(
    (key: keyof Workspace) => {
      let direction: 'ascending' | 'descending' = 'ascending'
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending'
      }
      setSortConfig({ key, direction })
    },
    [sortConfig],
  )

  return { items: sortedItems, requestSort, sortConfig }
}