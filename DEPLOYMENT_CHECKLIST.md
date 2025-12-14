# Railway Deployment Checklist

Use this checklist when deploying to Railway.

## Pre-Deployment

- [ ] All code committed and pushed to GitHub
- [ ] `.env` is in `.gitignore` (already configured)
- [ ] Database schema is finalized in `prisma/schema.prisma`
- [ ] Local testing completed (`npm run dev` works)

## Railway Setup

- [ ] Railway account created and linked to GitHub
- [ ] New project created from GitHub repo
- [ ] PostgreSQL database added to project
- [ ] `DATABASE_URL` environment variable auto-configured

## First Deployment

- [ ] Initial deployment triggered (automatic on push)
- [ ] Deployment successful (check Railway logs)
- [ ] Database migrations run: `railway run npx prisma migrate deploy`
- [ ] Application URL is accessible

## Testing

- [ ] Visit your Railway URL
- [ ] Test registration form submission
- [ ] Verify data saved: `https://your-app.railway.app/api/buildathon/registrations`
- [ ] Check PostgreSQL database in Railway dashboard

## Optional Configuration

- [ ] Custom domain configured (if needed)
- [ ] GitHub token added for API rate limits: `GITHUB_TOKEN`
- [ ] Monitoring/alerts set up in Railway
- [ ] Database backups configured (Railway automatic backups enabled)

## Post-Deployment

- [ ] Share registration URL with participants
- [ ] Monitor registrations regularly
- [ ] Test form validation (required fields, URL formats)
- [ ] Verify GitHub repo validation works

## Maintenance Commands

When you update the database schema:
```bash
# 1. Create migration locally
npm run db:migrate

# 2. Commit and push migration files
git add prisma/migrations
git commit -m "Add database migration"
git push

# 3. Deploy migration to Railway
railway run npx prisma migrate deploy
```

## Troubleshooting

If deployment fails:
- [ ] Check Railway deployment logs
- [ ] Verify `DATABASE_URL` is set
- [ ] Ensure migrations are committed to git
- [ ] Try manual migration: `railway run npx prisma migrate deploy`

## Monitoring Registrations

Option 1 - API Endpoint:
```
https://your-app.railway.app/api/buildathon/registrations
```

Option 2 - Prisma Studio (local):
```bash
railway run npx prisma studio
```

Option 3 - Railway Dashboard:
Go to PostgreSQL service → Data tab → `buildathon_registrations` table

---

## Quick Commands Reference

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link project
railway login
railway link

# Run migrations
railway run npx prisma migrate deploy

# View logs
railway logs

# Open Prisma Studio connected to production DB
railway run npx prisma studio
```
