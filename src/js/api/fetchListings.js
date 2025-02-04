// fetchListings - A reusable function to fetch auction listings.
//
// This function supports fetching:
// - All active listings
// - Listings created by a user (Requires authentication)
// - Listings a user has bid on (Requires authentication)
// - Listings a user has won (Requires authentication)
// - A single listing by ID
// - Search results based on a query
//
// Authentication:
// - Endpoints related to a specific user require an access token and an API key.
// - The API key is imported from /apiKey
// - The access token is stored in localStorage if the user is logged in.
//
// Usage examples can be found at the bottom of this file.

import { LISTINGS, PROFILES } from "./apiEndpoints";
import { API_KEY } from "./apiKey";

export async function fetchListings({ type, username = "", listingId = "", query = "" }) {
  try {
    if (!type) throw new Error("A 'type' parameter is required.");

    let url = LISTINGS.ALL; // Default: fetch all listings
    let requiresAuth = false; // Tracks if auth headers are needed
    switch (type) {
      case "my-listings":
        if (!username) throw new Error("Username is required for fetching user listings.");
        url = PROFILES.LISTINGS(username);
        requiresAuth = true;
        break;
      case "my-bids":
        if (!username) throw new Error("Username is required for fetching user bids.");
        url = `${PROFILES.BIDS(username)}?_listings=true`;
        requiresAuth = true;
        break;
      case "my-current-auctions":
        if (!username) throw new Error("Username is required for fetching active auctions.");
        url = `${PROFILES.LISTINGS(username)}?_active=true`;
        requiresAuth = true;
        break;
      case "my-collection":
        if (!username) throw new Error("Username is required for fetching won auctions.");
        url = PROFILES.WINS(username);
        requiresAuth = true;
        break;
      case "single-listing": {
        if (!listingId) throw new Error("Listing ID is required for fetching a single listing.");
        url = LISTINGS.SINGLE(listingId);
        const queryParams = query ? `?${query}` : "";
        url += queryParams;
        break;
      }

      case "search":
        if (!query) throw new Error("A search query is required.");
        url = LISTINGS.SEARCH(query);
        break;
      case "all-listings":
        url = `${LISTINGS.ALL}?_active=true&_seller=true`; // ✅ Fetch active listings WITH seller data
        break;

      default:
        throw new Error(`Invalid listing type: ${type}`);
    }

    // Authentication Headers
    const headers = { "Content-Type": "application/json" };
    if (requiresAuth) {
      const accessToken = localStorage.getItem("accessToken"); // Get token from storage
      if (!accessToken) throw new Error("Authentication required. Please log in.");

      headers.Authorization = `Bearer ${accessToken}`;
      headers["X-Noroff-API-Key"] = API_KEY; // Use API key from config
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Bad request. Please check your parameters.");
        case 401:
          throw new Error("Unauthorized. Please log in.");
        case 403:
          throw new Error("Forbidden. You don't have permission.");
        case 404:
          throw new Error("Data not found.");
        case 500:
          throw new Error("Server error. Try again later.");
        default:
          throw new Error(`Unexpected error: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error (${type}):`, error.message);
    return null;
  }
}

// Usage Examples

// Fetch All Active Listings
// const listings = await fetchListings({ type: "all-listings" });

// Fetch My Listings (Requires Authentication)
// const myListings = await fetchListings({ type: "my-listings", username: "myUsername" });

// Fetch My Bids (Requires Authentication)
// const myBids = await fetchListings({ type: "my-bids", username: "myUsername" });

// Fetch My Won Auctions (Requires Authentication)
// const myCollection = await fetchListings({ type: "my-collection", username: "myUsername" });

// Fetch a Single Listing
// const listing = await fetchListings({ type: "single-listing", listingId: "12345" });

// Search Listings
// const searchResults = await fetchListings({ type: "search", query: "vintage bike" });
