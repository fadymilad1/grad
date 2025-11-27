'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  FiHome,
  FiGlobe,
  FiLayout,
  FiInfo,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  href: string
}

interface SidebarProps {
  userType?: 'hospital' | 'pharmacy'
}

export const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUserType, setCurrentUserType] = useState<'hospital' | 'pharmacy'>('hospital')

  useEffect(() => {
    // Get user type from localStorage (same method as dashboard)
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setCurrentUserType(user.businessType || 'hospital')
      } catch (e) {
        // Fallback to hospital if parsing fails
        setCurrentUserType('hospital')
      }
    } else if (userType) {
      // Use prop if provided
      setCurrentUserType(userType)
    }
  }, [userType])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const menuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: <FiHome />, href: '/dashboard' },
    { 
      label: 'My Website', 
      icon: <FiGlobe />, 
      href: currentUserType === 'pharmacy' ? '/dashboard/pharmacy/setup' : '/dashboard/hospital/setup' 
    },
    ...(currentUserType === 'pharmacy'
      ? [{ label: 'Templates', icon: <FiLayout />, href: '/dashboard/pharmacy/templates' }]
      : []),
    { label: 'Business Info', icon: <FiInfo />, href: '/dashboard/business-info' },
    { label: 'AI Assistant', icon: <FiMessageSquare />, href: '/dashboard/ai-assistant' },
    { label: 'Settings', icon: <FiSettings />, href: '/dashboard/settings' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="w-64 bg-white border-r border-neutral-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-neutral-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Medify logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="text-2xl font-bold text-primary">Medify</span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive(item.href)
                ? 'bg-primary-light text-primary font-medium'
                : 'text-neutral-gray hover:bg-neutral-light'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-border">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-neutral-light w-full transition-colors"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

