import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Medify - Build Your Medical Website in Minutes',
  description: 'Medical website builder for Hospitals, Clinics, and Pharmacies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

