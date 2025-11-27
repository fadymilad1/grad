'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { FiCreditCard, FiCheck } from 'react-icons/fi'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  description: string
  onPaymentSuccess: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'visa' | 'fawry' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (method: 'visa' | 'fawry') => {
    setIsProcessing(true)
    setSelectedMethod(method)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess()
      onClose()
    }, 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Payment" size="md">
      <div className="space-y-6">
        <div className="bg-neutral-light rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-neutral-gray">Total Amount</span>
            <span className="text-2xl font-bold text-neutral-dark">${amount.toFixed(2)}</span>
          </div>
          <p className="text-sm text-neutral-gray">{description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-dark mb-4">Select Payment Method</h3>
          <div className="space-y-3">
            <button
              onClick={() => handlePayment('visa')}
              disabled={isProcessing}
              className="w-full p-4 border-2 border-neutral-border rounded-lg hover:border-primary transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <FiCreditCard className="text-primary" size={24} />
                <div className="text-left">
                  <p className="font-semibold text-neutral-dark">Visa / Mastercard</p>
                  <p className="text-sm text-neutral-gray">Pay with credit or debit card</p>
                </div>
              </div>
              {selectedMethod === 'visa' && isProcessing && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              )}
            </button>

            <button
              onClick={() => handlePayment('fawry')}
              disabled={isProcessing}
              className="w-full p-4 border-2 border-neutral-border rounded-lg hover:border-primary transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-neutral-dark">Fawry</p>
                  <p className="text-sm text-neutral-gray">Pay at Fawry outlets or online</p>
                </div>
              </div>
              {selectedMethod === 'fawry' && isProcessing && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1" disabled={isProcessing}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

