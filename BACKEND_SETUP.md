# Backend Setup Guide

This project now uses a custom backend server for handling contact form submissions. No third-party services are required.

## Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your email configuration. See `server/README.md` for detailed instructions.

**Quick Gmail Setup:**
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to `server/.env`:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   FROM_EMAIL=your-email@gmail.com
   TO_EMAIL=praneelshah.india@gmail.com
   PORT=3001
   ```

### 3. Start the Backend Server

```bash
# From root directory
npm run server

# Or for development with auto-reload
npm run server:dev
```

The server will run on `http://localhost:3001`

### 4. Configure Frontend

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

### 5. Start Frontend

```bash
npm run dev
```

## Production Deployment

1. Deploy the backend server (Vercel, Railway, Render, etc.)
2. Set environment variables on your hosting platform
3. Update `VITE_API_URL` in frontend `.env` to your deployed backend URL
4. Deploy the frontend

## Email Configuration Options

### Option 1: Gmail (Easiest)
- Use Gmail with App Password
- Free, reliable, no ads

### Option 2: Custom SMTP
- Use any SMTP server (SendGrid, Mailgun, your own server, etc.)
- More flexible but requires SMTP credentials

See `server/README.md` for detailed configuration instructions.






