// Make this function GLOBAL
function openGmail() {
  const email = "pratgrahi.10@gmail.com";
  const subject = "Let's Connect!";
  const body = "Hi Pratima, I saw your portfolio and wanted to reach out.";

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
}
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const aboutToggleButtons = document.querySelectorAll('.about-btn-toggle');
  const aboutSections = document.querySelectorAll('.about-section');
  const mainContent = document.querySelector('.main-content');

  function resetAboutSubsections() {
    aboutSections.forEach(section => section.classList.remove('active-toggle'));
    aboutToggleButtons.forEach(button => button.classList.remove('active'));
  }

  function showSection(id) {
    // Reset About internal subsections if leaving About
    if (id !== 'about') {
      resetAboutSubsections();
    }

    contentSections.forEach(s => s.classList.remove('active-section'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active-section');
      mainContent.scrollTo({
        top: target.offsetTop - mainContent.offsetTop,
        behavior: 'smooth'
      });
    }

    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === id);
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      showSection(item.dataset.section);
    });
  });

  aboutToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.toggle;
      const targetSection = document.getElementById(targetId);
      const isVisible = targetSection.classList.contains('active-toggle');

      // Close all sections and buttons first
      aboutSections.forEach(s => s.classList.remove('active-toggle'));
      aboutToggleButtons.forEach(b => b.classList.remove('active'));

      // Toggle current if it was not already open
      if (!isVisible) {
        targetSection.classList.add('active-toggle');
        btn.classList.add('active');
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
      }
    });
  }, {
    root: mainContent,
    threshold: 0.5
  });

  contentSections.forEach(section => observer.observe(section));

  document.querySelectorAll('.back-to-intro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.section);
    });
  });

  // Initial state
  showSection('hero');
});
