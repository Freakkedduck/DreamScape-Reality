
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('dreamscape.db');

// Initialize database tables
db.serialize(() => {
    // Contact queries table
    db.run(`CREATE TABLE IF NOT EXISTS contact_queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        query_type TEXT DEFAULT 'general',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'new'
    )`);

    // Demo bookings table
    db.run(`CREATE TABLE IF NOT EXISTS demo_bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        preferred_date TEXT,
        preferred_time TEXT,
        property_interest TEXT,
        budget_range TEXT,
        city TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending'
    )`);

    // Property inquiries table
    db.run(`CREATE TABLE IF NOT EXISTS property_inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        property_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'new'
    )`);

    // Newsletter subscriptions table
    db.run(`CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active'
    )`);
});

// Email configuration (using nodemailer)
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'hello@dreamscapereality.in',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

// API Routes

// 1. Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message, query_type = 'general' } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    db.run(
        `INSERT INTO contact_queries (name, email, phone, message, query_type) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, phone, message, query_type],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Send confirmation email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Thank you for contacting DreamScape Reality',
                html: `
                    <h2>Thank you for your inquiry!</h2>
                    <p>Dear ${name},</p>
                    <p>We have received your message and will get back to you within 24 hours.</p>
                    <p><strong>Your Message:</strong></p>
                    <p>${message}</p>
                    <br>
                    <p>Best regards,</p>
                    <p>DreamScape Reality Team</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email error:', error);
                }
            });

            res.json({ 
                success: true, 
                message: 'Your inquiry has been submitted successfully!',
                queryId: this.lastID 
            });
        }
    );
});

// 2. Demo Booking Submission
app.post('/api/demo-booking', (req, res) => {
    const { 
        name, email, phone, preferred_date, preferred_time, 
        property_interest, budget_range, city 
    } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    db.run(
        `INSERT INTO demo_bookings 
         (name, email, phone, preferred_date, preferred_time, property_interest, budget_range, city) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, preferred_date, preferred_time, property_interest, budget_range, city],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Send confirmation email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'VR Demo Booking Confirmation - DreamScape Reality',
                html: `
                    <h2>VR Demo Booking Confirmed!</h2>
                    <p>Dear ${name},</p>
                    <p>Your VR demo booking has been confirmed. Our team will contact you shortly to finalize the details.</p>
                    <p><strong>Booking Details:</strong></p>
                    <ul>
                        <li>Preferred Date: ${preferred_date || 'Not specified'}</li>
                        <li>Preferred Time: ${preferred_time || 'Not specified'}</li>
                        <li>City: ${city || 'Not specified'}</li>
                        <li>Budget Range: ${budget_range || 'Not specified'}</li>
                    </ul>
                    <p>Get ready to step into your future home!</p>
                    <br>
                    <p>Best regards,</p>
                    <p>DreamScape Reality Team</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email error:', error);
                }
            });

            res.json({ 
                success: true, 
                message: 'Your demo booking has been confirmed!',
                bookingId: this.lastID 
            });
        }
    );
});

// 3. Property Inquiry Submission
app.post('/api/property-inquiry', (req, res) => {
    const { property_id, name, email, phone, message } = req.body;

    if (!property_id || !name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
        `INSERT INTO property_inquiries (property_id, name, email, phone, message) 
         VALUES (?, ?, ?, ?, ?)`,
        [property_id, name, email, phone, message],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ 
                success: true, 
                message: 'Your property inquiry has been submitted!',
                inquiryId: this.lastID 
            });
        }
    );
});

// 4. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    db.run(
        `INSERT OR REPLACE INTO newsletter_subscriptions (email, name) VALUES (?, ?)`,
        [email, name],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ 
                success: true, 
                message: 'Successfully subscribed to newsletter!' 
            });
        }
    );
});

// 5. Get Properties (API endpoint)
app.get('/api/properties', (req, res) => {
    const properties = [
        {
            "id": 1,
            "title": "Modern Luxury Apartment",
            "type": "Apartment",
            "location": "Bandra West, Mumbai",
            "price": "₹8.5 Crores",
            "bedrooms": 3,
            "bathrooms": 2,
            "area": "1,950 sq ft",
            "features": ["VR Tour Available", "Smart Home", "Sea View", "Balcony"],
            "vr_tour": "Available"
        },
        {
            "id": 2,
            "title": "Executive Villa",
            "type": "Villa",
            "location": "Jubilee Hills, Hyderabad",
            "price": "₹12 Crores",
            "bedrooms": 4,
            "bathrooms": 3,
            "area": "3,200 sq ft",
            "features": ["VR Tour Available", "Swimming Pool", "Garden", "Car Parking"],
            "vr_tour": "Available"
        },
        {
            "id": 3,
            "title": "Commercial Office Space",
            "type": "Commercial",
            "location": "Cyber City, Gurgaon",
            "price": "₹2,50,000/month",
            "bedrooms": "N/A",
            "bathrooms": 2,
            "area": "1,680 sq ft",
            "features": ["VR Tour Available", "Conference Room", "Reserved Parking", "Modern Interiors"],
            "vr_tour": "Available"
        },
        {
            "id": 4,
            "title": "Cozy Studio Apartment",
            "type": "Apartment",
            "location": "Koramangala, Bangalore",
            "price": "₹85 Lakhs",
            "bedrooms": 1,
            "bathrooms": 1,
            "area": "780 sq ft",
            "features": ["VR Tour Available", "Exposed Brick", "High Ceilings", "Natural Light"],
            "vr_tour": "Available"
        },
        {
            "id": 5,
            "title": "Luxury Penthouse",
            "type": "Penthouse",
            "location": "Worli, Mumbai",
            "price": "₹32 Crores",
            "bedrooms": 5,
            "bathrooms": 4,
            "area": "3,900 sq ft",
            "features": ["VR Tour Available", "Panoramic City Views", "Private Lift", "Terrace Garden"],
            "vr_tour": "Available"
        },
        {
            "id": 6,
            "title": "Family Townhouse",
            "type": "Townhouse",
            "location": "DLF Phase 3, Gurgaon",
            "price": "₹4.5 Crores",
            "bedrooms": 3,
            "bathrooms": 2,
            "area": "2,200 sq ft",
            "features": ["VR Tour Available", "Backyard", "Double Car Garage", "Modular Kitchen"],
            "vr_tour": "Available"
        }
    ];

    res.json(properties);
});

// Admin Routes (Basic)

// Get all contact queries
app.get('/api/admin/contacts', (req, res) => {
    db.all(
        `SELECT * FROM contact_queries ORDER BY created_at DESC`,
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Get all demo bookings
app.get('/api/admin/bookings', (req, res) => {
    db.all(
        `SELECT * FROM demo_bookings ORDER BY created_at DESC`,
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Get all property inquiries
app.get('/api/admin/inquiries', (req, res) => {
    db.all(
        `SELECT * FROM property_inquiries ORDER BY created_at DESC`,
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Update query status
app.put('/api/admin/update-status/:table/:id', (req, res) => {
    const { table, id } = req.params;
    const { status } = req.body;

    const allowedTables = ['contact_queries', 'demo_bookings', 'property_inquiries'];
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Invalid table' });
    }

    db.run(
        `UPDATE ${table} SET status = ? WHERE id = ?`,
        [status, id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, message: 'Status updated successfully' });
        }
    );
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`DreamScape Reality server running on port ${PORT}`);
    console.log(`Database initialized successfully`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
