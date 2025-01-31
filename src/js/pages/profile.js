import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);
});

// For testing purpose, delete later
import { fetchAllListings } from "../listings/listings.js";
import { fetchUserListings } from "../listings/userListings.js";

fetchAllListings();
fetchUserListings();

import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";

document.addEventListener("DOMContentLoaded", () => {
  const createAuctionBtn = document.querySelector("#createAuctionBtn");
  if (createAuctionBtn) {
    createAuctionBtn.addEventListener("click", handleCreateAuction);
  }
});
