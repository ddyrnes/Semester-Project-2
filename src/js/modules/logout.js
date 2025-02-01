export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  console.log("Logged out, token and user removed from localstorage");
}
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector("#logoutBtn");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
      console.log("You have been logged out");
      // Optionally redirect to login page
      window.location.href = "/pages/login.html";
    });
  }
});
