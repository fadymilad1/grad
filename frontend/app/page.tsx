'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FiCheck, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function LandingPage() {
  const [currentTemplate, setCurrentTemplate] = useState(0)

  const templates = [
    {
      name: 'Modern Pharmacy',
      description: 'Clean and modern design perfect for modern pharmacies',
      image: '/modern pharmcy.jpg',
    },
    {
      name: 'Classic Pharmacy',
      description: 'Traditional design with professional look',
      image: '/classic pharmcy.jpg',
    },
    {
      name: 'Minimal Pharmacy',
      description: 'Minimalist design focusing on products',
      image: '/Minimal Pharmacy.jpeg',
    },
  ]

  const steps = [
    { 
      number: 1, 
      title: 'Choose Type', 
      description: 'Select Hospital or Pharmacy',
      hospital: 'Select Hospital',
      pharmacy: 'Select Pharmacy',
    },
    { 
      number: 2, 
      title: 'Select Features / Template', 
      description: 'Choose features (Hospital) or pick a template (Pharmacy)',
      hospital: 'Select features with pricing',
      pharmacy: 'Choose template & pay',
    },
    { 
      number: 3, 
      title: 'Payment', 
      description: 'Pay via Visa or Fawry',
      hospital: 'Pay for selected features',
      pharmacy: 'Pay for template',
    },
    { 
      number: 4, 
      title: 'Enter Info & Publish', 
      description: 'Add business info and go live',
      hospital: 'Fill business info & publish',
      pharmacy: 'Fill business info & publish',
    },
  ]

  const pricingPlans = [
    {
      name: 'Hospital Websites',
      price: 'From $39',
      period: 'one-time per feature',
      features: [
        'Pay once for each feature you enable',
        'AI Chatbot: $29/month subscription',
        'Review System: $49 one-time',
        'Ambulance Ordering: $79 one-time',
      ],
    },
    {
      name: 'Pharmacy Templates',
      price: '$149 - $299',
      period: 'one-time',
      features: [
        'Minimal Pharmacy template: $149',
        'Classic Pharmacy template: $199',
        'Modern Pharmacy + AI template: $299',
        'AI chatbot included with Modern Pharmacy template',
      ],
      popular: true,
    },
    {
      name: 'Add-ons & Extras',
      price: 'From $39',
      period: 'one-time',
      features: [
        'Prescription Refill module: $39 one-time',
        'AI Chatbot: $29/month subscription',
        'Review System: $49 one-time',
        'Extend your website later with more features anytime',
      ],
    },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      company: 'City Hospital',
      content: 'Medify helped us launch our website in just one day. The process was incredibly smooth.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Pharmacy Owner',
      company: 'HealthPlus Pharmacy',
      content: 'The templates are beautiful and the AI assistant is a game-changer for managing our online presence.',
      rating: 5,
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Clinic Director',
      company: 'Family Care Clinic',
      content: 'Best investment we made. Our patient bookings increased by 40% after launching our Medify website.',
      rating: 5,
    },
    {
      name: 'Dr. Ahmed Hassan',
      role: 'Hospital Director',
      company: 'Nile Medical Center',
      content: 'We created a professional hospital website without any technical team. The interface is very easy and clear.',
      rating: 5,
    },
    {
      name: 'Sara Youssef',
      role: 'Pharmacy Manager',
      company: 'CarePlus Pharmacy',
      content: 'Online orders and prescription refills became much easier for our patients after using Medify templates.',
      rating: 5,
    },
    {
      name: 'Dr. Omar Ali',
      role: 'Clinic Owner',
      company: 'Downtown Medical Clinic',
      content: 'The booking system and AI assistant helped us reduce phone calls and increase online appointments.',
      rating: 5,
    },
    {
      name: 'Dr. Lina Mansour',
      role: 'Pediatric Specialist',
      company: 'Family Health Hospital',
      content: 'Parents love how easy it is to find information about our doctors and book visits online.',
      rating: 5,
    },
    {
      name: 'Youssef Kamal',
      role: 'IT Manager',
      company: 'GreenLife Pharmacy Group',
      content: 'We manage multiple pharmacy websites from one place now. Medify saved us a lot of time and cost.',
      rating: 5,
    },
    {
      name: 'Dr. Mariam El-Shenawy',
      role: 'Dermatology Consultant',
      company: 'Glow Skin Clinic',
      content: 'The clean design and SEO-friendly structure helped new patients discover our clinic faster.',
      rating: 5,
    },
  ]

  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const visibleTestimonials = testimonials.length
    ? [
        testimonials[testimonialIndex],
        testimonials[(testimonialIndex + 1) % testimonials.length],
        testimonials[(testimonialIndex + 2) % testimonials.length],
      ]
    : []

  const handleNextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % templates.length)
  }

  const handlePrevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-neutral-gray hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-neutral-dark mb-6">
            Build Your Medical Website in Minutes
          </h1>
          <p className="text-xl text-neutral-gray mb-10 max-w-2xl">
            Create professional websites for hospitals and pharmacies with our easy-to-use platform.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/signup?type=hospital">
              <Button variant="primary" className="text-lg px-8 py-4">
                Create Hospital Website
              </Button>
            </Link>
            <Link href="/signup?type=pharmacy">
              <Button variant="secondary" className="text-lg px-8 py-4">
                Create Pharmacy Website
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-80">
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/hero-hospital.jpg"
              alt="Hospital website preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-neutral-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-neutral-dark mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-2 gap-12 mb-12">
            {/* Hospital Flow */}
            <div>
              <h3 className="text-2xl font-semibold text-neutral-dark mb-6 text-center">
                Hospital
              </h3>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-dark mb-1">
                        {step.title}
                      </h4>
                      <p className="text-neutral-gray text-sm">{step.hospital}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pharmacy Flow */}
            <div>
              <h3 className="text-2xl font-semibold text-neutral-dark mb-6 text-center">
                Pharmacy
              </h3>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-dark mb-1">
                        {step.title}
                      </h4>
                      <p className="text-neutral-gray text-sm">{step.pharmacy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Templates (no horizontal scroll) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-neutral-dark mb-12">
            Pharmacy Templates
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-6">
            {templates.map((template, index) => (
              <Card
                key={index}
                className={`${index === currentTemplate ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setCurrentTemplate(index)}
              >
                <div className="h-64 bg-neutral-light rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-contain bg-neutral-light"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                    {template.name}
                  </h3>
                  <p className="text-neutral-gray">{template.description}</p>
                </div>
              </Card>
            ))}
          </div>
          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrevTemplate}
              className="p-2 rounded-full border border-neutral-border text-neutral-gray hover:text-primary hover:border-primary transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {templates.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentTemplate(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentTemplate ? 'bg-primary' : 'bg-neutral-border'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextTemplate}
              className="p-2 rounded-full border border-neutral-border text-neutral-gray hover:text-primary hover:border-primary transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* AI Assistant Feature */}
      <section className="bg-neutral-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-dark mb-6">
                AI-Powered Assistant
              </h2>
              <p className="text-lg text-neutral-gray mb-6">
                Get intelligent help with content creation, SEO optimization, and website management. Our AI assistant understands medical terminology and helps you create professional content.
              </p>
              <ul className="space-y-3">
                {['Content Generation', 'SEO Optimization', 'Appointment Management', 'Patient Communication'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <FiCheck className="text-success" size={20} />
                    <span className="text-neutral-dark">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="bg-neutral-light rounded-lg p-0 h-64 overflow-hidden relative">
                <Image
                  src="/chatbot.jpg"
                  alt="AI assistant chatbot helping build a medical website"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-neutral-dark mb-12">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-neutral-dark mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neutral-dark">
                    {plan.price}
                  </span>
                  <span className="text-neutral-gray"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <FiCheck className="text-success" size={20} />
                      <span className="text-neutral-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-neutral-dark mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card key={`${testimonial?.name}-${index}`} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...(testimonial?.rating ? Array(testimonial.rating) : [])].map((_, i) => (
                    <FiStar key={i} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-neutral-gray mb-6">{testimonial?.content}</p>
                <div>
                  <p className="font-semibold text-neutral-dark">
                    {testimonial?.name}
                  </p>
                  <p className="text-sm text-neutral-gray">
                    {testimonial?.role}, {testimonial?.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          {/* Testimonials carousel controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                setTestimonialIndex((prev) =>
                  testimonials.length ? (prev - 1 + testimonials.length) % testimonials.length : 0
                )
              }
              className="p-2 rounded-full border border-neutral-border text-neutral-gray hover:text-primary hover:border-primary transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === testimonialIndex ? 'bg-primary' : 'bg-neutral-border'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setTestimonialIndex((prev) =>
                  testimonials.length ? (prev + 1) % testimonials.length : 0
                )
              }
              className="p-2 rounded-full border border-neutral-border text-neutral-gray hover:text-primary hover:border-primary transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Medify</h3>
              <p className="text-neutral-gray">
                Building medical websites made simple.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-gray">
                <li>Features</li>
                <li>Pricing</li>
                <li>Templates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-gray">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-gray">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-gray pt-8 text-center text-neutral-gray">
            <p>&copy; 2024 Medify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

