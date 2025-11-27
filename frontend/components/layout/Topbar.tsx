'use client'

import React, { useEffect, useState } from 'react'
import { FiBell, FiSearch } from 'react-icons/fi'

export const Topbar: React.FC = () => {
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    // Get user name from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setUserName(user.name || 'User')
      } catch (e) {
        // Handle error
      }
    }
  }, [])

  return (
    <div className="h-16 bg-white border-b border-neutral-border flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-gray hover:text-neutral-dark transition-colors">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-neutral-dark font-medium">{userName}</span>
        </div>
      </div>
    </div>
  )
}

