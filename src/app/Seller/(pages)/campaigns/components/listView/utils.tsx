// @ts-nocheck
import { MicIcon, MonitorIcon, VideoIcon, FacebookIcon, ImageIcon, FileIcon } from 'lucide-react'

export function getFormattedDate(dateString:any) {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return null
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function FormatNumber(number) {
  return new Intl.NumberFormat().format(number)
}

export function getStatusColor(status) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    enable: 'bg-green-100 text-green-800',
    enabled: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    removed: 'bg-red-100 text-red-800',
    'ending soon': 'bg-orange-100 text-orange-800',
    'needs budget': 'bg-blue-100 text-blue-800',
    'needs creative': 'bg-purple-100 text-purple-800',
    'needs audience adjustments': 'bg-pink-100 text-pink-800',
  }
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

export function getMatchTypeColor(matchType) {
  const colors = {
    'Broad match': 'bg-blue-100 text-blue-800',
    'Phrase match': 'bg-purple-100 text-purple-800',
    'Exact match': 'bg-indigo-100 text-indigo-800',
  }
  return colors[matchType] || 'bg-gray-100 text-gray-800'
}

export function getCampaignTypeIcon(type, platform) {
  if (platform === 'google') {
    switch (type) {
      case 'search':
        return <MicIcon className="h-4 w-4 text-blue-600" />
      case 'display':
        return <MonitorIcon className="h-4 w-4 text-green-600" />
      case 'video':
        return <VideoIcon className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  } else if (platform === 'meta') {
    return <FacebookIcon className="h-4 w-4 text-blue-600" />
  }
  return null
}

export function getAdTypeIcon(type) {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-4 w-4 text-purple-600" />
    case 'video':
      return <VideoIcon className="h-4 w-4 text-red-600" />
    case 'carousel':
      return <ImageIcon className="h-4 w-4 text-green-600" />
    default:
      return <FileIcon className="h-4 w-4 text-gray-600" />
  }
}

export function formatPercentage(value) {
  return `${(Number(value) * 100).toFixed(2)}%`
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}