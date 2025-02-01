import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";
import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";

// console.log("LocalStorage Contents:");
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   console.log(`${key}:`, localStorage.getItem(key));
// }

// Get the user data string from local storage and parse it to an object
// const userData = localStorage.getItem("user");
// console.log(userData);
// const accessToken = localStorage.getItem("accessToken");
// const userObject = JSON.parse(userData);
// console.log(userObject);
// console.log(userObject.accessToken);

// if (userObject) {
//   // Check if the 'data' and 'name' properties exist before logging
//   if (accessToken && userObject.name) {
//     console.log(`Username is = ${userObject.name}`);
//     console.log(`Access Token is = ${accessToken}`);
//   } else {
//     console.log("User data does not contain a name.");
//   }
// } else {
//   console.log("No user data found in local storage.");
// }

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
