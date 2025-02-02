import { PROFILES } from "../../../api/apiEndpoints.js";
import { getUserData, updateLocalUserData } from "./storage.js";
import { API_KEY } from "../../../api/apiKey.js";

export async function updateAvatar(event) {
  event.preventDefault();

  // Get DOM elements
  const avatarUrlInput = document.querySelector("#avatarUrl");
  const avatarError = document.querySelector("#avatarError");
  const avatarElement = document.querySelector("#profileAvatar");

  // Validate input
  const newAvatarUrl = avatarUrlInput.value.trim();
  if (!newAvatarUrl) return;

  // Get stored user data
  const userData = getUserData();
  if (!userData) return;
  // // Destructure username and access token from userData
  // const {data: { name: userName },accessToken,} = userData;
  const { name: userName, accessToken } = userData;

  // Build the request avatarUpdate as a JSON string
  const avatarUpdate = JSON.stringify({
    avatar: {
      url: newAvatarUrl,
      alt: `${userName}'s avatar picture`,
    },
  });

  try {
    const response = await fetch(`${PROFILES.UPDATE(userName)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: avatarUpdate,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to update avatar.");
    }

    // Update the avatar element with the new data from the API
    avatarElement.src = data.data.avatar.url;
    avatarElement.alt = data.data.avatar.alt;

    // Update local storage with the new profile data
    updateLocalUserData(data);

    // Hide any previous error message
    avatarError.classList.add("hidden");
  } catch (error) {
    console.error("❌ Error updating avatar:", error.message);
    avatarError.textContent = error.message;
    avatarError.classList.remove("hidden");
  }
}
