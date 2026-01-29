'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FiLogOut } from 'react-icons/fi'

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
  })

  const [subscriptionPlan, setSubscriptionPlan] = useState('professional')
  const [domain, setDomain] = useState('myhospital.medify.com')

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle profile update
    console.log('Profile updated:', profileData)
  }

  const handleLogout = () => {
    // Handle logout
    window.location.href = '/login'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-dark mb-2">Settings</h1>
        <p className="text-neutral-gray">Manage your account and website settings</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-dark mb-6">Profile Settings</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <Input
            label="Phone"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          />
          <div className="flex justify-end">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Subscription Plan */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-dark mb-6">Subscription Plan</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
            <div>
              <h3 className="font-semibold text-neutral-dark">Professional Plan</h3>
              <p className="text-sm text-neutral-gray">$79/month</p>
            </div>
            <Button variant="secondary">Change Plan</Button>
          </div>
          <div className="text-sm text-neutral-gray">
            <p>Next billing date: January 15, 2024</p>
            <p>Auto-renewal: Enabled</p>
          </div>
        </div>
      </Card>

      {/* Domain Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-dark mb-6">Domain Settings</h2>
        <div className="space-y-4">
          <Input
            label="Current Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled
          />
          <p className="text-sm text-neutral-gray">
            To use a custom domain, please contact support or upgrade to Enterprise plan.
          </p>
          <Button variant="secondary">Configure Custom Domain</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-2 border-error">
        <h2 className="text-xl font-semibold text-error mb-6">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-dark">Logout</h3>
              <p className="text-sm text-neutral-gray">Sign out of your account</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <FiLogOut className="mr-2" />
              Logout
            </Button>
          </div>
          <div className="border-t border-neutral-border pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-error">Delete Account</h3>
                <p className="text-sm text-neutral-gray">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="secondary" className="border-error text-error hover:bg-error hover:text-white">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

