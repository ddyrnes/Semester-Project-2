export function navUserExist() {
  const user = JSON.parse(localStorage.getItem("user"));

  const registerLink = document.getElementById("registerLink");
  const loginLink = document.getElementById("loginLink");
  const profileLink = document.getElementById("profileLink");
  const logoutBtn = document.getElementById("logoutBtn");

  const registerLinkMobile = document.getElementById("registerLinkMobile");
  const loginLinkMobile = document.getElementById("loginLinkMobile");
  const profileLinkMobile = document.getElementById("profileLinkMobile");
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");

  const totalBalanceDesktop = document.getElementById("totalBalanceDesktop");
  const totalBalanceContent = document.getElementById("totalBalanceContent");
  const totalBalanceMobile = document.getElementById("totalBalanceMobile");
  const balanceDisplayDesktop = document.getElementById("desktopBalance");
  const balanceDisplayMobile = document.getElementById("mobileBalance");

  if (user) {
    // Show Profile & Logout, Hide Register & Login
    profileLink.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    profileLinkMobile.classList.remove("hidden");
    logoutBtnMobile.classList.remove("hidden");

    registerLink.classList.add("hidden");
    loginLink.classList.add("hidden");
    registerLinkMobile.classList.add("hidden");
    loginLinkMobile.classList.add("hidden");

    // Show Total Balance
    if (user.credits !== undefined) {
      totalBalanceDesktop.classList.remove("hidden");
      totalBalanceContent.classList.remove("hidden");
      totalBalanceMobile.classList.remove("hidden");
      balanceDisplayDesktop.textContent = `$${user.credits}`;
      balanceDisplayMobile.textContent = `$${user.credits}`;
    }

    // 🔹 Hide desktop balance if screen is smaller than 1024px
    if (window.innerWidth < 1024) {
      totalBalanceDesktop.classList.add("hidden");
    }
  } else {
    // Show Register & Login, Hide Profile & Logout
    profileLink.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    profileLinkMobile.classList.add("hidden");
    logoutBtnMobile.classList.add("hidden");

    registerLink.classList.remove("hidden");
    loginLink.classList.remove("hidden");
    registerLinkMobile.classList.remove("hidden");
    loginLinkMobile.classList.remove("hidden");

    // Hide Total Balance
    totalBalanceDesktop.classList.add("hidden");
    totalBalanceContent.classList.add("hidden");
    totalBalanceMobile.classList.add("hidden");
  }
}
