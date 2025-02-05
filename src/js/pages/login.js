import "../modules/nav/nav.js";
import { handleLogin } from "../auth/userLogin";

function hasAccessToken() {
  const token = localStorage.getItem("accessToken");
  return !!token; // true if a token exists, false otherwise
}

if (hasAccessToken()) {
  // window.location.href = "/pages/profile.html";
}

hasAccessToken();

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      handleLogin(event);
    });
  }
});
