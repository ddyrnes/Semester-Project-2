import { getUserData } from "../profile/myProfile/storage";

export function updateNavAvatar() {
  const user = getUserData(); // Get user data from localStorage

  const usernameElement = document.querySelector("#navbarUsername");
  const usernameElementMobile = document.querySelector("#navbarUsernameMobile");
  const avatarElement = document.querySelector("#navbarAvatar");
  const avatarElementMobile = document.querySelector("#navbarAvatarMobile");

  if (user) {
    if (usernameElement) usernameElement.textContent = user.name;
    if (usernameElementMobile) usernameElementMobile.textContent = user.name;

    if (user.avatar && user.avatar.url) {
      if (avatarElement) {
        avatarElement.src = user.avatar.url;
        avatarElement.alt = `${user.name}'s Avatar`;
      }
      if (avatarElementMobile) {
        avatarElementMobile.src = user.avatar.url;
        avatarElementMobile.alt = `${user.name}'s Avatar`;
      }
    }
  }
}
