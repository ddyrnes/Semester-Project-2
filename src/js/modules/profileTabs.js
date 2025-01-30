document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Remove active styles from all buttons
  function setActiveTab(tabId) {
    tabButtons.forEach((btn) => {
      btn.classList.remove("bg-primary", "text-primaryText", "border-primary", "font-bold");
      btn.classList.add("text-dark", "border-transparent");
    });

    tabContents.forEach((content) => content.classList.add("hidden"));

    // Set active button styles
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (activeButton) {
      activeButton.classList.add("bg-primary", "text-primaryText", "border-primary", "font-bold");
      activeButton.classList.remove("text-dark", "border-transparent");
    }

    // Show active content
    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.remove("hidden");
  }

  // Default to first tab (My Profile)
  setActiveTab("profile");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTab = button.getAttribute("data-tab");
      setActiveTab(selectedTab);
    });
  });
});
