// Application Data - India-specific
const appData = {
  "properties": [
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
  ],
  "testimonials": [
    {
      "name": "Priya Sharma",
      "type": "Home Buyer",
      "location": "Mumbai, Maharashtra",
      "testimonial": "DreamScape Reality made it possible for me to tour 8 different properties in one afternoon without leaving my home in Andheri. The VR experience was so realistic, I felt like I was actually walking through each apartment. I ended up buying a beautiful 2BHK in Bandra that I initially discovered through their virtual tour!",
      "rating": 5
    },
    {
      "name": "Rajesh Gupta", 
      "type": "Real Estate Agent",
      "location": "New Delhi",
      "testimonial": "Since implementing DreamScape Reality's VR tours, my client engagement has increased by 60%. NRI buyers especially love being able to explore Delhi properties remotely from abroad. It's helped me close deals 30% faster than traditional site visits.",
      "rating": 5
    },
    {
      "name": "Anita Reddy",
      "type": "Property Investor",
      "location": "Hyderabad, Telangana", 
      "testimonial": "As someone who invests in properties across Chennai, Bangalore, and Hyderabad, DreamScape Reality has been a game-changer. I can now evaluate investment opportunities without the time and expense of traveling between cities. The virtual tours are incredibly detailed and accurate.",
      "rating": 5
    },
    {
      "name": "Vikram Patel",
      "type": "First-Time Buyer",
      "location": "Pune, Maharashtra",
      "testimonial": "Being a first-time homebuyer in Pune's competitive market was intimidating, but DreamScape Reality's VR tours helped me understand what to look for in a property. I could revisit the virtual tours multiple times and even show them to my parents for their input. It made the whole process so much easier!",
      "rating": 5
    },
    {
      "name": "Kavya Nair",
      "type": "Realtor",
      "location": "Kochi, Kerala",
      "testimonial": "My clients love the convenience of VR tours, especially during monsoon season when site visits are difficult. They can narrow down their choices before we schedule physical visits, which saves everyone time. The technology is impressive and really sets my listings apart from other agents in Kochi.",
      "rating": 5
    },
    {
      "name": "Arjun Singh",
      "type": "NRI Buyer", 
      "location": "Dubai, UAE (Originally from Delhi)",
      "testimonial": "Moving back to India from Dubai seemed challenging until I discovered DreamScape Reality. I was able to tour dozens of apartments in Noida and Gurgaon virtually and found the perfect home for my family. The VR experience was so detailed I knew exactly what to expect when I visited India.",
      "rating": 5
    }
  ]
};

// API Configuration
const API_BASE_URL = window.location.origin;
const API_ENDPOINTS = {
  contact: '/api/contact',
  demoBooking: '/api/demo-booking',
  propertyInquiry: '/api/property-inquiry',
  newsletter: '/api/newsletter',
  properties: '/api/properties',
  adminContacts: '/api/admin/contacts',
  adminBookings: '/api/admin/bookings',
  adminInquiries: '/api/admin/inquiries',
  adminUpdateStatus: '/api/admin/update-status'
};

// Global variables
let currentTestimonialIndex = 0;
let filteredProperties = appData.properties;
let isAdminLoggedIn = false;
let toastManager = null;

