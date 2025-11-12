const MobileMenuBtnElement = document.getElementById("mobile-menu-btn");
const MobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  MobileMenu.classList.toggle("open");
}

MobileMenuBtnElement.addEventListener("click", toggleMobileMenu);
