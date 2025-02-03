import { getUserData } from "../profile/myProfile/storage";
export function navToggle() {
  const hamburgerBtn = document.querySelector("#hamburgerBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (!hamburgerBtn || !mobileMenu) return;

  // Toggle mobile menu on click
  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!mobileMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });

  // Close mobile menu when resizing above 1024px
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }

    // Had to place this inside a function
    // Ensure totalBalanceDesktop exists before modifying it to prevent ESLint errors
    function updateTotalBalanceVisibility() {
      const totalBalanceDesktop = document.getElementById("totalBalanceDesktop");
      const user = getUserData();

      if (totalBalanceDesktop) {
        if (window.innerWidth < 1024) {
          totalBalanceDesktop.classList.add("hidden");
        } else if (user) {
          totalBalanceDesktop.classList.remove("hidden");
        }
      }
    }
    updateTotalBalanceVisibility();
    window.addEventListener("resize", updateTotalBalanceVisibility);
  });
}
