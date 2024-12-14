'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Bell, ChevronDown, PanelsTopLeft } from 'lucide-react'

import { Button } from '../../../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components/ui/sheet"
import { ModeToggle } from './ModeToggleButton'

// Types
interface Workspace {
  id: string
  name: string
}

interface HeaderProps {
  className?: string
  userName?: string
}

// Dummy Data
const DUMMY_WORKSPACES: Workspace[] = [
  { id: 'ws1', name: 'Netsurf Admin Workspace' },
  
]

export default function Header({ className, userName = 'Nidhaan' }: HeaderProps) {
  const router = useRouter()
  
  // State
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<string>('')
  
  // Effects
  React.useEffect(() => {
    if (!selectedWorkspace && DUMMY_WORKSPACES.length > 0) {
      setSelectedWorkspace(DUMMY_WORKSPACES[0].id)
    }
  }, [])

  // Handlers
  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId)
  }

  const truncateText = (text: string) => {
    if (text.length > 20) {
      return `${text.slice(0, 20)}...`
    }
    return text
  }

  const Controls = () => (
    <>
      {/* Overview Selector */}
      <Select
        value={selectedWorkspace}
        onValueChange={handleWorkspaceChange}
      >
        <SelectTrigger className="bg-transparent text-white hover:bg-gray-800 focus:ring-0 w-[200px] lg:w-[200px] md:w-[180px] sm:w-[150px] hidden md:flex items-center justify-between">
          <SelectValue placeholder="Select Overview" />
        </SelectTrigger>
        <SelectContent>
          {DUMMY_WORKSPACES.map((workspace) => (
            <SelectItem
              key={workspace.id}
              value={workspace.id}
            >
              {truncateText(workspace.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Theme Toggle */}
      <div className="[&>button]:bg-transparent [&>button]:border-none [&>button]:text-white [&>button:hover]:bg-gray-800 hidden sm:block">
        <ModeToggle />
      </div>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-gray-800 hidden sm:flex"
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>

      {/* User Avatar - Square */}
      <div className="w-8 h-8 overflow-hidden rounded">
        <img 
          src="https://github.com/shadcn.png" 
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  )

  return (
    <header className="flex justify-between items-center sticky top-0 px-2 sm:px-4 py-4 h-16 z-40 bg-black text-white border border-b-gray-200/20 border-l-0">
      {/* Left side - Greeting */}
      <div className="flex items-end gap-2  ml-12 lg:ml-4">
        <span className="font-inter text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FE6515] to-[#AC56FF] bg-clip-text text-transparent">
          Hey {userName}
        </span>
        <span className="font-inter text-lg hidden lg:inline"> Welcome Back!</span>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
              <PanelsTopLeft className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black text-white">
            <div className="flex flex-col gap-4 mt-8">
              {/* Mobile Overview Selector */}
              <Select
                value={selectedWorkspace}
                onValueChange={handleWorkspaceChange}
              >
                <SelectTrigger className="bg-transparent text-white hover:bg-gray-800 focus:ring-0 w-full">
                  <SelectValue placeholder="Select Overview" />
                </SelectTrigger>
                <SelectContent>
                  {DUMMY_WORKSPACES.map((workspace) => (
                    <SelectItem
                      key={workspace.id}
                      value={workspace.id}
                    >
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Theme Toggle */}
              <div className="[&>button]:bg-transparent [&>button]:border-none [&>button]:text-white [&>button:hover]:bg-gray-800 sm:hidden">
                <ModeToggle /> 
              </div>

              {/* Mobile Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800 sm:hidden"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Controls */}
        <Controls />
      </div>
    </header>
  )
}