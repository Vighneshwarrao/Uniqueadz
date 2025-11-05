// ============================================
// UniqueAdz - Main JavaScript
// Navigation, Mobile Menu, Scroll Effects
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeFormHandling();
});

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Update active nav link based on current page
    updateActiveNavLink();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Parallax effect on hero section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    document.querySelectorAll('.feature-card, .service-card, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Basic validation
    if (!validateForm(formData)) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Submit form via Formspree or similar service
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            showNotification('Error sending message. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error sending message. Please try again.', 'error');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
}

function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ANALYTICS TRACKING
// ============================================

// Track button clicks
document.querySelectorAll('.btn, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent,
            button_class: this.className
        });
    });
});

// Track form submissions
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for menus
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// Focus management
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ============================================
// PAGE LOAD OPTIMIZATION
// ============================================

// Preload critical resources
window.addEventListener('load', function() {
    // Mark page as fully loaded
    document.body.classList.add('page-loaded');
    console.log('Page fully loaded');
});

// Measure performance
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}
