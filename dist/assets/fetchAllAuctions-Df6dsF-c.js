import { f as t } from "./fetchListings-Bt2osnrz.js";
async function n() {
  try {
    const r = await t({ type: "all-listings", query: "_seller=true" });
    return !r || !Array.isArray(r.data) || r.data.length === 0
      ? (console.warn("No auctions found or invalid response."), [])
      : r.data;
  } catch (r) {
    return console.error("Error fetching auctions:", r), [];
  }
}
export { n as f };
