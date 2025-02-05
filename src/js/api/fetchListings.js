import { LISTINGS, PROFILES } from "./apiEndpoints";
import { API_KEY } from "./apiKey";

/**
 * Fetches auction listings based on the specified type.
 *
 * This function supports fetching:
 * - All active listings
 * - Listings created by a user (Requires authentication)
 * - Listings a user has bid on (Requires authentication)
 * - Listings a user has won (Requires authentication)
 * - A single listing by ID
 * - Search results based on a query
 *
 * **Authentication:**
 * Endpoints related to a specific user require an access token and an API key.
 * - The API key is imported from `/apiKey`
 * - The access token is stored in localStorage if the user is logged in.
 *
 * @async
 * @function fetchListings
 * @param {Object} options - Options for fetching listings.
 * @param {string} options.type - The type of listing to fetch. Allowed values:
 *   - `"my-listings"`: User's own listings (requires `username`).
 *   - `"my-bids"`: Listings the user has bid on (requires `username`).
 *   - `"my-current-auctions"`: Active auctions for the user (requires `username`).
 *   - `"my-collection"`: Listings the user has won (requires `username`).
 *   - `"single-listing"`: A single listing by ID (requires `listingId`, optional `query`).
 *   - `"search"`: Search listings based on a query (requires `query`).
 *   - `"all-listings"`: Fetch all active listings including seller details.
 * @param {string} [options.username=""] - Username for user-specific listings.
 * @param {string} [options.listingId=""] - Listing ID for fetching a single listing.
 * @param {string} [options.query=""] - Search query or additional query parameters.
 * @returns {Promise<Object>} The JSON response from the fetch call.
 * @throws {Error} Throws an error if:
 *   - A required parameter is missing.
 *   - Authentication is required but no access token is found.
 *   - The fetch response is not OK (e.g., bad request, unauthorized, etc.).
 */
export async function fetchListings({ type, username = "", listingId = "", query = "" }) {
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
      url = `${PROFILES.BIDS(username)}?_listings=true&_listings_seller=true`;
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
      url = `${LISTINGS.ALL}?_active=true&_seller=true`;
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
    headers["X-Noroff-API-Key"] = API_KEY;
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
}
