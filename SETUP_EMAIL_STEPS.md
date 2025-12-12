# Step-by-Step Email Setup Guide

## Step 1: Create Backend .env File

1. Open your file explorer and navigate to: `D:\replica-clinic-site-77178-2f8c81dd-main\server`

2. Create a new file named `.env` (just `.env` with no extension)

3. Open the `.env` file in a text editor (Notepad, VS Code, etc.)

## Step 2: Get Gmail App Password (Recommended Method)

### If you want to use Gmail:

1. Go to https://myaccount.google.com/
2. Click on **Security** in the left menu
3. Under "How you sign in to Google", find **2-Step Verification**
   - If it's OFF, click it and enable it (you'll need your phone)
4. After 2-Step Verification is enabled, go back to Security
5. Scroll down and click **App passwords** (or go to https://myaccount.google.com/apppasswords)
6. Select "Mail" as the app and "Other" as the device
7. Type "Contact Form Server" as the name
8. Click **Generate**
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Configure Backend .env File

Add this content to your `server/.env` file (replace with your actual Gmail and app password):

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=praneelshah.india@gmail.com
VIRTUAL_TO_EMAIL=praneelshah.india@gmail.com
PORT=3001
```

**Important:** 
- Replace `your-email@gmail.com` with YOUR Gmail address
- Replace `your-16-character-app-password` with the app password you generated (remove spaces)
- Keep `praneelshah.india@gmail.com` as the recipient email

**Example:**
```env
GMAIL_USER=john.doe@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
FROM_EMAIL=john.doe@gmail.com
TO_EMAIL=praneelshah.india@gmail.com
VIRTUAL_TO_EMAIL=praneelshah.india@gmail.com
PORT=3001
```

## Step 4: Create Frontend .env File

1. Navigate to: `D:\replica-clinic-site-77178-2f8c81dd-main` (root folder)

2. Create a new file named `.env` (just `.env` with no extension)

3. Add this content:

```env
VITE_API_URL=http://localhost:3001
```

## Step 5: Install Backend Dependencies (if not done)

Open PowerShell or Command Prompt and run:

```bash
cd D:\replica-clinic-site-77178-2f8c81dd-main\server
npm install
```

This installs `multer` which is needed for file uploads.

## Step 6: Start the Backend Server

From the root folder, run:

```bash
cd D:\replica-clinic-site-77178-2f8c81dd-main
npm run server
```

You should see:
```
Server is running on port 3001
Contact form endpoint: http://localhost:3001/api/contact
Virtual consult endpoint: http://localhost:3001/api/virtual-consult
```

**Keep this terminal window open!** The server needs to keep running.

## Step 7: Start the Frontend (in a NEW terminal)

Open a NEW PowerShell/Command Prompt window and run:

```bash
cd D:\replica-clinic-site-77178-2f8c81dd-main
npm run dev
```

Wait for it to start. You'll see something like:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Step 8: Test the Forms

1. Open your browser and go to: `http://localhost:5173`

2. **Test Contact Form:**
   - Go to the Contact page
   - Fill out the form (First Name, Last Name, Email, Phone, Message)
   - Click "Send Message"
   - Check `praneelshah.india@gmail.com` inbox for the email

3. **Test Virtual Consultation Form:**
   - Go to the Virtual Consultation page
   - Fill out the form (Name, Email, Phone, Message)
   - Upload some photos (optional but recommended to test)
   - Check the "I agree to terms" checkbox
   - Click "Submit Virtual Consultation Request"
   - Check `praneelshah.india@gmail.com` inbox for the email with attachments

## Troubleshooting

### If emails don't arrive:

1. **Check the backend terminal** - Look for error messages
2. **Verify .env files** - Make sure both `.env` files are in the correct locations
3. **Check Gmail App Password** - Make sure you copied it correctly (no spaces)
4. **Check 2-Step Verification** - Must be enabled for App Passwords to work
5. **Check spam folder** - Emails might go to spam initially

### Common Errors:

- **"Email configuration not found"** → Your `server/.env` file is missing or incomplete
- **"Authentication failed"** → Your Gmail App Password is incorrect
- **"Failed to send request"** → Backend server might not be running

### Need Help?

Check the server terminal window for detailed error messages. They will tell you exactly what's wrong.


