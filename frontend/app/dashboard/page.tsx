'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { FiUpload, FiLayout, FiFileText, FiGlobe, FiMessageSquare, FiDollarSign } from 'react-icons/fi'

type StatEntry = {
  label: string
  value: number
  change: number
}

type PharmacyStats = {
  totalOrders: number
  totalOrdersChange: number
  pendingOrders: number
  pendingOrdersChange: number
  monthlyOrders: number
  monthlyOrdersChange: number
}

const defaultPharmacyStats: PharmacyStats = {
  totalOrders: 342,
  totalOrdersChange: 18,
  pendingOrders: 12,
  pendingOrdersChange: -2,
  monthlyOrders: 267,
  monthlyOrdersChange: 8,
}

const formatChange = (value: number) => `${value > 0 ? '+' : ''}${value}%`

const AnimatedNumber = ({ value, duration = 900 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const startValueRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const startValue = startValueRef.current
    const difference = value - startValue
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const nextValue = Math.round(startValue + difference * progress)
      setDisplayValue(nextValue)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        startValueRef.current = value
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [value, duration])

  useEffect(() => {
    startValueRef.current = 0
    setDisplayValue(0)
  }, [])

  return <>{displayValue.toLocaleString()}</>
}

export default function DashboardPage() {
  const [userType, setUserType] = useState<'hospital' | 'pharmacy'>('hospital')
  const [selectedFeatures, setSelectedFeatures] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [pharmacyStats, setPharmacyStats] = useState<PharmacyStats>(defaultPharmacyStats)

  useEffect(() => {
    // Get user type from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserType(user.businessType || user.business_type || 'hospital')
    }

    // Get selected features (for hospital)
    const features = localStorage.getItem('selectedFeatures')
    if (features) {
      setSelectedFeatures(JSON.parse(features))
    }

    // Get total price
    const price = localStorage.getItem('totalPrice')
    if (price) {
      setTotalPrice(parseFloat(price))
    }

    // Get selected template (for pharmacy)
    const template = localStorage.getItem('selectedTemplate')
    if (template) {
      setSelectedTemplate(parseInt(template))
    }

    const storedPharmacyStats = localStorage.getItem('pharmacyStats')
    if (storedPharmacyStats) {
      try {
        const parsedStats = JSON.parse(storedPharmacyStats)
        setPharmacyStats((prev) => ({
          ...prev,
          ...parsedStats,
        }))
      } catch (error) {
        console.error('Failed to parse pharmacy stats from localStorage', error)
      }
    }
  }, [])

  const pharmacyStatEntries: StatEntry[] = [
    {
      label: 'Total Orders',
      value: pharmacyStats.totalOrders,
      change: pharmacyStats.totalOrdersChange,
    },
    {
      label: 'Pending Orders',
      value: pharmacyStats.pendingOrders,
      change: pharmacyStats.pendingOrdersChange,
    },
    {
      label: 'This Month',
      value: pharmacyStats.monthlyOrders,
      change: pharmacyStats.monthlyOrdersChange,
    },
  ]

  const setupSteps = [
    { label: 'Upload Logo', completed: false },
    { label: 'Choose Template', completed: false },
    { label: 'Fill Website Options', completed: false },
    { label: 'Publish', completed: false },
  ]

  const stats: StatEntry[] = userType === 'hospital' 
    ? [
        { label: 'Total Appointments', value: 124, change: 12 },
        { label: 'Pending Appointments', value: 8, change: -3 },
        { label: 'This Month', value: 89, change: 5 },
      ]
    : pharmacyStatEntries

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-neutral-gray">Welcome back! Here's your website setup progress.</p>
      </div>

      {/* Setup Progress */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-dark mb-4 sm:mb-6">Setup Progress</h2>
        <ProgressBar steps={setupSteps} currentStep={0} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Link href="/dashboard/business-info">
            <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <FiUpload className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-medium text-neutral-dark mb-1">Upload Logo</h3>
              <p className="text-sm text-neutral-gray">Add your logo</p>
            </Card>
          </Link>
          {userType === 'pharmacy' ? (
            <Link href="/dashboard/pharmacy/templates">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiLayout className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Choose Template</h3>
                <p className="text-sm text-neutral-gray">Select a design</p>
              </Card>
            </Link>
          ) : (
            <Link href="/dashboard/hospital/setup">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiLayout className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Hospital Setup</h3>
                <p className="text-sm text-neutral-gray">Configure features</p>
              </Card>
            </Link>
          )}
          {userType === 'pharmacy' ? (
            <Link href="/dashboard/pharmacy/setup">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiFileText className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Pharmacy Setup</h3>
                <p className="text-sm text-neutral-gray">Add products & info</p>
              </Card>
            </Link>
          ) : (
            <Link href="/dashboard/business-info">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiFileText className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Business Info</h3>
                <p className="text-sm text-neutral-gray">Add business info</p>
              </Card>
            </Link>
          )}
          {userType === 'pharmacy' ? (
            <button
              type="button"
              onClick={() => {
                if (selectedTemplate) {
                  window.open(`/templates/pharmacy/${selectedTemplate}`, '_blank', 'noopener,noreferrer')
                } else {
                  window.open('/templates/pharmacy/1?demo=1', '_blank', 'noopener,noreferrer')
                }
              }}
              className="p-0 m-0 text-left"
            >
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiGlobe className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Publish</h3>
                <p className="text-sm text-neutral-gray">
                  {selectedTemplate ? 'View your live website' : 'Preview demo website'}
                </p>
              </Card>
            </button>
          ) : (
            <Link href="/dashboard/hospital/setup?step=publish">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FiGlobe className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium text-neutral-dark mb-1">Publish</h3>
                <p className="text-sm text-neutral-gray">Go live</p>
              </Card>
            </Link>
          )}
        </div>
      </Card>

      {/* Pricing Summary */}
      {(selectedFeatures || selectedTemplate) && (
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-dark mb-2">Pricing Summary</h2>
              <p className="text-sm sm:text-base text-neutral-gray">
                {userType === 'hospital' 
                  ? 'Selected features for your website'
                  : `Template #${selectedTemplate} selected`
                }
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary-light px-4 sm:px-6 py-3 rounded-lg w-full sm:w-auto">
              <FiDollarSign className="text-primary" size={24} />
              <span className="text-2xl sm:text-3xl font-bold text-primary">{totalPrice}</span>
            </div>
          </div>
          {userType === 'hospital' && selectedFeatures && (
            <div className="mt-4 pt-4 border-t border-neutral-border">
              <p className="text-sm font-medium text-neutral-dark mb-2">Selected Features:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFeatures).map(([key, value]) => {
                  if (value && key !== 'departments' && key !== 'bookingSystem' && key !== 'bookingUrl' && key !== 'phone' && key !== 'email' && key !== 'address') {
                    return (
                      <span key={key} className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <p className="text-sm text-neutral-gray mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-neutral-dark mb-2">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className={`text-sm ${stat.change >= 0 ? 'text-success' : 'text-error'}`}>
              {formatChange(stat.change)} from last month
            </p>
          </Card>
        ))}
      </div>

      {/* AI Assistant Preview */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-dark">AI Assistant</h2>
          <Link href="/dashboard/ai-assistant">
            <Button variant="ghost" className="text-sm sm:text-base">View All</Button>
          </Link>
        </div>
        <div className="bg-neutral-light rounded-lg p-4 sm:p-6 h-40 sm:h-48 flex items-center justify-center">
          <div className="text-center">
            <FiMessageSquare className="mx-auto mb-3 text-ai" size={40} />
            <p className="text-neutral-gray mb-4">Get help with your website</p>
            <Link href="/dashboard/ai-assistant">
              <Button variant="primary">Open AI Assistant</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

