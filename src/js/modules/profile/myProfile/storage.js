/** Get user details from localStorage */
export function getUserData() {
  const userString = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  // If either value is missing, redirect to login.
  if (!userString || !accessToken) {
    // window.location.href = "/pages/login.html";
    return null;
  }

  try {
    const userData = JSON.parse(userString);
    return { ...userData, accessToken }; // Return merged user data with token
  } catch (error) {
    console.error("Failed to parse user data:", error);
    // window.location.href = "/pages/login.html";
    return null;
  }
}

/** Update localStorage with new user data */
export function updateLocalUserData(updatedData) {
  if (!updatedData) return;

  // 1) Get the old data from localStorage (if any)
  const oldUserData = JSON.parse(localStorage.getItem("user")) || {};

  // 2) Merge the new fields with the old data
  const mergedUserData = {
    ...oldUserData, // keep old data
    ...updatedData, // overwrite with any new fields
    avatar: updatedData.avatar || oldUserData.avatar || {}, // ensure avatar is at least {}
    banner: updatedData.banner || oldUserData.banner || {},
    credits: updatedData.credits ?? oldUserData.credits ?? 0,
    _count: updatedData._count || oldUserData._count || { listings: 0, wins: 0 },
  };

  // 3) Save merged data back to localStorage
  localStorage.setItem("user", JSON.stringify(mergedUserData));
}