// Toast Notification System
class ToastManager {
  constructor() {
    this.container = document.getElementById('toastContainer');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toastContainer';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };

    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
    `;

    this.container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 300);
      }
    }, duration);

    return toast;
  }

  success(message) {
    return this.show(message, 'success');
  }

  error(message) {
    return this.show(message, 'error');
  }

  info(message) {
    return this.show(message, 'info');
  }

  warning(message) {
    return this.show(message, 'warning');
  }
}

// API Helper Functions
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    // For demo purposes, simulate successful API responses
    return { success: true, data: { message: 'Success' } };
  }
}

// Form Validation Utilities
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateForm(formData, requiredFields = []) {
  const errors = {};

  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = 'This field is required';
    }
  });

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && formData.phone.trim() !== '' && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
}

function displayFormErrors(form, errors) {
  // Clear existing errors
  form.querySelectorAll('.form-error').forEach(error => error.remove());
  form.querySelectorAll('.form-control').forEach(control => control.classList.remove('error'));

  // Display new errors
  Object.keys(errors).forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add('error');
      
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = errors[fieldName];
      
      field.parentNode.appendChild(errorElement);
    }
  });
}

function setFormLoading(form, loading) {
  const button = form.querySelector('button[type="submit"]');
  const btnText = button.querySelector('.btn-text');
  const btnSpinner = button.querySelector('.btn-spinner');

  if (loading) {
    form.classList.add('loading');
    button.disabled = true;
    if (btnText) btnText.classList.add('hidden');
    if (btnSpinner) btnSpinner.classList.remove('hidden');
  } else {
    form.classList.remove('loading');
    button.disabled = false;
    if (btnText) btnText.classList.remove('hidden');
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Demo Modal Functions
function openDemoModal() {
  console.log('Opening demo modal...');
  openModal('demoModal');
}

function closeDemoModal() {
  closeModal('demoModal');
}

// Property Modal Functions
function openPropertyModal(propertyId) {
  console.log('Opening property modal for ID:', propertyId);
  const property = appData.properties.find(p => p.id === propertyId);
  if (property) {
    const modal = document.getElementById('propertyModal');
    const propertyIdInput = document.getElementById('propertyId');
    const propertyInfo = document.getElementById('selectedPropertyInfo');

    propertyIdInput.value = propertyId;
    propertyInfo.innerHTML = `
      <h4>${property.title}</h4>
      <p><strong>Location:</strong> ${property.location}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Type:</strong> ${property.type}</p>
    `;

    openModal('propertyModal');
  }
}

function closePropertyModal() {
  closeModal('propertyModal');
}

// Smooth scroll to section utility
function scrollToSection(sectionId) {
  console.log('Scrolling to section:', sectionId);
  const targetSection = document.querySelector(`#${sectionId}`);
  if (targetSection) {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// VR Tour functionality
function startVRTour(propertyId) {
  console.log('Starting VR tour for property:', propertyId);
  const property = appData.properties.find(p => p.id === propertyId);
  if (property && toastManager) {
    toastManager.success(`🥽 Starting VR Tour for "${property.title}"! In a real application, this would launch the VR experience.`);
  }
}

// Initialize application immediately
console.log('Initializing DreamScape Reality India application...');

// Initialize toast manager
toastManager = new ToastManager();

// Make functions globally available immediately
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;
window.openPropertyModal = openPropertyModal;
window.closePropertyModal = closePropertyModal;
window.scrollToSection = scrollToSection;
window.startVRTour = startVRTour;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, setting up app...');
  initializeApp();
});

// Initialize application
function initializeApp() {
  try {
    setupNavigation();
    loadProperties();
    loadTestimonials();
    setupPropertyFilters();
    setupForms();
    setupModals();
    setupScrollAnimations();
    setupAdmin();
    
    console.log('App initialization complete');
  } catch (error) {
    console.error('Error during app initialization:', error);
    if (toastManager) {
      toastManager.error('Application failed to initialize. Please refresh the page.');
    }
  }
}

// Navigation functionality
function setupNavigation() {
  console.log('Setting up navigation...');
  
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      navMenu.classList.toggle('active');
      
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);

      // Close mobile menu
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle ? navToggle.querySelectorAll('span') : [];
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(31, 33, 33, 0.98)';
      } else {
        navbar.style.background = 'rgba(31, 33, 33, 0.95)';
      }
    }
  });
}

// Load and display properties
function loadProperties() {
  console.log('Loading properties...');
  const propertiesGrid = document.getElementById('propertiesGrid');
  if (!propertiesGrid) {
    console.warn('Properties grid not found');
    return;
  }

  propertiesGrid.innerHTML = '';

  filteredProperties.forEach(property => {
    const propertyCard = createPropertyCard(property);
    propertiesGrid.appendChild(propertyCard);
  });
}

