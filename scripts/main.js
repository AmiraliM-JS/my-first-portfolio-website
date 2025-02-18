// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Project details toggle functionality
document.querySelectorAll('.project').forEach(project => {
    const title = project.querySelector('h3');
    const details = project.querySelector('.project-details');
    const closeBtn = project.querySelector('.close-btn');

    title.addEventListener('click', () => {
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

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
