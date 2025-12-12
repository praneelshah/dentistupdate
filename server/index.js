import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// Ensure we load the .env that lives alongside this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 10 } });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create transporter for sending emails
const createTransporter = () => {
  // If SMTP credentials are provided, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Otherwise, use Gmail with OAuth2 or App Password
  // For Gmail, you need to use an App Password (not regular password)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
  console.error('[email-config] Missing credentials. Loaded values: ', {
    hasSmtpHost: Boolean(process.env.SMTP_HOST),
    hasSmtpUser: Boolean(process.env.SMTP_USER),
    hasSmtpPass: Boolean(process.env.SMTP_PASS),
    hasGmailUser: Boolean(process.env.GMAIL_USER),
    gmailAppPasswordLength: process.env.GMAIL_APP_PASSWORD?.length || 0,
  });
  throw new Error('Email configuration not found. Please set up SMTP or Gmail credentials.');
};

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email, and phone are required.',
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || 'praneelshah.india@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
New contact form submission received:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message || 'No message provided'}

---
Submitted on: ${new Date().toLocaleString()}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${message ? `<p><strong>Message:</strong></p><p style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email. Please try again later.',
    });
  }
});

// Virtual consultation submission with attachments
app.post('/api/virtual-consult', upload.array('photos', 10), async (req, res) => {
  try {
    const { name, email, phone, message, consent } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and phone are required.',
      });
    }

    const transporter = createTransporter();

    const attachments = (req.files || []).map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER,
      to: process.env.VIRTUAL_TO_EMAIL || process.env.TO_EMAIL || 'praneelshah.india@gmail.com',
      replyTo: email,
      subject: `New Virtual Consultation Request from ${name}`,
      text: `
New virtual consultation request received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Consent: ${consent || 'Not specified'}

Message:
${message || 'No message provided'}

Attachments: ${attachments.length}

Submitted on: ${new Date().toLocaleString()}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Virtual Consultation Request
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Consent:</strong> ${consent || 'Not specified'}</p>
            ${message ? `<p><strong>Message:</strong></p><p style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>` : ''}
            <p><strong>Attachments:</strong> ${attachments.length}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Virtual consultation email sent successfully',
    });
  } catch (error) {
    console.error('Error sending virtual consultation email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send virtual consultation. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Contact form endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`Virtual consult endpoint: http://localhost:${PORT}/api/virtual-consult`);
});