// Create property card element
function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card';
  card.setAttribute('data-type', property.type);

  // Format bedroom display for Indian context
  let bedroomText = property.bedrooms === 'N/A' ? 'Commercial' : 
                   property.bedrooms === 1 ? '1BHK' :
                   property.bedrooms === 2 ? '2BHK' :
                   property.bedrooms === 3 ? '3BHK' :
                   property.bedrooms === 4 ? '4BHK' :
                   property.bedrooms === 5 ? '5BHK' :
                   `${property.bedrooms} bed`;

  card.innerHTML = `
    <div class="property-image">
      🏢 ${property.type}
    </div>
    <div class="property-content">
      <h3 class="property-title">${property.title}</h3>
      <div class="property-price">${property.price}</div>
      <div class="property-details">
        <div>📍 ${property.location}</div>
        <div>📐 ${property.area}</div>
        <div>🏠 ${bedroomText}</div>
        <div>🚿 ${property.bathrooms} bath</div>
      </div>
      <div class="property-features">
        ${property.features.map(feature => `<span class="property-feature">${feature}</span>`).join('')}
      </div>
      <div class="property-actions">
        <button class="vr-tour-btn" onclick="window.startVRTour(${property.id})">
          🥽 VR Tour
        </button>
        <button class="inquiry-btn" onclick="window.openPropertyModal(${property.id})">
          💬 Inquire
        </button>
      </div>
    </div>
  `;

  return card;
}

// Property filters
function setupPropertyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter properties
      const filterValue = this.getAttribute('data-filter');
      if (filterValue === 'all') {
        filteredProperties = appData.properties;
      } else {
        filteredProperties = appData.properties.filter(property => 
          property.type === filterValue
        );
      }

      // Reload properties with animation
      const propertiesGrid = document.getElementById('propertiesGrid');
      if (propertiesGrid) {
        propertiesGrid.style.opacity = '0';
        
        setTimeout(() => {
          loadProperties();
          propertiesGrid.style.opacity = '1';
        }, 200);
      }
    });
  });
}

// Load and display testimonials
function loadTestimonials() {
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  if (!testimonialsContainer) {
    console.warn('Testimonials container not found');
    return;
  }

  testimonialsContainer.innerHTML = '';

  appData.testimonials.forEach((testimonial, index) => {
    const testimonialCard = createTestimonialCard(testimonial, index);
    testimonialsContainer.appendChild(testimonialCard);
  });

  setupTestimonialSlider();
}

// Create testimonial card element
function createTestimonialCard(testimonial, index) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';

  const stars = '⭐'.repeat(testimonial.rating);

  card.innerHTML = `
    <div class="testimonial-text">"${testimonial.testimonial}"</div>
    <div class="testimonial-rating">${stars}</div>
    <div class="testimonial-author">${testimonial.name}</div>
    <div class="testimonial-role">${testimonial.type} • ${testimonial.location}</div>
  `;

  return card;
}

// Setup testimonial slider
function setupTestimonialSlider() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const container = document.getElementById('testimonialsContainer');

  if (!prevBtn || !nextBtn || !container) {
    console.warn('Testimonial slider elements not found');
    return;
  }

  function updateSliderPosition() {
    const translateX = -currentTestimonialIndex * 100;
    container.style.transform = `translateX(${translateX}%)`;
  }

  prevBtn.addEventListener('click', function() {
    currentTestimonialIndex = currentTestimonialIndex > 0 
      ? currentTestimonialIndex - 1 
      : appData.testimonials.length - 1;
    updateSliderPosition();
  });

  nextBtn.addEventListener('click', function() {
    currentTestimonialIndex = currentTestimonialIndex < appData.testimonials.length - 1 
      ? currentTestimonialIndex + 1 
      : 0;
    updateSliderPosition();
  });

  // Auto-advance testimonials
  setInterval(() => {
    currentTestimonialIndex = currentTestimonialIndex < appData.testimonials.length - 1 
      ? currentTestimonialIndex + 1 
      : 0;
    updateSliderPosition();
  }, 8000);

  updateSliderPosition();
}

// Setup forms with API integration
function setupForms() {
  console.log('Setting up forms with API integration...');
  
  // Contact form
  setupContactForm();
  
  // Demo booking form
  setupDemoForm();
  
  // Property inquiry form
  setupPropertyInquiryForm();
  
  // Newsletter form
  setupNewsletterForm();
}

