// Will delete before finished product. Checking if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  if (user && token) {
    console.log("✅ User is logged in:", user);
    console.log("🔑 Access Token:", token);
  } else {
    console.log("❌ No user logged in.");
  }
});
