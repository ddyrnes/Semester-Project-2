console.log("test");
import { handleLogin } from "../auth/userLogin";
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      handleLogin(event);
    });
  }
});
