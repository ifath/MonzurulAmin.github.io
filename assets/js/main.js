// Load header component
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const headerContent = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerContent;

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenuBtn.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }

            // Add active class to current page link
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                if (link.getAttribute('href').startsWith(currentPage)) {
                    link.classList.add('active');
                }
            });
        }
    } catch (error) {
        console.error('Error loading header:', error);
        // Fallback header if loading fails
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = `
                <div class="nav-container">
                    <nav>
                        <div class="nav-name">Monzurul Amin</div>
                        <button class="mobile-menu-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div class="nav-links">
                            <a href="index.html#about">About</a>
                            <a href="index.html#research">Research</a>
                            <a href="index.html#publications">Publications</a>
                            <a href="index.html#education">Education</a>
                            <a href="index.html#experience">Experience</a>
                            <a href="index.html#projects">Projects</a>
                            <a href="index.html#skills">Skills</a>
                            <a href="blog.html">Blog</a>
                        </div>
                    </nav>
                </div>
            `;
        }
    }
}

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();

    // Smooth scrolling for anchor links
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinks && mobileMenuBtn) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Add animation class to sections when they come into view
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Email protection
    document.querySelectorAll('.email-protection').forEach(element => {
        const emailAddress = element.dataset.email;
        if (emailAddress) {
            element.href = 'mailto:' + emailAddress;
            element.textContent = emailAddress;
        }
    });

    // Dynamic year update in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add active state to navigation links based on scroll position
    const navItems = document.querySelectorAll('.nav-links a');
    
    function setActiveNavItem() {
        const fromTop = window.scrollY + 100;
        
        navItems.forEach(link => {
            const section = document.querySelector(link.hash);
            
            if (section.offsetTop <= fromTop && 
                section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
});
