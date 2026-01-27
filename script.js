// Sticky Header and Navbar Logic
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Logic
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-links a');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Portfolio Toggle Logic
const portfolioGrid = document.querySelector('.portfolio');
const togglePortfolioBtn = document.getElementById('toggle-portfolio');

if (togglePortfolioBtn && portfolioGrid) {
    togglePortfolioBtn.addEventListener('click', () => {
        portfolioGrid.classList.toggle('expanded');
        togglePortfolioBtn.classList.toggle('active');

        const btnText = togglePortfolioBtn.querySelector('.btn-text');
        if (portfolioGrid.classList.contains('expanded')) {
            btnText.textContent = 'Свернуть';
        } else {
            btnText.textContent = 'Смотреть все работы';
            // Scroll back to portfolio top if collapsing
            portfolioGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .description, .service-card, .video-item, .team-part').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ...existing logic for slider and scrollers...
const slider = document.querySelector('.slider');
const navLinks = document.querySelectorAll('.slider-nav a');
const scrollers = document.querySelectorAll('.scroller');

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const slideWidth = slider.offsetWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scroll for all anchor links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            // Offset for sticky navbar
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

slider.addEventListener('scroll', () => {
    const currentSlide = Math.round(slider.scrollLeft / slider.offsetWidth);
    navLinks.forEach((nav, index) => {
        nav.classList.toggle('active', index === currentSlide);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для кнопок "Подробнее"
    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', function () {
            const serviceCard = this.closest('.service');
            const details = serviceCard.querySelector('.service-details');
            details.classList.toggle('active');
        });
    });

    // Обработчик для кнопок "Скрыть окно"
    document.querySelectorAll('.hide-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            this.parentElement.classList.remove('active');
        });
    });
});

// Partner logo scroller animation - call directly since script is at end of body
addAnimation();

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);
        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.append(duplicatedItem);
        });
    });
}

// Footer Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // Clear previous messages
        formMessage.className = 'form-message';
        formMessage.textContent = '';

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation (HTML5 will handle required fields)
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Пожалуйста, заполните все поля.';
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            e.preventDefault();
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Пожалуйста, введите корректный email адрес.';
            return false;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Отправка...';
        submitBtn.disabled = true;

        // FormSubmit will handle the actual submission
        // The form will be submitted to FormSubmit.co
        // Note: First submission will require email confirmation
    });

    // Optional: Handle form inputs for better UX
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Clear error on input
        input.addEventListener('input', function () {
            if (formMessage.classList.contains('error')) {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }
        });

        // Add animation on focus
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateX(2px)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
}
