import { LISTINGS } from "../api/apiEndpoints.js";

/** Fetch and log all auctions */
export async function fetchAllListings() {
  try {
    const response = await fetch(LISTINGS.ALL);
    const data = await response.json();

    console.log("All Listings:", data);
  } catch (error) {
    console.error("Error fetching listings:", error.message);
  }
}
