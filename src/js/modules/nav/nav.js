import { navToggle } from "./navToggle";
import { navHighlight } from "./navHighlight";
import { navUserExist } from "./navUserExist";
import { logout } from "../logout";
import { updateNavAvatar } from "./updateNavAvatar";
import { scrollToTop } from "./footerScroll";

document.addEventListener("DOMContentLoaded", () => {
  navUserExist();
  navToggle();
  navHighlight();
  updateNavAvatar(); // Update navbar with user data

  // Attach logout event listeners
  const logoutButtons = document.querySelectorAll("#logoutBtn, #logoutBtnMobile");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", logout);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.querySelector("#backToTopBtn");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", scrollToTop);
  }
});