// Contact form setup
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Contact form submitted');
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    const errors = validateForm(data, ['name', 'email', 'queryType', 'message']);
    
    if (Object.keys(errors).length > 0) {
      displayFormErrors(this, errors);
      toastManager.error('Please fix the errors in the form');
      return;
    }

    // Clear any existing errors
    displayFormErrors(this, {});
    setFormLoading(this, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toastManager.success('Thank you for your message! We will get back to you within 24 hours.');
      this.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toastManager.error('An error occurred. Please try again later.');
    } finally {
      setFormLoading(this, false);
    }
  });
}

// Demo form setup
function setupDemoForm() {
  const demoForm = document.getElementById('demoForm');
  if (!demoForm) return;

  // Set minimum date to today
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  demoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Demo form submitted');
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    const errors = validateForm(data, ['name', 'email', 'phone']);
    
    if (Object.keys(errors).length > 0) {
      displayFormErrors(this, errors);
      toastManager.error('Please fix the errors in the form');
      return;
    }

    // Clear any existing errors
    displayFormErrors(this, {});
    setFormLoading(this, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toastManager.success('Demo booked successfully! We will confirm your slot via email.');
      this.reset();
      closeDemoModal();
    } catch (error) {
      console.error('Demo form error:', error);
      toastManager.error('An error occurred. Please try again later.');
    } finally {
      setFormLoading(this, false);
    }
  });
}

// Property inquiry form setup
function setupPropertyInquiryForm() {
  const inquiryForm = document.getElementById('propertyInquiryForm');
  if (!inquiryForm) return;

  inquiryForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Property inquiry form submitted');
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    const errors = validateForm(data, ['name', 'email', 'phone']);
    
    if (Object.keys(errors).length > 0) {
      displayFormErrors(this, errors);
      toastManager.error('Please fix the errors in the form');
      return;
    }

    // Clear any existing errors
    displayFormErrors(this, {});
    setFormLoading(this, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toastManager.success('Inquiry sent successfully! We will contact you soon with details.');
      this.reset();
      closePropertyModal();
    } catch (error) {
      console.error('Property inquiry error:', error);
      toastManager.error('An error occurred. Please try again later.');
    } finally {
      setFormLoading(this, false);
    }
  });
}

// Newsletter form setup
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Newsletter form submitted');
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    const errors = validateForm(data, ['email']);
    
    if (Object.keys(errors).length > 0) {
      toastManager.error('Please enter a valid email address');
      return;
    }

    setFormLoading(this, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toastManager.success('Successfully subscribed to our newsletter!');
      this.reset();
    } catch (error) {
      console.error('Newsletter form error:', error);
      toastManager.error('An error occurred. Please try again later.');
    } finally {
      setFormLoading(this, false);
    }
  });
}

// Setup modals
function setupModals() {
  // Close modals when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close modals with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
}

// Admin functionality
function setupAdmin() {
  console.log('Setting up admin functionality...');
  
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLogin = document.getElementById('adminLogin');
  const adminPanel = document.getElementById('adminPanel');

  // Admin login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Admin login attempted');
      
      const formData = new FormData(this);
      const password = formData.get('password');
      
      // Simple password check (in production, this should be properly secured)
      if (password === 'admin123') {
        isAdminLoggedIn = true;
        adminLogin.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadAdminData();
        toastManager.success('Admin login successful');
      } else {
        toastManager.error('Invalid password');
      }
    });
  }

  // Admin tabs
  const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Update active tab
      adminTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content
      document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabName).classList.add('active');
      
      // Load data for the selected tab
      loadAdminData(tabName);
    });
  });
}

// Load admin data
async function loadAdminData(tab = 'contacts') {
  if (!isAdminLoggedIn) return;

  console.log('Loading admin data for tab:', tab);
  
  // Show mock data for demonstration
  renderAdminTable(getMockAdminData(tab), `${tab}Table`, tab);
}

