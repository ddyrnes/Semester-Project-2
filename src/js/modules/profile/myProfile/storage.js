/** Get user details from localStorage */
export function getUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  if (!user || !accessToken) {
    window.location.href = "/pages/login.html";
    return null;
  }
  return { user, accessToken };
}

/** Update localStorage with new user data */
export function updateLocalUserData(updatedData) {
  localStorage.setItem("user", JSON.stringify(updatedData));
}
