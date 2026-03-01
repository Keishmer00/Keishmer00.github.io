gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
  const menuDialog = document.getElementById('menuDialog');
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');

  openMenu.addEventListener('click', () => {
    menuDialog.showModal();
  });

  closeMenu.addEventListener('click', () => {
    menuDialog.close();
  });

  // Cerrar si se hace click fuera del sidebar
  menuDialog.addEventListener('click', (e) => {
    const sidebar = menuDialog.querySelector('.sidebar');
    const rect = sidebar.getBoundingClientRect();
    const inSidebar =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom;
    if (!inSidebar) {
      menuDialog.close();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
const navbar = document.getElementsByTagName('nav');

});


let allProjects = document.querySelector('all-best-projects'); 
 
gsap.from('nav',{
  opacity: 0,
  duration: 2,  
  y: -100,
  ease: "power2.out"
})

gsap.from('.left-text',{
  opacity: 0,
  duration: 2,
  delay:2,
  y: -100,
  ease: "power2.out",
  color: "red",
})
 
gsap.from('.right-text',{
  opacity: 0,
  duration: 2,
  delay: 2,
  y: 100,
  ease: "power2.out"
})

// Branding Portfolio - Tab filtering
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const brandingCards = document.querySelectorAll('.branding-card');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      brandingCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.classList.remove('hidden');
          gsap.fromTo(card, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // GSAP scroll animation for branding cards
  gsap.from('.branding-header', {
    scrollTrigger: {
      trigger: '.branding-portfolio',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out"
  });

  gsap.from('.branding-tabs', {
    scrollTrigger: {
      trigger: '.branding-portfolio',
      start: 'top 75%',
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out"
  });

  gsap.from('.branding-card', {
    scrollTrigger: {
      trigger: '.branding-grid',
      start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });
});
