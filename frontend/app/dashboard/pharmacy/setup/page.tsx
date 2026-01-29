'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FiPackage, FiPlus, FiTrash2 } from 'react-icons/fi'

interface Product {
  name: string
  category: string
  description: string
  price: string
  inStock: boolean
}

export default function PharmacySetupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'hospital' | 'pharmacy'>('pharmacy')
  const [formData, setFormData] = useState({
    // Contact Information
    phone: '',
    email: '',
    address: '',
    
    // Products
    products: [
      {
        name: '',
        category: '',
        description: '',
        price: '',
        inStock: true,
      } as Product,
    ],
  })

  // Check user type and redirect hospital users
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      const businessType = user.businessType || user.business_type || 'hospital'
      setUserType(businessType)
      
      // Redirect hospital users to hospital setup
      if (businessType === 'hospital') {
        router.push('/dashboard/hospital/setup')
        return
      }
    }
  }, [router])

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | boolean
  ) => {
    const newProducts = [...formData.products]
    newProducts[index] = { ...newProducts[index], [field]: value }
    setFormData({ ...formData, products: newProducts })
  }

  const addProduct = () => {
    const newProducts = [...formData.products, {
      name: '',
      category: '',
      description: '',
      price: '',
      inStock: true,
    }]
    setFormData({ ...formData, products: newProducts })
  }

  const removeProduct = (index: number) => {
    const newProducts = formData.products.filter((_, i) => i !== index)
    setFormData({ ...formData, products: newProducts })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store pharmacy setup data
    localStorage.setItem('pharmacySetup', JSON.stringify(formData))
    // Redirect to business info
    router.push('/dashboard/business-info?type=pharmacy')
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
        <h1 className="text-3xl font-bold text-neutral-dark mb-2">Pharmacy Setup</h1>
        <p className="text-neutral-gray">Configure your pharmacy information and products</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-neutral-dark mb-6">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                placeholder="contact@pharmacy.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="col-span-2">
                <Textarea
                  label="Address"
                  placeholder="123 Main Street, City, State, ZIP"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Products & Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-neutral-dark">Products & Information</h2>
                <p className="text-sm text-neutral-gray">
                  Add key products and services that will be featured on your pharmacy website.
                </p>
              </div>
              <Button type="button" variant="secondary" onClick={addProduct}>
                <FiPlus className="mr-2" />
                Add Product
              </Button>
            </div>
            <div className="space-y-6">
              {formData.products.map((product, index) => (
                <div key={index} className="border border-neutral-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <FiPackage className="text-primary" />
                      <span className="font-medium text-neutral-dark">Product {index + 1}</span>
                    </div>
                    {formData.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="p-2 text-error hover:bg-neutral-light rounded-lg transition-colors"
                        aria-label="Remove product"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        Product Name {!product.name && <span className="text-error text-xs">*</span>}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ibuprofen 200mg"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        Category {!product.category && <span className="text-error text-xs">*</span>}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pain Relief, Vitamins, Prescription"
                        value={product.category}
                        onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        Price {!product.price && <span className="text-error text-xs">*</span>}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $9.99"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor={`product-availability-${index}`} className="block text-sm font-medium text-neutral-dark mb-2">
                        Availability
                      </label>
                      <select
                        id={`product-availability-${index}`}
                        value={product.inStock ? 'in-stock' : 'out-of-stock'}
                        onChange={(e) => handleProductChange(index, 'inStock', e.target.value === 'in-stock')}
                        className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-label="Product availability status"
                      >
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Brief description of the product..."
                      value={product.description}
                      onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="secondary" type="button">
              Save Draft
            </Button>
            <Button variant="primary" type="submit">
              Continue to Business Info
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
