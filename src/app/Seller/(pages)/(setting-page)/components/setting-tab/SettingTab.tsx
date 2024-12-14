// @ts-nocheck
'use client'
import Link from 'next/link'
import { User, Briefcase, CreditCard, UserPlus } from 'lucide-react'
import { usePathname } from 'next/navigation'

const categories = [
  { name: 'User', icon: User, href: '/Seller/settings' },
  {
    name: 'Billing & Subscription',
    icon: CreditCard,
    href: '/Seller/settings/billing-subscription',
  },
]

function SettingTab() {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex flex-wrap justify-between rounded-lg bg-muted w-full mx-aut text-muted-foreground">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className={`${
              category.href === pathname
                ? 'rounded-md bg-background text-foreground shadow'
                : ''
            } group flex flex-1 items-center justify-center px-4 py-2 m-1 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:rounded-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          >
            <category.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            {category.name}
          </Link>
        ))}
      </nav>
    </>
  )
}

export default SettingTab
