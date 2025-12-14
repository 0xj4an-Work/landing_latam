# Database Setup for Hackathon Registration

This project uses Prisma with PostgreSQL to store hackathon registrations.

## Local Development

### Start the Database

```bash
npx prisma dev
```

This starts a local PostgreSQL server on ports 51213-51215. Keep this running while developing.

### Run Migrations

```bash
npx prisma migrate dev
```

This applies any pending migrations to your database.

### Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client based on your schema. Run this after any schema changes.

## Database Schema

The `BuildathonRegistration` model stores:
- `id` - Unique identifier (auto-generated)
- `createdAt` - Registration timestamp (auto-generated)
- `updatedAt` - Last update timestamp (auto-updated)
- `teamName` - Team name (required)
- `teamMembers` - Team members list (required)
- `githubRepo` - GitHub repository URL (optional)
- `karmaGapLink` - Karma Gap project link (optional)
- `userAgent` - Browser user agent (auto-captured)

## API Endpoints

### POST /api/buildathon/register
Register a new team for the hackathon.

**Request body:**
```json
{
  "teamName": "My Team",
  "teamMembers": "John Doe, Jane Smith",
  "githubRepo": "https://github.com/user/repo",
  "karmaGapLink": "https://karmagap.com/project"
}
```

### GET /api/buildathon/registrations
View all registrations (ordered by newest first).

**Response:**
```json
{
  "count": 5,
  "registrations": [...]
}
```

## Production Deployment

### Environment Variables

Set the `DATABASE_URL` environment variable to your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Deploy Migrations

Before deploying, run:

```bash
npx prisma migrate deploy
```

This applies all migrations to your production database.

## Viewing Data

### Using Prisma Studio

```bash
npx prisma studio
```

This opens a web interface to view and edit your database data at http://localhost:5555

### Using SQL

You can connect to the database using any PostgreSQL client with the connection string from `.env`.

## Common Commands

- `npx prisma migrate dev --name <name>` - Create a new migration
- `npx prisma db push` - Push schema changes without creating a migration (dev only)
- `npx prisma db pull` - Pull schema from existing database
- `npx prisma migrate reset` - Reset database and re-run all migrations
