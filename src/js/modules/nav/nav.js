import { navToggle } from "./navToggle";
import { navHighlight } from "./navHighlight";
import { navUserExist } from "./navUserExist";
import { logout } from "../logout";
import { updateNavAvatar } from "./updateNavAvatar";

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
