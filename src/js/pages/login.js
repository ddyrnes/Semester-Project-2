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
} else {
  console.log("No access token found, user is not logged in.");
}

hasAccessToken();
// function logoutUser() {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("user"); // If you stored user data separately
//   // Optionally redirect to login page or home page
//   window.location.href = "/login.html";
// }
// logoutUser();
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      handleLogin(event);
    });
  }
});
