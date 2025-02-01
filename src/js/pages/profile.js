import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";
import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";

const accessToken = localStorage.getItem("accessToken");
console.log("Access Token:", accessToken);

// Get the user data string from local storage and parse it to an object
const userString = localStorage.getItem("user");
if (userString) {
  const userObject = JSON.parse(userString);

  // Check if the 'data' and 'name' properties exist before logging
  if (userObject.data && userObject.data.name) {
    console.log("User Name:", userObject.data.name);
  } else {
    console.log("User data does not contain a name.");
  }
} else {
  console.log("No user data found in local storage.");
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);
});

// For testing purpose, delete later
// import { fetchAllListings } from "../listings/listings.js";
// import { fetchUserListings } from "../listings/userListings.js";

// fetchAllListings();
// fetchUserListings();
const createAuctionBtn = document.querySelector("#createAuctionBtn");
if (createAuctionBtn) {
  createAuctionBtn.addEventListener("click", handleCreateAuction);
}
