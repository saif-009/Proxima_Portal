// @ts-nocheck
'use client'
import Image from 'next/image'
import * as React from 'react'
import { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import { Bell, Wallet as WalletIcon, AlignJustify } from 'lucide-react'
import WalletCard from './Wallet'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetTitle,
} from '../../../../components/ui/sheet'
import { useRecoilState } from 'recoil'
import { Button } from '../../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../../../../components/ui/dropdown-menu'
import LeapXLightLogo from '../../../../public/leapx_icon_light_mode.svg'
import ProximaDarkLogo from '../../../../public/images/proxima_logo_dark_mode.svg'
import { settingsContext } from '@/context/settingContext'
import Axios from '@/Axios/Axios'
import Cookies from 'js-cookie'
import { ModeToggle } from './ModeToggleButton'
import { activeAccountAtom } from '@/store/activeAdAccount'
import { useRouter } from 'next/navigation'

const formatToIndianCurrency = (amount: number) => {
  return amount?.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR',
  })
}

const Header = () => {
//   const {
//     allWorkSpace,
//     userDetails,
//     tokens,
//     setActiveAdAcount,
//     getUserDetails,
//   } = React.useContext<any>(settingsContext)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedWorkSpace, setSelectWorkSpace] = useState('')
  const [showWallet, setShowWallet] = useState(false)
  const [fbAccount, setfbAccount] = useState('')
  const [fbAccountList,setfbAccountList]=useState([])
  const [loading, setIsLoadingPages] = useState(false)
  const [pagesError,setPagesError]=useState('')
//   const currPath = usePathname()
//   const [activeAdAccount, setActiveAdAcountDetails]=useRecoilState(activeAccountAtom)
const router = useRouter()
//   console.log('fbAccount', fbAccount)
//   console.log('account list', fbAccountList)
//   console.log('active account details of atom', activeAdAccount)
  const handleNavigation = (path: string) => {
    router.push(path)
    setMenuOpen(false)
  }

//   React.useEffect(() => {
//     const activeworkspace: any[] = allWorkSpace?.filter(
//       (val: any) => val?.workspace.id === selectedWorkSpace,
//     )


//     if (activeworkspace?.length) {
//       if (activeworkspace[0]?.workspace?.category === 'leapx') {
//         setShowWallet(true)
//         setActiveAdAcount(activeworkspace[0]?.workspace?.id)
//       } else {
//         setShowWallet(false)
//       }
//     } else {
//       setShowWallet(false)
//     }
//   }, [allWorkSpace, selectedWorkSpace])



//   const getWorkSpaceDetails = async () => {
//     setIsLoadingPages(true)
//     try {
//       console.log('inside workspace details')
//       const activeWorkspaceId = userDetails?.activeWorkspaceId
//       if (!activeWorkspaceId) {
//         return
//       }
 
//       const response = await Axios.get(`/get-workspace`, {
//         params: { workSpaceId: activeWorkspaceId }
//       })
 
//       if (response.status === 200) {
//         const fbId = response.data?.fbDetails?.fbAdAccount || []
//         const fbList = response.data?.fbDetails?.adAccountList || []
//         const matchingAccount = fbList?.find(account => account.id === fbId);
//         console.log('matching account: ', matchingAccount)
//         setActiveAdAcountDetails(matchingAccount)
//         setfbAccountList(fbList)
//         setfbAccount(fbId)
//       }
//     } catch (error) {
//       console.error('Error fetching workspace details:', error)
//       setPagesError('Failed to load FB pages')
//     } finally {
//       setIsLoadingPages(false)
//     }
//   }
 
//   useEffect(() => {
//     if (userDetails?.activeWorkspaceId) {
//       getWorkSpaceDetails()
//     }
//   }, [userDetails?.activeWorkspaceId])


//   useEffect(() => {
//     console.log("active ad account value: ",activeAdAccount)
//   },[activeAdAccount])

//   React.useEffect(() => {
//     if (userDetails?.activeWorkspaceId) {
//       console.log('user details', userDetails)

        

//       setSelectWorkSpace(userDetails?.activeWorkspaceId)
//     }
//   }, [userDetails])

//   const activateWorkSpace = async (id: string) => {
//     if (id) {
//       try {
//         const res = await Axios.get(
//           `/update-activated-workspace-id?workspaceId=${id}`,
//         )
//         if (res.status === 200 || res.status === 201) {
//           getUserDetails(tokens)
//           window.location.reload()
//         }
//       } catch (error) {
//         console.log('error', error)
//       }
//     }
//   }


  const onLogout = () => {
    Cookies.remove('token')

    router.push('/login')
    window.location.reload()
  }
  // if (currPath === '/home' || currPath === '/advance-analytics') {
    
  //   return (     
  //     <>
  //     </>
  //   )
  // }
//    if (currPath === '/dashboard' || currPath==='/launchads'  || currPath.startsWith('/home/')) {
    
//     return (     
//       <>
//       </>
//     )
//   }

  return (
    <header className="flex justify-end gap-2 items-center sticky top-0 py-4 z-40 md:pr-8 pr-2 shadow-sm bg-background">
      <div className="hidden md:flex flex-row w-full md:pl-10 pl-12 items-center justify-between  space-x-4">
      	<div className="header-area  text-left flex flex-row  md:items-end items-start md:gap-2">
          <div className="md:text-2xl text-lg bg-gradient-to-r from-[#FE6515] to-[#AC56FF] text-transparent bg-clip-text font-inter font-semibold">
            Hey{' '}
            <span className="bg-gradient-to-r from-[#FE6515] to-[#AC56FF] text-transparent bg-clip-text">
              Vishal,
            </span>
          </div>
          <div className="md:text-lg text-md dark:text-[#A7A7A7] text-[#2B2E48] font-inter font-medium ">
            Welcome Back!
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="bg-primary-foreground">
                <div className="flex items-center">
                  <WalletIcon className="h-5 w-5 mr-2" />
                  <span className="font-semibold">$7,000</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[40vw] max-w-[66.67vw] p-6 sm:max-w-[66.67vw] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Wallet</SheetTitle>
                <SheetDescription>View your wallet details</SheetDescription>
              </SheetHeader>
              {/* <WalletCard userData={userDetails} /> */}
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
        </Sheet>
   
        {/* <Select
          value={selectedWorkSpace}
          onValueChange={(value: any) => {
            setSelectWorkSpace(value)
            activateWorkSpace(value)
          }}
          className=""
        >
          <SelectTrigger className="md:w-[250px] w-[150px] dark:bg-primary-foreground bg-[#F0F3F6] dark:bg-[#171717]">
            <SelectValue placeholder="Ad Account - LeapX | My Ad Account" />
          </SelectTrigger>
          <SelectContent className=''>
            {allWorkSpace?.map((val: any, index:number) => (
              <SelectItem
                key={val?.workspace.id}
                value={val?.workspace.id}
                onClick={() => activateWorkSpace(val?.workspace.id)}
              >
               {val.workspace?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex md:hidden w-full ml-4 ">
              <Image
               // Force re-render when theme changes
                src={LeapXLightLogo}
                alt="LeapX Logo"
             width={80}
	     height={60}
                className="  "
                priority
                unoptimized // Disable image optimization to prevent caching
              />
        </div>
	<div className="flex md:hidden items-center md:space-x-4 space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
	  	<AlignJustify />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 ">
	  <DropdownMenuItem>
	    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="bg-transparent border-none p-0 !pt-5  shadow-none">
                Wallet
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[40vw] max-w-[66.67vw] p-6 sm:max-w-[66.67vw] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Wallet</SheetTitle>
                <SheetDescription>View your wallet details</SheetDescription>
              </SheetHeader>
              {/* <WalletCard userData={userDetails} /> */}
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
        </Sheet>
	    </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/")}>
	    	Launch Ad
            </DropdownMenuItem>
	    <DropdownMenuItem onClick={() => handleNavigation("/campaigns")}>
	    	Campaigns
            </DropdownMenuItem>
	    <DropdownMenuItem onClick={() => handleNavigation("/leads")}>
	    	Leads
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/")}>
              Settings
            </DropdownMenuItem>
	   
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <ModeToggle /> */}
      </div>
      <div className="md:flex hidden items-center md:space-x-4 space-x-1">
        {/* <Button
          variant="ghost"
          size="icon"
          className="text-foreground bg-[#F0F3F6] dark:bg-[#171717]"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 ">
            <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/settings/workspaces")}>
              Workspace
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/settings/billing-subscription")}>
              Subscription & Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
