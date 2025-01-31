import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);
});
