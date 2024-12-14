'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '../../../../components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  Users,
  BarChart,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

import leapxLogo from '../favicon.ico'
import LogoutPopup from './LogoutPopup'
import ProximaDarkLogo from '../../../../public/images/proxima_logo_dark_mode.svg'
import ProximaLightLogo from '../../../../public/images/proxima_logo_light_mode.svg'

import NavbarSkeleton from './NavbarSkeleton'

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/Admin/dashboard', 
    icon: Home 
  },
  {
    name: 'Product & Offers',
    icon: Package,
    children: [
      { name: 'Manage Products', path: '/Admin/products' },
      { name: 'Manage Offers', path: '/Admin/offers' },
    ]
  },
  {
    name: 'Sellers',
    icon: Users,
    children: [
      { name: 'Sellers Directory', path: '/Admin/Sellers' },
      { name: 'Add New Sellers', path: '/Admin/Sellers/new' },
    ]
  },
  
  {
    name: 'Reports',
    icon: FileText,
    children: [
      { name: 'Create A Reports', path: '/Admin/reports/create' },
      { name: 'Schedule Report', path: '/Admin/reports/schedule' },
    ]
  },
  {
    name: 'Settings',
    icon: Settings,
    children: [
      { name: 'Account Settings', path: '/Admin/settings/account' },
      { name: 'User Managements', path: '/Admin/settings/users' },
      { name: 'Ad Preferences', path: '/Admin/settings/ads' },
    ]
  },
]

export default function Sidebar({ className = '' }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // Close mobile menu on route change
    const handleRouteChange = () => {
      setIsMobileOpen(false)
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  // Close mobile menu on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen)

  // Function to handle nav item clicks
  const handleNavItemClick = (item: any) => {
    if (isCollapsed) {
      setIsCollapsed(false)
    }
    if (item.path) {
      router.push(item.path)
    }
  }

  const toggleExpand = (itemName: string) => {
    setExpandedItems(current =>
      current.includes(itemName)
        ? current.filter(name => name !== itemName)
        : [itemName]
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  if (!mounted) {
    return <NavbarSkeleton />
  }

  const renderNavItem = (item: any, level = 0) => {
    const isExpanded = expandedItems.includes(item.name)
    const hasChildren = item.children && item.children.length > 0
    const isActive = pathName === item.path || 
      (hasChildren && item.children.some((child: any) => pathName === child.path))

   return (
  <div key={item.name} className="w-full overflow-hidden">
    <Button
      variant={isActive && !hasChildren ? 'default' : 'ghost'}
      className={`w-full justify-between h-8 px-2 text-sm transition-all duration-300 ease-in-out ${
        isCollapsed ? 'p-0' : ''
      } ${level > 0 ? 'pl-6 text-sm ' : ''}`}
      onClick={() => {
        if (hasChildren) {
          if (isCollapsed) {
            setIsCollapsed(false)
          }
          toggleExpand(item.name)
        } else {
          handleNavItemClick(item)
        }
      }}
    >
      <div className={`flex items-center transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-full justify-center' : 'mr-2'
      }`}>
        {item.icon && (
          <item.icon className="h-4 w-4" />
        )}
      </div>
      <div className={`flex-1 flex justify-between items-center transition-opacity duration-300 ease-in-out ${
        isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
      }`}>
        <span className="whitespace-nowrap">{item.name}</span>
        {hasChildren && (
          <ChevronDown
            className={` h-4 w-4 transition-transform duration-300 ease-in-out inline-block ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>
    </Button>
    {hasChildren && (
      <div className={`mt-0.5 space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? 'h-0 opacity-0' : isExpanded ? 'h-auto opacity-100' : 'h-0 opacity-0'
      }`}>
        {item.children.map((child: any) => renderNavItem(child, level + 1))}
      </div>
    )}
  </div>
)
  }

  // Mobile menu button for smaller screens
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      className="md:hidden fixed top-3 left-4 z-50 p-2"
      onClick={toggleMobileMenu}
    >
      {isMobileOpen ? (
        <X className="h-6 w-6 z-40" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </Button>
  )

  // Overlay for mobile menu
  const MobileOverlay = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
        isMobileOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsMobileOpen(false)}
    />
  )

  return (
    <>
      <MobileMenuButton />
      <MobileOverlay />
      
      <aside
        className={`transition-all duration-300 ease-in-out h-screen md:p-2 pt-0 flex flex-col justify-between dark:border-none dark:shadow-md border-r-2 fixed bg-white dark:bg-black z-50
          md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'md:w-14 w-48' : 'w-48'}
          ${className}
          md:relative
        `}
      >
        <div>
          <div className={`transition-all duration-300 ease-in-out ${
            isCollapsed ? 'pl-0 border-black dark:border-white border-b-2' : 'pl-1'
          } relative h-12 flex flex-row justify-left items-center text-center pb-2 mt-4 px-3 md:mt-0`}>
            <div className={`transition-opacity duration-300 ease-in-out ${
              isCollapsed ? 'opacity-100' : 'opacity-0 hidden'
            }`}>
              <Image
                src={leapxLogo}
                alt="LeapX Logo"
                width={90}
                height={24}
                className='ml-2'
                priority
              />
            </div>
            <div className={`transition-opacity duration-300 ease-in-out ${
              isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
            } flex text-left h-12 w-full relative`}>
              <Image
                key={currentTheme}
                src={currentTheme === 'dark' ? ProximaDarkLogo : ProximaLightLogo}
                alt="LeapX Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              className="p-0 px-1.5 h-6 justify-center absolute -right-8 z-[1000] dark:bg-[#171717] bg-[#F0F3F6] border border-1 transition-transform duration-300 ease-in-out hover:scale-105 hidden md:flex"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 z-10" />
              ) : (
                <ChevronLeft className="h-4 w-4 z-10" />
              )}
            </Button>
          </div>

          <nav className="space-y-1 mt-4">
            {navItems.map(item => renderNavItem(item))}
          </nav>
        </div>
        
        <div className="pt-2">
          <Button
            variant="ghost"
            className={`w-full justify-start h-8 px-2 text-sm transition-all duration-300 ease-in-out ${
              isCollapsed ? 'p-0' : ''
            }`}
          >
            <HelpCircle className={`h-4 w-4 transition-all duration-300 ease-in-out ${
              isCollapsed ? 'mx-auto' : 'mr-2'
            }`} />
            <span className={`transition-opacity duration-300 ease-in-out ${
              isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
            }`}>
              Help
            </span>
          </Button>
          <LogoutPopup isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  )
}