console.log("test");
import { handleLogin } from "../auth/userLogin";

function hasAccessToken() {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  return !!token; // true if a token exists, false otherwise
}

// Usage
if (hasAccessToken()) {
  console.log("User is logged in!");
  window.location.href = "/pages/profile.html";
} else {
  console.log("No access token found, user is not logged in.");
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
