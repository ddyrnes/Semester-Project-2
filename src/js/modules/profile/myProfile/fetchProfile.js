import { PROFILES } from "../../../api/apiEndpoints.js";
import { getUserData, updateLocalUserData } from "./storage.js";
const apiKey = import.meta.env.VITE_API_KEY;
// console.log(apiKey);
// Fetches Profile Data
export async function fetchProfileData() {
  const userData = getUserData();
  // console.log(userData.data.name);
  // console.log(userData.accessToken);

  if (!userData) return;
  const {
    data: { name: userName },
    accessToken,
  } = userData;
  const usernameElement = document.querySelector("#profileUsername");
  const balanceElement = document.querySelector("#profileBalance");
  const avatarElement = document.querySelector("#profileAvatar");

  try {
    const response = await fetch(PROFILES.SINGLE(userName), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to fetch profile.");

    // Update UI
    usernameElement.textContent = data.data.name;
    balanceElement.textContent = data.data.credits;
    // avatarElement.src = data.data.avatar || "/Images/default-avatar.jpg";
    avatarElement.src = data.data.avatar.url;
    avatarElement.alt = data.data.avatar.alt;
    // Update local storage with latest data
    updateLocalUserData(data);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}
