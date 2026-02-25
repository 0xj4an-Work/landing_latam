# LATAM Buildathon Landing Page

Landing page and registration system for the LATAM Buildathon hackathon.

## Features

- Team registration with member details and country selection
- Project submission with track selection (Open Track, MiniApps, Human.Tech, v0)
- LATAM eligibility validation (>50% team members from Latin America)
- Admin dashboard with:
  - Team and submission management
  - Filters by submission status and country
  - CSV export with configurable fields
  - Country statistics

## Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS (v4, CSS-first)
- **UI primitives**: Radix UI
- **Dark mode**: `next-themes` (class-based)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
DATABASE_URL="your-postgres-connection-string"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
ADMIN_SESSION_SECRET="your-random-secret-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Database Setup

For local development setup, see [DATABASE_SETUP.md](DATABASE_SETUP.md).

For Railway deployment, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md).

## Admin Dashboard

Access the admin dashboard at `/admin` (requires authentication).

Features:
- View all registered teams and their members
- Filter teams by submission status (submitted/not submitted)
- Filter teams by country
- Export data to CSV with selectable fields
- Delete teams and submissions
- View country statistics

## Deployment

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for production deployment steps.
