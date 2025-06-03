document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const contactBtnHero = document.querySelector('#hero .contact-btn');
    const aboutToggleButtons = document.querySelectorAll('.about-btn-toggle');
    const aboutSections = document.querySelectorAll('.about-section');
    const mainContent = document.querySelector('.main-content');
    let currentActiveSectionId = 'hero'; // Track current active section

    // Function to show a specific content section
    function showSection(targetId) {
        // Hide all sections first
        contentSections.forEach(section => {
            section.classList.remove('active-section');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            currentActiveSectionId = targetId; // Update active section ID

            // Scroll main-content to the top of the currently active section
            // This is primarily for when navigating directly from the sidebar.
            // When scrolled by user, this won't interfere.
            mainContent.scrollTo({
                top: targetSection.offsetTop - mainContent.offsetTop, // Calculate position relative to scrollable container
                behavior: 'smooth'
            });
        }

        // Update active class for navigation
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === targetId) {
                item.classList.add('active');
            }
        });
    }

    // Handle sidebar navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = item.dataset.section;
            showSection(targetSectionId);
        });
    });


    // Handle About section toggles (Experience, Projects, Certifications)
    // Toggle behavior for Experience and Projects
aboutToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.toggle;
        const targetSection = document.getElementById(targetId);

        const isVisible = targetSection.classList.contains('active-toggle');

        // Remove active-toggle from all sections
        aboutSections.forEach(section => section.classList.remove('active-toggle'));
        // Remove 'active' class from all buttons
        aboutToggleButtons.forEach(btn => btn.classList.remove('active'));

        if (!isVisible) {
            // If the section was not visible, show it and activate the button
            targetSection.classList.add('active-toggle');
            button.classList.add('active');
        }
        // If it *was* visible, just close it (nothing is shown now)
    });
});

    showSection('hero'); // Start on the hero section as per design
    document.querySelector('.main-nav a[data-section="about"]');

    // Form Submission (example - add actual submission logic later)
    // Observer to update active navigation item based on scroll
    const observerOptions = {
        root: mainContent, // Observe within the scrollable main-content
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                // Only update if it's not the 'hero' section being observed, or if it is the hero.
                // We want hero to be active when at the top.
                if (id !== 'hero' || mainContent.scrollTop < entry.target.offsetHeight * 0.5) { // If hero is at top or half visible
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.dataset.section === id) {
                            item.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all content sections except the hero initially, as hero is handled by default.
    // However, if the user scrolls back to hero, we want it to be active.
    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });

    
});
document.querySelectorAll('.back-to-intro-btn').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-section');
    
    // Deactivate all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active-section');
    });

    // Activate the hero section
    document.getElementById(target).classList.add('active-section');

    // Optional: Update nav items
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
  });
});
