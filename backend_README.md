# DreamScape Reality - Backend Setup

## Overview
Backend server for DreamScape Reality VR property tours platform with database management for user queries, demo bookings, and property inquiries.

## Features
- Contact form submissions
- VR demo bookings
- Property inquiries
- Newsletter subscriptions
- Admin dashboard for managing queries
- Email notifications
- SQLite database for data persistence

## Installation

1. **Install Node.js** (version 14 or higher)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Update email credentials and other configurations

4. **Database Setup:**
   - SQLite database will be automatically created on first run
   - Database file: `dreamscape.db`

## Running the Application

### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Contact & Bookings
- `POST /api/contact` - Submit contact form
- `POST /api/demo-booking` - Book VR demo
- `POST /api/property-inquiry` - Property specific inquiry
- `POST /api/newsletter` - Newsletter subscription

### Properties
- `GET /api/properties` - Get all properties

### Admin (Basic Auth Required)
- `GET /api/admin/contacts` - View all contact queries
- `GET /api/admin/bookings` - View all demo bookings
- `GET /api/admin/inquiries` - View all property inquiries
- `PUT /api/admin/update-status/:table/:id` - Update query status

## Database Schema

### Tables:
1. **contact_queries** - General contact form submissions
2. **demo_bookings** - VR demo booking requests
3. **property_inquiries** - Property-specific inquiries
4. **newsletter_subscriptions** - Email newsletter subscriptions

## Email Configuration

The system uses Nodemailer for sending emails. Configure your SMTP settings in `.env`:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in EMAIL_PASSWORD

## File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
├── dreamscape.db     # SQLite database (auto-created)
├── public/           # Static files (frontend)
└── README.md         # This file
```

## Security Features
- Helmet.js for security headers
- CORS protection
- Input validation
- SQL injection prevention
- Environment variable protection

## Production Deployment

1. Set `NODE_ENV=production` in .env
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name dreamscape-backend
   ```

3. Set up reverse proxy with Nginx
4. Configure SSL certificate
5. Set up regular database backups

## Support
For technical support, contact: tech@dreamscapereality.in
