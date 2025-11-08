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
