// Base API URL
export const API_BASE_URL = "https://api.noroff.dev/api/v1/auction";

// Authentication Endpoints
export const AUTH = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
};

// Auction Listings Endpoints
export const LISTINGS = {
  ALL: `${API_BASE_URL}/listings`,
  SINGLE: (id) => `${API_BASE_URL}/listings/${id}`,
  CREATE: `${API_BASE_URL}/listings`,
  UPDATE: (id) => `${API_BASE_URL}/listings/${id}`,
  DELETE: (id) => `${API_BASE_URL}/listings/${id}`,
  BID: (id) => `${API_BASE_URL}/listings/${id}/bids`,
  SEARCH: (query) => `${API_BASE_URL}/listings/search?q=${query}`,
};

// User Profile Endpoints
export const PROFILES = {
  ALL: `${API_BASE_URL}/profiles`,
  SINGLE: (name) => `${API_BASE_URL}/profiles/${name}`,
  UPDATE: (name) => `${API_BASE_URL}/profiles/${name}`,
  LISTINGS: (name) => `${API_BASE_URL}/profiles/${name}/listings`,
  BIDS: (name) => `${API_BASE_URL}/profiles/${name}/bids`,
  WINS: (name) => `${API_BASE_URL}/profiles/${name}/wins`,
  SEARCH: (query) => `${API_BASE_URL}/profiles/search?q=${query}`,
};
