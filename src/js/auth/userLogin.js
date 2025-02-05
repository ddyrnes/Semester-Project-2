import { API_BASE_URL } from "../api/apiEndpoints.js";

function showError(message) {
  const errorElement = document.querySelector("#loginError");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
  }
}

function storeUserData(data) {
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
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!validateLoginInputs(email, password)) return;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

    showError("");
    storeUserData(data.data);

    window.location.href = "/pages/profile.html";
  } catch {
    return;
  }
}
