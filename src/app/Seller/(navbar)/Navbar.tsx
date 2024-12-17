'use client'

import React, { useState, useEffect, useContext } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../../../../components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ChartBarIcon,
  CirclePlus,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  MessageSquareCode 
} from 'lucide-react'

import { MdOutlineCampaign } from 'react-icons/md'
import leapxLogo from '../favicon.ico'
import LogoutPopup from './LogoutPopup'
import LeapXLightLogo from '../../../../public/images/leapx_icon_light_mode.svg'
import ProximaDarkLogo from '../../../../public/images/proxima_logo_dark_mode.svg'
import NavbarSkeleton from './NavbarSkeleton'
import { activeAccountAtom } from '../../../../store/activeAdAccount'
import { useRecoilValue } from 'recoil'
import { settingsContext } from '../../../../context/settingContext'

const navItems = [
  { name: 'Dashboard', path: '/Seller/dashboard', icon: Home },
  { name: 'Launch Ad', path: '/Seller/launchads', icon: CirclePlus },
  { name: 'Campaigns', path: '/Seller/campaigns', icon: MdOutlineCampaign },
  { name: 'Leads', path: '/Seller/leads', icon: Users },
  
]

export default function Component({ className = '' }) {

  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathName = usePathname()
  const context = useContext(settingsContext)
  const userDetails = context;


 

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  const onLogout = () => {
    Cookies.remove('token')
    router.push('/login')
    window.location.reload()
  }
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  // Get the current theme considering system preference
  const currentTheme = theme === 'system' ? systemTheme : theme

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return <NavbarSkeleton className='lg:block hidden'/> // or a loading skeleton
  }

  return (
    <aside
      className={`${
        isCollapsed ? 'md:w-[4.5rem] w-0 absolute md:relative bg-white dark:bg-black z-50 ' : 'md:w-40 lg:w-44  absolute md:relative bg-white dark:bg-black z-50'
      } h-screen md:p-4 pt-0 md:flex hidden flex-col justify-between rounded-xl dark:border-none dark:shadow-md border-r-2 transition-all duration-300 ${className}`}
    >
      <div>
        <div
          className={`mt-4 ${
            isCollapsed
              ? 'pl-0 border-black dark:border-white border-b-2'
              : 'pl-2'
          } relative h-[3.5rem] flex flex-row justify-left items-center text-center pb-[16px]`}
        >
          {isCollapsed ? (
            <Image
              src={leapxLogo}
              alt="LeapX Logo"
              width={120}
              height={30}
              priority
            />
          ) : (
            <div className="flex text-left  ">
              <Image
                key={currentTheme} // Force re-render when theme changes
                src={currentTheme === 'dark' ?  ProximaDarkLogo : LeapXLightLogo }
                alt="LeapX Logo"
                fill
                className="object-contain "
                priority
                unoptimized // Disable image optimization to prevent caching
              />
            </div>
          )}
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            className="p-0 px-2 justify-center absolute -right-10 z-[1000] dark:bg-[#171717] bg-[#F0F3F6] border border-1"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 z-10" />
            ) : (
              <ChevronLeft className="h-5 w-5 z-10" />
            )}
          </Button>
        </div>
        {/* Rest of the component remains the same
       {!isCollapsed && (
          <span className="font-medium text-[#2B2E48] dark:text-white ml-4 text-xs">
            MENU
          </span>
        )}  */}
        <nav className="space-y-2 mt-4 md:px-0 px-2">
          {navItems.map((item, idx) => (
            <Button
              key={idx}
              asChild
              variant={pathName === item.path ? 'default' : 'ghost'}
              className={`w-full justify-start ${isCollapsed ? 'p-0' : ''}`}
            >
              <Link href={item.path}>
                <item.icon
                  className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </Button>
          ))}
          <Button
            asChild
            variant={
              pathName === '/Seller/settings' ||
              pathName === '/Seller/settings/workspaces' ||
              pathName === '/Seller/settings/teams' ||
              pathName === '/Seller/settings/billing-subscription'
                ? 'default'
                : 'ghost'
            }
            className={`w-full justify-start ${isCollapsed ? 'p-0' : ''}`}
          >
            <Link href={'/Seller/settings'}>
              <Settings
                className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`}
              />
              {!isCollapsed && <span>{'Settings'}</span>}
            </Link>
          </Button>
        </nav>
      </div>
      <div className="pt-4">
        <Button
          variant="ghost"
          className={`w-full text-red-500 justify-start ${isCollapsed ? 'p-0' : ''}`}
        >
          <HelpCircle
            className={`h-5 w-5  ${isCollapsed ? 'mx-auto' : 'mr-2'}`}
          />
          {!isCollapsed && 'Help'}
        </Button>
        <LogoutPopup isCollapsed={isCollapsed} />
      </div>
    </aside>
  )
}