import { PROFILES } from "../../../api/apiEndpoints.js";
import { getUserData, updateLocalUserData } from "./storage.js";
import { API_KEY } from "../../../api/apiKey.js";
export async function fetchProfileData() {
  const userData = getUserData();
  if (!userData) return;
  const { name: userName, accessToken } = userData;
  const usernameElement = document.querySelector("#profileUsername");
  const balanceElement = document.querySelector("#profileBalance");
  const avatarElement = document.querySelector("#profileAvatar");

  try {
    const response = await fetch(PROFILES.SINGLE(userName), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to fetch profile.");

    // Update UI
    usernameElement.textContent = data.data.name;
    balanceElement.textContent = data.data.credits;
    avatarElement.src = data.data.avatar.url;
    avatarElement.alt = data.data.avatar.alt;

    updateLocalUserData(data.data);
  } catch {
    return;
  }
}
