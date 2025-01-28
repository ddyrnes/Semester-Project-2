export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  console.log("Logged out, token and user removed from localstorage");
}
