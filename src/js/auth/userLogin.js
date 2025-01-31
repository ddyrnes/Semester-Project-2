import { API_BASE_URL } from "../api/apiEndpoints.js";

// Show error messages
function showError(message) {
  const errorElement = document.querySelector("#loginError");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
  }
}

// Store user data (accessToken + user info)
function storeUserData(data) {
  // data is now data.data from the server's response in v2
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));
}

// Validate login form inputs
function validateLoginInputs(email, password) {
  if (!email || !password) {
    showError("Both fields are required.");
    return false;
  }
  return true;
}

// Login function
export async function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  if (!emailInput || !passwordInput) {
    console.error("❌ Email or password input not found.");
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // 1) Validate input
  if (!validateLoginInputs(email, password)) return;

  // 2) Make POST request to v2 endpoint
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // 3) Check if response is not OK (e.g. 400/401)
    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : "Invalid email or password.");
    }

    console.log("Login successful:", data);

    // 4) data is shaped { data: {...}, meta: {...} }
    showError(""); // Hide error messages if successful
    storeUserData(data.data); // Pass the nested "data" object

    // 5) Redirect user
    window.location.href = "/pages/profile.html";
  } catch (error) {
    console.error("Error logging in:", error.message);
    showError(error.message);
  }
}
