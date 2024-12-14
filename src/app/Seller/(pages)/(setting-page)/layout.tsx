import Link from 'next/link'
import { User, Briefcase, CreditCard } from 'lucide-react'
import SettingTab from './components/setting-tab/SettingTab'

const categories = [
  { name: 'User', icon: User, href: '/Seller/settings' },
  { name: 'Billing & Subscription', icon: CreditCard, href: '/Seller/settings/billing-subscription' },
]

export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full mx-auto px-6 ">
     <SettingTab/>
      <div className="py-6">{children}</div>
    </div>
  )
}