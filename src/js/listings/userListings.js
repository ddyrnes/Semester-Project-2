import { PROFILES } from "../api/apiEndpoints.js";

/** Fetch and log all auctions created by the logged-in user */
export async function fetchUserListings() {
  try {
    const user = JSON.parse(localStorage.getItem);
    console.log(`This is logging user from local storage: ${user}`);
    if (!user || !user.name) throw new Error("User not logged in.");

    const response = await fetch(PROFILES.LISTINGS(user.name), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await response.json();
    console.log(`User Listings for ${user.name}:`, data);
  } catch (error) {
    const accessToken = localStorage.getItem("accessToken");
    const userJSON = localStorage.getItem("user");
    console.log(userJSON);
    console.log("Token:", accessToken);
    console.error("Error fetching user listings:", error.message);
  }
}
