'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from 'react-icons/fi'

type ChatMessage = {
  id: number
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  pharmacyName?: string
  pharmacyPhone?: string
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ pharmacyName = 'Modern Pharmacy', pharmacyPhone = '+1 (555) 123-4567' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm here to help you with medication questions, prescription refills, and pharmacy services at ${pharmacyName}. How can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isTyping) return

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let aiContent = ''
      const lowerMessage = message.toLowerCase()

      // Medication information
      if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
        aiContent = 'I can provide general information about medications, including common uses and side effects. For specific medical advice, please consult with our pharmacist or your doctor. What medication would you like to know about?'
      }
      // Prescription refills
      else if (lowerMessage.includes('refill') || lowerMessage.includes('prescription')) {
        aiContent = `I can help you with prescription refills! Please provide your prescription number or the medication name, and I can check the status. You can also call us directly at ${pharmacyPhone} for faster service.`
      }
      // Side effects
      else if (lowerMessage.includes('side effect') || lowerMessage.includes('interaction')) {
        aiContent = 'For medication side effects and drug interactions, I recommend speaking directly with our pharmacist for personalized advice. They can review your complete medication list for safety. Would you like our phone number?'
      }
      // Hours
      else if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('when')) {
        aiContent = 'Our pharmacy hours are Monday-Friday 9AM-8PM, Saturday 9AM-6PM, and Sunday 10AM-4PM. We also offer 24/7 prescription refill requests online!'
      }
      // Location/Address
      else if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
        aiContent = `You can find us at our main location. For the exact address, please call us at ${pharmacyPhone} or check our contact page. We also offer delivery services!`
      }
      // Delivery
      else if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver') || lowerMessage.includes('ship')) {
        aiContent = 'Yes! We offer home delivery services. You can place an order through our website or call us. Delivery is available for most medications and products. Is there something specific you\'d like delivered?'
      }
      // Price/Cost
      else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        aiContent = 'Pricing varies by medication and insurance coverage. For accurate pricing, please call us at ' + pharmacyPhone + ' with your prescription details, or visit our medications page to see product prices.'
      }
      // General greeting
      else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        aiContent = 'Hello! How can I help you today? I can assist with medication questions, prescription refills, store hours, delivery, and more!'
      }
      // Default response
      else {
        aiContent = 'Thank you for your question! I can help with medication information, prescription refills, store hours, delivery services, and general pharmacy questions. For specific medical advice, please consult with our pharmacist. How else can I assist you?'
      }

      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: aiContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 500) // Simulate thinking time
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true)
          setIsMinimized(false)
        }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 group"
        aria-label="Open AI Chatbot"
      >
        <FiMessageSquare size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white animate-pulse"></span>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-neutral-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-neutral-border z-50 flex flex-col transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <FiMessageSquare size={20} />
          </div>
          <div>
            <div className="font-semibold">{pharmacyName} Assistant</div>
            <div className="text-xs text-white/80">AI-powered support</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label={isMinimized ? 'Expand' : 'Minimize'}
          >
            <FiMinimize2 size={18} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-light/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-br from-primary to-primary-dark text-white'
                      : 'bg-white border border-neutral-border text-neutral-dark shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-white/70' : 'text-neutral-gray'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-border rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neutral-gray rounded-full animate-bounce [animation-delay:0ms]"></div>
                    <div className="w-2 h-2 bg-neutral-gray rounded-full animate-bounce [animation-delay:150ms]"></div>
                    <div className="w-2 h-2 bg-neutral-gray rounded-full animate-bounce [animation-delay:300ms]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-neutral-border bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about medications, refills, hours..."
                className="flex-1 px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FiSend size={18} />
              </button>
            </div>
            <p className="text-xs text-neutral-gray mt-2 text-center">
              AI Assistant • For medical emergencies, call 911
            </p>
          </form>
        </>
      )}
    </div>
  )
}
