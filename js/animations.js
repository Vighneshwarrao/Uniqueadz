// ============================================
// UniqueAdz - Advanced Animations
// Scroll-triggered animations and effects
// ============================================

class AnimationController {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimation();
        this.setupParallaxEffect();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '[data-animate], .feature-card, .service-card, .stat-card'
        );

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    triggerAnimation(element) {
        const animationType = element.dataset.animate || 'fadeInUp';
        element.classList.add('animated', animationType);
        element.style.opacity = '1';
        element.style.transform = 'none';
    }

    // Counter animation for statistics
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

   animateCounter(element) {
    const text = element.textContent.trim();
    const hasPercent = text.includes('%');
    const target = parseInt(text);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPercent ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPercent ? '%' : '+');
        }
    }, 16);
}


    // Parallax scrolling effect
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const scrollPosition = window.scrollY;
                const elementOffset = element.offsetTop;
                const distance = scrollPosition - elementOffset;
                const speed = element.dataset.parallax || 0.5;

                if (distance > -window.innerHeight && distance < window.innerHeight) {
                    element.style.transform = `translateY(${distance * speed}px)`;
                }
            });
        });
    }
}

// ============================================
// STAGGER ANIMATION HELPER
// ============================================

class StaggerAnimation {
    static animateChildren(parent, delay = 100) {
        const children = parent.querySelectorAll('[data-stagger]');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * delay}ms`;
            child.classList.add('animated');
        });
    }

    static animateOnScroll(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('[data-stagger]');
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * delay}ms`;
                        child.classList.add('animated');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            duration: options.duration || 600,
            delay: options.delay || 0,
            distance: options.distance || 30,
            easing: options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...options
        };
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('[data-reveal]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.reveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = `translateY(${this.options.distance}px)`;
            observer.observe(element);
        });
    }

    reveal(element) {
        element.style.transition = `opacity ${this.options.duration}ms ${this.options.easing}, 
                                    transform ${this.options.duration}ms ${this.options.easing}`;
        element.style.transitionDelay = `${this.options.delay}ms`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// ============================================
// HOVER EFFECTS
// ============================================

class HoverEffects {
    static setupCardHover() {
        const cards = document.querySelectorAll('.feature-card, .service-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-sm)';
            });
        });
    }

    static setupButtonHover() {
        const buttons = document.querySelectorAll('.btn, .cta-button');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    static setupLinkHover() {
        const links = document.querySelectorAll('.service-link, .nav-link');

        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = 'var(--accent-color)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.color = 'var(--primary-color)';
            });
        });
    }
}

// ============================================
// BACKGROUND ANIMATION
// ============================================

class BackgroundAnimation {
    static setupGradientAnimation() {
        const animatedBg = document.querySelectorAll('[data-gradient-animate]');

        animatedBg.forEach(element => {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .gradient-animated {
                    background-size: 200% 200%;
                    animation: gradientShift 15s ease infinite;
                }
            `;
            document.head.appendChild(style);
            element.classList.add('gradient-animated');
        });
    }

    static setupBlobAnimation() {
        const blobContainer = document.querySelector('[data-blob-animate]');
        if (!blobContainer) return;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes blob {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(20px, -50px) scale(1.1); }
                50% { transform: translate(-20px, 20px) scale(0.9); }
                75% { transform: translate(50px, 50px) scale(1.05); }
            }
            
            .blob {
                animation: blob 7s infinite;
            }
        `;
        document.head.appendChild(style);
        blobContainer.classList.add('blob');
    }
}

// ============================================
// TEXT ANIMATION
// ============================================

class TextAnimation {
    static typeWriter(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        type();
    }

    static fadeInWords(element, speed = 100) {
        const words = element.textContent.split(' ');
        element.textContent = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.animation = `fadeIn ${speed}ms ease-in forwards`;
            span.style.animationDelay = `${index * speed}ms`;
            element.appendChild(span);
        });
    }
}

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize main animation controller
    const animationController = new AnimationController();

    // Setup hover effects
    HoverEffects.setupCardHover();
    HoverEffects.setupButtonHover();
    HoverEffects.setupLinkHover();

    // Setup background animations
    BackgroundAnimation.setupGradientAnimation();
    BackgroundAnimation.setupBlobAnimation();

    // Initialize scroll reveal
    new ScrollReveal({
        duration: 600,
        delay: 0,
        distance: 30
    });

    // Stagger animations for lists
    StaggerAnimation.animateOnScroll('.features-grid', 100);
    StaggerAnimation.animateOnScroll('.services-grid', 100);
    StaggerAnimation.animateOnScroll('.stats-grid', 100);

    console.log('All animations initialized');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

class PerformanceMonitor {
    static measureAnimationPerformance() {
        if (!window.performance) return;

        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:');
        console.log('Page Load Time:', pageLoadTime + 'ms');
        console.log('Connect Time:', connectTime + 'ms');
        console.log('Render Time:', renderTime + 'ms');

        // Report to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: pageLoadTime
            });
        }
    }

    static observeFrameRate() {
        let lastTime = performance.now();
        let frames = 0;

        const checkFrameRate = () => {
            frames++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                console.log('FPS:', frames);
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(checkFrameRate);
        };

        requestAnimationFrame(checkFrameRate);
    }
}

// Monitor performance on page load
window.addEventListener('load', function() {
    PerformanceMonitor.measureAnimationPerformance();
});
