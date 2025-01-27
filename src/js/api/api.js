console.log("test");
export const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.noroff.dev/api/v1";

if (!API_KEY) {
  console.error("❌ API key is missing. Make sure .env is properly configured.");
} else {
  console.log("✅ API Key Loaded:", API_KEY);
}
console.log("My API_KEY:", API_KEY);

// Testing login & register. Will move functions into seperate files later

export async function getAuctionListings() {
  try {
    const response = await fetch(`${API_BASE_URL}/auction/listings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch listings");
    }

    console.log("✅ Auction Listings:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching listings:", error);
  }
}
// getAuctionListings();

const loginData = {
  email: "dandyr77157@stud.noroff.no",
  password: "pizp7549",
};

export async function loginUser(loginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auction/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    // console.log("🔍 Full Response Object:", response); // Logs the entire response object
    // console.log("📦 Full Response Data:", data); // Logs the full parsed response body
    const token = data.accessToken;
    console.log(`This is the accessToken ${token}`);

    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : "Login failed");
    }

    return data; // Return full data for further testing
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
  }
}
loginUser(loginData).then((data) => {
  if (data) {
    console.log("✅ Login Success:", data);
  } else {
    console.error("❌ No data received.");
  }
});

// REGISTRATION COMPLETED
// const userData = {
//   name: "danield", // Username (no special characters except _)
//   email: "dandyr77157@stud.noroff.no", // Your student email
//   password: "pizp7549", // Must be at least 8 characters
// };

// export async function registerUser(userData) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auction/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("❌ API Response Error:", data);
//       throw new Error(data.errors ? data.errors[0].message : "Registration failed");
//     }

//     console.log("✅ Registration successful:", data);
//     return data; // Contains user info
//   } catch (error) {
//     console.error("❌ Error registering user:", error.message);
//   }
// }

// registerUser(userData).then((data) => {
//   if (data) {
//     console.log("🎉 Your account has been created! Now try logging in.");
//   }
// });
