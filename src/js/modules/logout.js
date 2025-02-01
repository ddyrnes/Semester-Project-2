export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector("#logoutBtn");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
      window.location.href = "/pages/login.html";
    });
  }
});
