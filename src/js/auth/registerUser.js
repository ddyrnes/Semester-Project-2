import { AUTH } from "../api/apiEndpoints";

export async function handleRegister() {
  event.preventDefault();
  const nameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const errorElement = document.querySelector("#registerError");

  if (!nameInput || !emailInput || !passwordInput) {
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name || !email || !password) {
    if (errorElement) {
      errorElement.textContent = "All fields are required.";
      errorElement.classList.remove("hidden");
    }
    return;
  }

  try {
    const response = await fetch(AUTH.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : "Registration failed");
    }

    if (errorElement) {
      errorElement.classList.add("hidden");
    }

    // Redirect to login after successful registration
    setTimeout(() => {
      window.location.href = "/pages/login.html";
    }, 1500);
  } catch (error) {
    if (errorElement) {
      errorElement.textContent = error.message;
      errorElement.classList.remove("hidden");
    }
  }
}
