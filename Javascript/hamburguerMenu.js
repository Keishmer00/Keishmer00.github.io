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
