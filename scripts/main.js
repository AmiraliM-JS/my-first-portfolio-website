// Smooth scrolling for navigation links
// Enhanced smooth scrolling for all devices
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Special handling for Contact link
        if (targetId === '#contact') {
            // Scroll to the bottom of the page
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offset = window.innerWidth <= 600 ? -50 : 0; // Adjust for mobile header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// Project details toggle functionality
document.querySelectorAll('.project').forEach(project => {
    const title = project.querySelector('h3');
    const details = project.querySelector('.project-details');
    const closeBtn = project.querySelector('.close-btn');

    title.addEventListener('click', () => {
        // Close all open project details first
        document.querySelectorAll('.project-details').forEach(detail => {
            detail.style.display = 'none';
        });
        document.querySelectorAll('.project').forEach(p => {
            p.classList.remove('active');
        });

        // Open the clicked project's details
        details.style.display = 'block';
        project.classList.add('active');
    });


    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        details.style.display = 'none';
        project.classList.remove('active');
    });
});

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

// Enhanced scroll event listener for mobile compatibility
window.addEventListener('scroll', () => {
    const scrollThreshold = window.innerWidth <= 600 ? 100 : 300; // Lower threshold for mobile
    if (window.scrollY > scrollThreshold) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
}, { passive: true });


backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
