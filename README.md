# Medify - Medical Website Builder

A modern, professional SaaS platform for building medical websites for Hospitals and Pharmacies. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Overview

Medify is a frontend application that enables medical facilities to create professional websites through an intuitive interface. The platform offers two distinct workflows:

- **🏥 Hospital Websites** - Feature-based website creation with customizable modules
- **💊 Pharmacy Websites** - Template-based website creation with pre-designed layouts
- **🤖 AI Assistant** - Intelligent content generation and website management

## Project Structure

```
.
└── frontend/          # Next.js 16 application
    ├── app/          # Next.js app directory (App Router)
    ├── components/   # Reusable React components
    ├── public/       # Static assets
    └── package.json  # Dependencies
```

## Features

- **Landing Page** - Marketing page with features, pricing, and testimonials
- **User Authentication** - Login and signup pages
- **Dashboard** - Comprehensive dashboard with setup progress tracking
- **Hospital Setup** - Feature selection and configuration for hospitals
- **Pharmacy Setup** - Template selection and customization for pharmacies
- **Business Info Forms** - Collect and manage business information
- **AI Assistant** - Chat interface for website management assistance
- **Settings** - Account and website configuration
- **Payment Integration** - Payment modal for Visa and Fawry (UI ready)
- **Responsive Design** - Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.5+
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Architecture**: Component-based, reusable UI components

## Getting Started

### Prerequisites

- Node.js 20.9.0 or later
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
cd frontend
npm run build
npm start
```

## Project Status

This is a **frontend-only** implementation. The application uses:
- LocalStorage for data persistence (mock data)
- Placeholder/mock data throughout
- UI components ready for backend API integration
- Form validation structure (ready for implementation)

## Documentation

For detailed documentation about the frontend application, including:
- Complete feature list
- Component documentation
- Page structure
- Color palette
- Development guidelines

See [frontend/README.md](./frontend/README.md)

## License

This project is part of a frontend development task.

