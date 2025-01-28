import { API_BASE_URL } from "../api/apiEndpoints.js";

// Helper function to show error messages
function showError(message) {
  const errorElement = document.querySelector("#loginError");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
  }
}

// Helper function to store user data
function storeUserData(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));
}

// Function to validate form inputs
function validateLoginInputs(email, password) {
  if (!email || !password) {
    showError("Both fields are required.");
    return false;
  }
  return true;
}

// Main Login Function
export async function handleLogin(event) {
  event.preventDefault(); // Prevent default form submission

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  if (!emailInput || !passwordInput) {
    console.error("❌ Email or password input not found.");
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate inputs before making API call
  if (!validateLoginInputs(email, password)) return;

  try {
    const response = await fetch(`${API_BASE_URL}/auction/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : "Invalid email or password.");
    }

    console.log("✅ Login successful:", data);
    showError(""); // Hide error message if login is successful
    storeUserData(data); // Store user data

    // Redirect to profile page
    window.location.href = "/pages/profile.html";
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
    showError(error.message);
  }
}
