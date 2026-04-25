# Photo Gallery App

A photo gallery application built with Vue.js frontend and Cloudflare Pages Functions backend, using Cloudflare R2 for storage and D1 for database.

## Features

- User registration and login
- Secure photo uploads with storage limits (default 1GB free)
- Admin panel for user management (suspend users, adjust storage limits)
- Public gallery view
- Donation section
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Cloudflare resources:
   - Create a D1 database
   - Create an R2 bucket
   - Get your account ID and update `wrangler.toml`
4. Initialize the database: Run the SQL in `init-db.js` using Wrangler
5. Update `wrangler.toml` with your D1 ID, R2 bucket name, and R2 domain
6. For local development: `npm run dev`
7. For production: Build with `npm run build` and deploy to Cloudflare Pages

## Deployment

### Cloudflare Pages (Recommended)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)
- Functions will be automatically detected from the `/functions` directory

### Manual Deployment
For manual deployment to Cloudflare Pages:
```bash
npm run build
npm run deploy
```

Make sure your `wrangler.toml` has the correct D1 database ID, R2 bucket name, and R2 domain configured.

## Database Schema

The app uses Cloudflare D1 with the following tables:
- `users`: User accounts with roles and storage limits
- `photos`: Uploaded photos metadata

Run the initialization script to set up the database.

## Environment Variables

Configure the following in `wrangler.toml`:
- D1 database binding
- R2 bucket binding
- R2 domain for public URLs

## Admin Access

Default admin account:
- Username: admin
- Password: adminpass

Change the password after first login!
- Free up to 1GB storage per user

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

3. Login to Cloudflare:
   ```bash
   wrangler auth login
   ```

4. Create D1 database:
   ```bash
   wrangler d1 create gallery-db
   ```

5. Initialize database:
   ```bash
   node init-db.js > init-db.sql
   wrangler d1 execute gallery-db --file=init-db.sql
   ```

6. Create R2 bucket:
   ```bash
   wrangler r2 bucket create gallery-bucket
   ```

7. Update `wrangler.toml` with your database ID and bucket details.

8. Deploy:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

## Development

```bash
npm run dev
```

## API Endpoints

- `POST /api/register` - Register user
- `POST /api/login` - Login
- `POST /api/upload` - Upload photo
- `GET /api/photos` - Get all photos
- `DELETE /api/photos/:id` - Delete photo
- `GET /api/user` - Get user profile
- `GET /api/admin/users` - Admin: get users
- `POST /api/admin/users/:id/suspend` - Admin: suspend/unsuspend user
- `POST /api/admin/users/:id/limit` - Admin: update storage limit
