# Railway Deployment Guide

This guide explains how to deploy your hackathon landing page with PostgreSQL database to Railway.

## Architecture

Your Next.js app contains both:
- **Frontend**: React components and pages
- **Backend**: API routes at `/api/buildathon/*`

No separate backend directory is needed - Railway will deploy everything as one service.

## Deployment Steps

### 1. Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `landing_latam` repository
4. Railway will automatically detect it's a Next.js app

### 3. Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable

### 4. Configure Environment Variables
Railway should automatically set `DATABASE_URL`, but verify it exists:
1. Go to your service → "Variables" tab
2. Ensure `DATABASE_URL` is present (it should be auto-added when you create the PostgreSQL service)
3. Add any other environment variables you need (optional):
   - `GITHUB_TOKEN` - For GitHub API rate limits (optional)
   - `NODE_ENV=production`

### 5. Run Database Migrations
After your first deployment:

**Option A: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migration
railway run npx prisma migrate deploy
```

**Option B: Using Railway Dashboard**
1. Go to your service → "Settings" → "Deploy"
2. Add a custom build command:
   ```
   npm run build && npx prisma migrate deploy
   ```

### 6. Deploy
1. Push your code to GitHub
2. Railway will automatically deploy
3. Your app will be available at the Railway-provided URL

## Important Notes

### Database Connection
- Railway automatically provides `DATABASE_URL` when you add PostgreSQL
- The Prisma client will use this to connect to your database
- No additional configuration needed!

### Prisma in Production
Your `package.json` already has:
```json
"build": "prisma generate && next build"
```

This ensures Prisma Client is generated during deployment.

### Migrations
- Always run `npx prisma migrate deploy` after schema changes
- Use Railway CLI or add to build command
- Never use `prisma migrate dev` in production

### Custom Domain (Optional)
1. Go to your service → "Settings" → "Networking"
2. Click "Generate Domain" for a Railway subdomain
3. Or add your custom domain

## Monitoring Registrations

### Via Prisma Studio (Local)
```bash
# Connect to production database
railway run npx prisma studio
```

### Via API Endpoint
Visit: `https://your-app.railway.app/api/buildathon/registrations`

### Via Railway Database Tab
1. Go to your PostgreSQL service
2. Click "Data" tab
3. Browse the `buildathon_registrations` table

## Troubleshooting

### Build Fails
- Check Railway logs in the "Deployments" tab
- Ensure `DATABASE_URL` is set
- Verify Node.js version compatibility

### Database Connection Issues
```bash
# Test connection locally with production DB
railway run npx prisma studio
```

### Migration Issues
```bash
# Reset and re-run migrations (CAREFUL - deletes data!)
railway run npx prisma migrate reset

# Or deploy migrations
railway run npx prisma migrate deploy
```

## Useful Railway CLI Commands

```bash
# View logs
railway logs

# Run commands in production environment
railway run <command>

# Open dashboard
railway open

# Check service status
railway status
```

## Cost
- Railway offers a free tier with $5/month credit
- PostgreSQL database is included
- Monitor usage in Railway dashboard

## Next Steps After Deployment
1. Test registration form on production URL
2. Set up custom domain (optional)
3. Monitor registrations via API endpoint
4. Add analytics if needed
