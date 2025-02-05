// ----------------------
// Base API URL (v2)
// ----------------------
export const API_BASE_URL = "https://v2.api.noroff.dev";

// ----------------------
// Authentication
// ----------------------
export const AUTH = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
};

// ----------------------
// Auction Listings
// https://v2.api.noroff.dev/auction/listings
// ----------------------
export const LISTINGS = {
  ALL: `${API_BASE_URL}/auction/listings`,
  SINGLE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  CREATE: `${API_BASE_URL}/auction/listings`,
  UPDATE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  DELETE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  BID: (id) => `${API_BASE_URL}/auction/listings/${id}/bids`,
  SEARCH: (query) => `${API_BASE_URL}/auction/listings/search?q=${query}`,
};

// ----------------------
// User Profiles
// https://v2.api.noroff.dev/auction/profiles
// ----------------------
export const PROFILES = {
  ALL: `${API_BASE_URL}/auction/profiles`,
  SINGLE: (name) => `${API_BASE_URL}/auction/profiles/${name}`,
  UPDATE: (name) => `${API_BASE_URL}/auction/profiles/${name}`,
  LISTINGS: (name) => `${API_BASE_URL}/auction/profiles/${name}/listings`,
  BIDS: (name) => `${API_BASE_URL}/auction/profiles/${name}/bids`,
  WINS: (name) => `${API_BASE_URL}/auction/profiles/${name}/wins`,
  SEARCH: (query) => `${API_BASE_URL}/auction/profiles/search?q=${query}`,
};
