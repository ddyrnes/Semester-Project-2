import "../modules/profileTabs.js";
import { PROFILES } from "../api/apiEndpoints.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  if (!user || !accessToken) {
    window.location.href = "/pages/login.html";
    return;
  }

  // Select elements
  const usernameElement = document.querySelector("#profileUsername");
  const balanceElement = document.querySelector("#profileBalance");
  const avatarElement = document.querySelector("#profileAvatar");
  const avatarForm = document.querySelector("#updateAvatarForm");
  const avatarUrlInput = document.querySelector("#avatarUrl");
  const avatarError = document.querySelector("#avatarError");

  /** Fetch and Display Profile Data */
  async function fetchProfileData() {
    try {
      const response = await fetch(PROFILES.SINGLE(user.name), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.json();
      console.log("Profile Data:", data);
      console.log(data.avatar);
      console.log(data);

      if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to fetch profile.");

      usernameElement.textContent = data.name;
      balanceElement.textContent = `$${data.credits}`;
      avatarElement.src = data.avatar;
    } catch (error) {
      console.error("❌ Error fetching profile:", error.message);
    }
  }

  /** Update Avatar Function */
  async function updateAvatar(event) {
    event.preventDefault();
    const newAvatarUrl = avatarUrlInput.value.trim();
    if (!newAvatarUrl) return;

    try {
      console.log(`${PROFILES.UPDATE(user.name)}/media`);
      // https://api.noroff.dev/api/v1/auction/profiles/danield/media
      const response = await fetch(`${PROFILES.UPDATE(user.name)}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          avatar: newAvatarUrl,
        }),
      });
      console.log(" Raw Response:", response);

      const data = await response.json();
      console.log("TEST DATA", data);
      console.log("Avatar Updated:", data);

      if (!response.ok) throw new Error(data.errors?.[0]?.message || "Failed to update avatar.");

      // Update UI and localStorage
      avatarElement.src = newAvatarUrl;
      user.avatar = { url: newAvatarUrl, alt: `${user.name}'s avatar` };
      localStorage.setItem("user", JSON.stringify(user));

      avatarError.classList.add("hidden");
    } catch (error) {
      console.error("❌ Error updating avatar:", error.message);
      avatarError.textContent = error.message;
      avatarError.classList.remove("hidden");
    }
  }

  /** ✅ Initialize Page */
  await fetchProfileData();
  avatarForm.addEventListener("submit", updateAvatar);
});
