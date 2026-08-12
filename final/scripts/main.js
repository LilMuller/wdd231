
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const year = document.querySelector("#currentyear");
if (year) year.textContent = new Date().getFullYear();

const modified = document.querySelector("#lastModified");
if (modified) modified.textContent = document.lastModified;

const currentPage = document.body.dataset.page;
document.querySelectorAll(".primary-nav a").forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