// Get mock admin data for demonstration
function getMockAdminData(tab) {
  const baseData = {
    contacts: [
      {
        id: 1,
        created_at: '2025-01-15T10:30:00Z',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        query_type: 'demo',
        message: 'Interested in VR tours for Mumbai properties',
        status: 'new'
      },
      {
        id: 2,
        created_at: '2025-01-14T15:45:00Z',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43211',
        query_type: 'property',
        message: 'Looking for 3BHK in Bangalore',
        status: 'in_progress'
      }
    ],
    bookings: [
      {
        id: 1,
        created_at: '2025-01-15T11:00:00Z',
        name: 'Anita Reddy',
        email: 'anita.reddy@email.com',
        phone: '+91 98765 43212',
        preferred_date: '2025-01-20',
        property_interest: 'villa',
        budget_range: '2Cr-5Cr',
        city: 'hyderabad',
        status: 'new'
      }
    ],
    inquiries: [
      {
        id: 1,
        created_at: '2025-01-15T12:15:00Z',
        name: 'Vikram Patel',
        email: 'vikram.patel@email.com',
        phone: '+91 98765 43213',
        property_id: 1,
        message: 'Interested in viewing the luxury apartment',
        status: 'new'
      }
    ]
  };

  return baseData[tab] || [];
}

// Render admin table
function renderAdminTable(data, tableId, tab) {
  const tbody = document.getElementById(tableId);
  if (!tbody) return;

  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    const date = new Date(item.created_at).toLocaleDateString('en-IN');
    
    let rowHTML = '';
    
    switch (tab) {
      case 'contacts':
        rowHTML = `
          <td>${date}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.query_type}</td>
          <td><span class="status-badge status-badge--${item.status.replace('_', '')}">${item.status.replace('_', ' ')}</span></td>
          <td>
            <div class="admin-actions">
              <button class="admin-btn admin-btn--status" onclick="window.updateStatus('contacts', ${item.id}, '${item.status}')">Update Status</button>
              <button class="admin-btn admin-btn--view" onclick="window.viewDetails('${item.message}')">View</button>
            </div>
          </td>
        `;
        break;
      case 'bookings':
        rowHTML = `
          <td>${date}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.preferred_date || 'Not specified'}</td>
          <td>${item.property_interest || 'Any'}</td>
          <td><span class="status-badge status-badge--${item.status.replace('_', '')}">${item.status.replace('_', ' ')}</span></td>
          <td>
            <div class="admin-actions">
              <button class="admin-btn admin-btn--status" onclick="window.updateStatus('bookings', ${item.id}, '${item.status}')">Update Status</button>
            </div>
          </td>
        `;
        break;
      case 'inquiries':
        const property = appData.properties.find(p => p.id == item.property_id);
        rowHTML = `
          <td>${date}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${property ? property.title : 'Property #' + item.property_id}</td>
          <td><span class="status-badge status-badge--${item.status.replace('_', '')}">${item.status.replace('_', ' ')}</span></td>
          <td>
            <div class="admin-actions">
              <button class="admin-btn admin-btn--status" onclick="window.updateStatus('inquiries', ${item.id}, '${item.status}')">Update Status</button>
              <button class="admin-btn admin-btn--view" onclick="window.viewDetails('${item.message}')">View</button>
            </div>
          </td>
        `;
        break;
    }
    
    row.innerHTML = rowHTML;
    tbody.appendChild(row);
  });
}

// Admin functions for status updates and viewing details
window.updateStatus = function(table, id, currentStatus) {
  const statusOptions = ['new', 'in_progress', 'resolved'];
  const currentIndex = statusOptions.indexOf(currentStatus);
  const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];
  
  toastManager.success(`Status updated to: ${nextStatus.replace('_', ' ')}`);
  
  // Reload the current tab
  const activeTab = document.querySelector('.admin-tab-btn.active');
  if (activeTab) {
    loadAdminData(activeTab.getAttribute('data-tab'));
  }
};

window.viewDetails = function(message) {
  alert(`Details:\n\n${message}`);
};

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(`
    .feature-card,
    .step-card,
    .benefit-column,
    .stat-card,
    .property-card,
    .about-card,
    .testimonial-card
  `);

  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Window resize handler
window.addEventListener('resize', debounce(function() {
  const navMenu = document.getElementById('navMenu');
  if (window.innerWidth > 768 && navMenu) {
    navMenu.classList.remove('active');
  }
}, 250));

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  if (toastManager) {
    toastManager.error('An unexpected error occurred. Please refresh the page if problems persist.');
  }
});

// Performance monitoring and final setup
window.addEventListener('load', function() {
  console.log('DreamScape Reality India website loaded successfully! 🏠✨🇮🇳');
  
  if ('performance' in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
});