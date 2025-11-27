'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PaymentModal } from '@/components/payment/PaymentModal'
import { FiEye, FiCheck, FiMessageSquare } from 'react-icons/fi'

export default function PharmacyTemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [templateToPay, setTemplateToPay] = useState<number | null>(null)
  const [userType, setUserType] = useState<'hospital' | 'pharmacy'>('pharmacy')

  // Check user type and redirect hospital users
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      const businessType = user.businessType || 'hospital'
      setUserType(businessType)
      
      // Redirect hospital users to hospital setup
      if (businessType === 'hospital') {
        router.push('/dashboard/hospital/setup')
        return
      }
    }
  }, [router])

  const templates = [
    {
      id: 1,
      name: 'Modern Pharmacy',
      description: 'Clean and modern design perfect for modern pharmacies',
      image: '/modern pharmcy.jpg',
      price: 299,
      hasAI: true,
      features: ['Product Catalog', 'Online Ordering', 'Prescription Management', 'Blog', 'AI Chatbot'],
    },
    {
      id: 2,
      name: 'Classic Pharmacy',
      description: 'Traditional design with professional look',
      image: '/classic pharmcy.jpg',
      price: 199,
      hasAI: true,
      features: ['Product Showcase', 'Services Page', 'Contact Form', 'Location Map', 'AI Chatbot'],
    },
    {
      id: 3,
      name: 'Minimal Pharmacy',
      description: 'Minimalist design focusing on products',
      image: '/Minimal Pharmacy.jpeg',
      price: 149,
      hasAI: false,
      features: ['Simple Layout', 'Fast Loading', 'Mobile Optimized', 'SEO Ready'],
    },
  ]

  const handlePreview = (templateId: number) => {
    setSelectedTemplate(templateId)
    setPreviewOpen(true)
  }

  const handleSelect = (templateId: number) => {
    setTemplateToPay(templateId)
    setPaymentOpen(true)
  }

  const handlePaymentSuccess = () => {
    if (templateToPay) {
      // Store selected template
      localStorage.setItem('selectedTemplate', templateToPay.toString())
      // Redirect to pharmacy setup
      router.push(`/dashboard/pharmacy/setup?template=${templateToPay}`)
    }
  }

  // Don't render anything for hospital users (they'll be redirected)
  if (userType === 'hospital') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-gray">Redirecting to hospital setup...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-dark mb-2">Choose a Pharmacy Template</h1>
        <p className="text-neutral-gray">Select a template that matches your pharmacy's style</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden group cursor-pointer">
            <div className="h-64 relative overflow-hidden">
              <Image
                src={template.image}
                alt={`${template.name} template preview`}
                fill
                className="object-cover"
              />
              {template.hasAI && (
                <div className="absolute top-4 right-4 bg-ai text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium z-20">
                  <FiMessageSquare size={16} />
                  AI Included
                </div>
              )}
              {/* Hover overlay with features */}
              <div className="absolute inset-0 z-10 bg-neutral-dark/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col p-4">
                <h4 className="text-lg font-semibold mb-2">Template Features</h4>
                <ul className="space-y-1 text-sm overflow-y-auto">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FiCheck className="text-success" size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-neutral-dark">
                  {template.name}
                </h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${template.price}</p>
                  <p className="text-xs text-neutral-gray">one-time</p>
                </div>
              </div>
              <p className="text-neutral-gray mb-6">{template.description}</p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => handlePreview(template.id)}
                >
                  <FiEye className="mr-2" />
                  Preview
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => handleSelect(template.id)}
                >
                  Select & Pay
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={selectedTemplate ? templates[selectedTemplate - 1].name : ''}
        size="xl"
      >
        <div className="space-y-4">
          <div className="h-96 relative rounded-lg overflow-hidden">
            {selectedTemplate && (
              <Image
                src={templates[selectedTemplate - 1].image}
                alt={`${templates[selectedTemplate - 1].name} full preview`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            {selectedTemplate && (
              <Button
                variant="primary"
                onClick={() => {
                  setPreviewOpen(false)
                  handleSelect(selectedTemplate)
                }}
              >
                Select This Template
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {templateToPay && (
        <PaymentModal
          isOpen={paymentOpen}
          onClose={() => {
            setPaymentOpen(false)
            setTemplateToPay(null)
          }}
          amount={templates.find(t => t.id === templateToPay)?.price || 0}
          description={`Payment for ${templates.find(t => t.id === templateToPay)?.name} template`}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
