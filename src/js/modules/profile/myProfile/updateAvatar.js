import { PROFILES } from "../../../api/apiEndpoints.js";
import { getUserData, updateLocalUserData } from "./storage.js";

export async function updateAvatar(event) {
  event.preventDefault();
  const avatarUrlInput = document.querySelector("#avatarUrl");
  const avatarError = document.querySelector("#avatarError");
  const avatarElement = document.querySelector("#profileAvatar");
  const newAvatarUrl = avatarUrlInput.value.trim();

  if (!newAvatarUrl) return;

  const userData = getUserData();
  if (!userData) return;
  const { user, accessToken } = userData;

  try {
    const response = await fetch(`${PROFILES.UPDATE(user.name)}/media`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to update avatar.");

    // Update UI & Local Storage
    avatarElement.src = newAvatarUrl;
    user.avatar = newAvatarUrl; // Store as string, since API only returns a URL
    updateLocalUserData(user);

    avatarError.classList.add("hidden");
  } catch (error) {
    console.error("❌ Error updating avatar:", error.message);
    avatarError.textContent = error.message;
    avatarError.classList.remove("hidden");
  }
}
