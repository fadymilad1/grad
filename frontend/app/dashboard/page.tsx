'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { FiUpload, FiLayout, FiFileText, FiGlobe, FiMessageSquare, FiDollarSign } from 'react-icons/fi'

export default function DashboardPage() {
  const [userType, setUserType] = useState<'hospital' | 'pharmacy'>('hospital')
  const [selectedFeatures, setSelectedFeatures] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    // Get user type from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserType(user.businessType || 'hospital')
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
  }, [])

  const setupSteps = [
    { label: 'Upload Logo', completed: false },
    { label: 'Choose Template', completed: false },
    { label: 'Fill Website Options', completed: false },
    { label: 'Publish', completed: false },
  ]

  const stats = userType === 'hospital' 
    ? [
        { label: 'Total Appointments', value: '124', change: '+12%' },
        { label: 'Pending Appointments', value: '8', change: '-3%' },
        { label: 'This Month', value: '89', change: '+5%' },
      ]
    : [
        { label: 'Total Orders', value: '342', change: '+18%' },
        { label: 'Pending Orders', value: '12', change: '-2%' },
        { label: 'This Month', value: '267', change: '+8%' },
      ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-dark mb-2">Dashboard</h1>
        <p className="text-neutral-gray">Welcome back! Here's your website setup progress.</p>
      </div>

      {/* Setup Progress */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-dark mb-6">Setup Progress</h2>
        <ProgressBar steps={setupSteps} currentStep={0} />
        <div className="grid grid-cols-4 gap-4 mt-8">
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
            <Card className="p-4 text-center opacity-50 cursor-not-allowed">
              <FiGlobe className="mx-auto mb-3 text-neutral-gray" size={32} />
              <h3 className="font-medium text-neutral-dark mb-1">Publish</h3>
              <p className="text-sm text-neutral-gray">Coming soon</p>
            </Card>
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
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-dark mb-2">Pricing Summary</h2>
              <p className="text-neutral-gray">
                {userType === 'hospital' 
                  ? 'Selected features for your website'
                  : `Template #${selectedTemplate} selected`
                }
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary-light px-6 py-3 rounded-lg">
              <FiDollarSign className="text-primary" size={24} />
              <span className="text-3xl font-bold text-primary">{totalPrice}</span>
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
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <p className="text-sm text-neutral-gray mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-neutral-dark mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
              {stat.change} from last month
            </p>
          </Card>
        ))}
      </div>

      {/* AI Assistant Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-dark">AI Assistant</h2>
          <Link href="/dashboard/ai-assistant">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="bg-neutral-light rounded-lg p-6 h-48 flex items-center justify-center">
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

