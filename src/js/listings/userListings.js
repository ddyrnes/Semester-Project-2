import { PROFILES } from "../api/apiEndpoints.js";
import { getUserData } from "../modules/profile/myProfile/storage.js";
import { API_KEY } from "../api/api.js";

/** Fetch and log all auctions created by the logged-in user */
export async function fetchUserListings() {
  try {
    // ✅ Get user data
    const userData = getUserData();
    if (!userData || !userData.name || !userData.accessToken) {
      throw new Error("User not logged in.");
    }

    console.log(`Fetching listings for: ${userData.name}`);

    const response = await fetch(PROFILES.LISTINGS(userData.name), {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", data);
      throw new Error(data.errors?.[0]?.message || "Failed to fetch user listings.");
    }

    console.log(`User Listings for ${userData.name}:`, data);
    return data; // Return the data for further use
  } catch (error) {
    console.error("Error fetching user listings:", error.message);
  }
}
