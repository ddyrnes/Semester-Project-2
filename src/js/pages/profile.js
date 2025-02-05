import "../modules/profileTabs.js";
import "../modules/nav/nav.js";

import { getUserData } from "../modules/profile/myProfile/storage.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";

import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";
import { loadMyCurrentAuctions } from "../modules/profile/myCurrentAuctions/myCurrentAuctions.js";
import { loadMyBids } from "../modules/profile/myBids/loadMyBids.js";
import { loadMyCollection } from "../modules/profile/myCollection/loadMyCollection.js";

const user = getUserData();
if (!user) {
  window.location.href = "/pages/login.html"; // Redirect to login if no user is found
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);

  loadMyCurrentAuctions();
  loadMyCollection();
  loadMyBids();

  const createAuctionBtn = document.querySelector("#createAuctionBtn");
  if (createAuctionBtn) {
    createAuctionBtn.addEventListener("click", handleCreateAuction);
  }
});
