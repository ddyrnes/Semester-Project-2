import "../modules/nav/nav.js";
import { handleRegister } from "../auth/registerUser";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("form");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
});
