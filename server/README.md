# Contact Form Backend Server

This is a custom backend server for handling contact form submissions and sending emails directly without third-party services.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your email settings. You have two options:

#### Option 1: Gmail with App Password (Recommended)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate an App Password for "Mail"
5. Use your Gmail address and the generated App Password:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=praneelshah.india@gmail.com
PORT=3001
```

#### Option 2: Custom SMTP Server

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
FROM_EMAIL=your-email@example.com
TO_EMAIL=praneelshah.india@gmail.com
PORT=3001
```

### 3. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

### 4. Configure Frontend

In your frontend `.env` file (root directory), add:

```env
VITE_API_URL=http://localhost:3001
```

For production, update this to your deployed backend URL.

## API Endpoints

### POST `/api/contact`

Submit contact form data.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Production Deployment

### Deploy to Vercel/Netlify/Railway

1. Set environment variables in your hosting platform
2. Update `VITE_API_URL` in frontend to point to your deployed backend
3. Deploy both frontend and backend

### Using PM2 (for VPS/Server)

```bash
npm install -g pm2
cd server
pm2 start index.js --name contact-form-backend
pm2 save
pm2 startup
```

## Troubleshooting

- **Email not sending**: Check your SMTP/Gmail credentials
- **CORS errors**: Ensure CORS is enabled (already configured)
- **Port already in use**: Change `PORT` in `.env` file
- **Gmail App Password not working**: Make sure 2-Step Verification is enabled

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Consider adding rate limiting for production
- Add input validation and sanitization as needed






