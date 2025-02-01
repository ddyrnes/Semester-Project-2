/** Get user details from localStorage */
export function getUserData() {
  const userString = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  // If either value is missing, redirect to login.
  if (!userString || !accessToken) {
    window.location.href = "/pages/login.html";
    return null;
  }

  let userData;
  try {
    userData = JSON.parse(userString);
  } catch (error) {
    console.error("Failed to parse user data:", error);
    window.location.href = "/pages/login.html";
    return null;
  }

  // Merge everything from userData with the accessToken into one object.
  return { ...userData, accessToken };
}

/** Update localStorage with new user data */
export function updateLocalUserData(updatedData) {
  localStorage.setItem("user", JSON.stringify(updatedData));
}
