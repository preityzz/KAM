{
  "id": 3,
  "email": "admin@example.com",
  "password": "$2b$10$hashedPasswordHere",
  "role": "ADMIN",
  "createdAt": "2023-09-28T00:00:00.000Z",
  "updatedAt": "2023-09-28T00:00:00.000Z",
  "isVerified": true
}

<div align="center"><strong>Next.js Admin Dashboard Starter Template With Shadcn-ui</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-shadcn-dashboard-starter.vercel.app">View Demo</a>
<span>
</div>

## Overview

Cloud-based CRM solution built with Next.js 14, featuring:
- Lead Management & Tracking
- Call Planning System
- Performance Analytics
- Admin Dashboard

## Tech Stack
- Framework - [Next.js 14](https://nextjs.org/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Database ORM - [Prisma](https://www.prisma.io)
- Auth - [NextAuth.js](https://next-auth.js.org)
- UI Components - [Shadcn/ui](https://ui.shadcn.com)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Forms - [React Hook Form](https://react-hook-form.com)
- Validation - [Zod](https://zod.dev)
- Data Tables - [TanStack Table](https://tanstack.com/table)
- Charts - [Chart.js](https://www.chartjs.org)
- State Management - [TanStack Query](https://tanstack.com/query)
- Database Client - [Prisma Client](https://www.prisma.io/client)
- Schema Validations - [Zod](https://zod.dev)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Auth - [Auth.js](https://authjs.dev/)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

### Key Features:
- Lead Management Dashboard
- Call Planning & Tracking
- Restaurant Performance Analytics
- Sales Metrics Visualization
- Admin Role Management
- Responsive Design

## System Requirements

- Node.js 14 
- pnpm v8 
- Windows 10/11, macOS, or Linux
- Visual Studio Code (recommended)


## Installation Instructions
1.Create installation section
   # Install pnpm globally
    npm install -g pnpm

2.Setup Project
  # Clone repository
  git clone <repository-url>
  cd restaurant-crm

  # Install dependencies
  pnpm install

3.Environment Configuration
  # Create .env file
  copy .env.example .env

  # Update .env with your values
  DATABASE_URL="postgresql://..."
  NEXTAUTH_SECRET="your-secret"
  NEXTAUTH_URL="http://localhost:3000"

4.Database Setup
  # Generate Prisma client
  pnpm prisma generate

  # Push database schema
  pnpm prisma db push

  # Seed database (optional)
  pnpm prisma db seed


## Running Instructions
  1.For Frontend 
    pnpm run dev

  2.Manage database content
    pnpm prisma studio


You should now be able to access the application at http://localhost:3000.

## Test execution guide



## API documentation



## 

  


## Pages

| Pages | Specifications |
| :--- | :--- |
| [Login](/login) | Authentication with **NextAuth.js**, email/password login for admin access |
| [Dashboard](/dashboard/overview) | Main dashboard with performance metrics, charts, and daily calls overview |
| [Restaurants](/dashboard/restaurantLeads) | Restaurant lead management with TanStack table, filtering, and sorting |
| [Restaurants/new](/dashboard/restaurantLeads/new) | New restaurant lead form using shadcn form with react-hook-form + zod validation |
| [Call Plans](/dashboard/callPlans) | Call scheduling system with calendar view and status tracking |
| [Interactions](/dashboard/interactions) | Create new call plans with restaurant selection and scheduling |
| [Orders](dashboard/orders) | Detailed performance metrics, conversion rates, and sales analytics |
| [Not Found](/dashboard/notfound) | Custom 404 error page with navigation assistance |                                                                                                                               |

## Getting Started

Follow these steps to clone the repository and start the development server:

> [!NOTE]  
> If you want to use the starter with  **Next 15** with **React 19**, follow these steps:
> - Clone only the `next-15` branch:
>   ```bash
>   git clone --branch next-15 --single-branch https://github.com/Kiranism/next-shadcn-dashboard-starter.git

- Clone the repo:
```bash 
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git 
```

- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000.

> [!WARNING]  
> After cloning or forking the repository, be cautious when pulling or syncing with the latest changes, as this may result in breaking conflicts.

Cheers! 🥂
