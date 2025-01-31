import { PROFILES } from "../../../api/apiEndpoints.js";
import { getUserData, updateLocalUserData } from "./storage.js";

// Fetches Profile Data
export async function fetchProfileData() {
  const userData = getUserData();
  if (!userData) return;

  const { user, accessToken } = userData;
  const usernameElement = document.querySelector("#profileUsername");
  const balanceElement = document.querySelector("#profileBalance");
  const avatarElement = document.querySelector("#profileAvatar");

  try {
    const response = await fetch(PROFILES.SINGLE(user.name), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to fetch profile.");

    // Update UI
    usernameElement.textContent = data.name;
    balanceElement.textContent = `$${data.credits}`;
    avatarElement.src = data.avatar || "/Images/default-avatar.jpg";

    // Update local storage with latest data
    updateLocalUserData(data);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}
