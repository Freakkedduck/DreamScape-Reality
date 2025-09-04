-- DreamScape Reality Database Schema

-- Contact queries table
CREATE TABLE IF NOT EXISTS contact_queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    query_type TEXT DEFAULT 'general',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
);

-- Demo bookings table
CREATE TABLE IF NOT EXISTS demo_bookings (
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
);

-- Property inquiries table
CREATE TABLE IF NOT EXISTS property_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active'
);

-- Insert sample data for testing
INSERT OR IGNORE INTO contact_queries (name, email, phone, message, query_type) VALUES 
('Rahul Sharma', 'rahul@example.com', '+91 98765 43210', 'Interested in VR property tours in Mumbai', 'general');

INSERT OR IGNORE INTO demo_bookings (name, email, phone, preferred_date, preferred_time, property_interest, budget_range, city) VALUES 
('Priya Patel', 'priya@example.com', '+91 87654 32109', '2025-09-10', '2:00 PM', 'Apartment', '₹50L-₹1Cr', 'Bangalore');
