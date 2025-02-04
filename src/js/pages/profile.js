import "../modules/profileTabs.js";
import "../modules/nav/nav.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";
import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";
import { loadMyCurrentAuctions } from "../modules/profile/myCurrentAuctions/myCurrentAuctions.js";
import { getUserData } from "../modules/profile/myProfile/storage.js";

// Sends user to login page if they manually try to enter profile.html
const user = getUserData();
if (!user) {
  window.location.href = "/pages/login.html"; // Redirects to login if no user is found
}

// Ensure profile data loads first
document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);
});

// Load the auction template before trying to create cards
document.addEventListener("DOMContentLoaded", () => {
  loadMyCurrentAuctions();
});

const createAuctionBtn = document.querySelector("#createAuctionBtn");
if (createAuctionBtn) {
  createAuctionBtn.addEventListener("click", handleCreateAuction);
}
