import { fetchListings } from "../../api/fetchListings";

/** Fetch all auctions */
export async function fetchAllAuctions() {
  try {
    const response = await fetchListings({ type: "all-listings", query: "_seller=true" });
    if (!response || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn("No auctions found or invalid response.");
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
}
