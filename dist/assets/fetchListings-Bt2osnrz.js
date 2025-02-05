import { L as a, P as n } from "./input-BhcJG2o-.js";
const h = "0e8a6b36-9222-4b91-9148-9d6ecef750fe";
async function u({ type: c, username: e = "", listingId: f = "", query: i = "" }) {
  if (!c) throw new Error("A 'type' parameter is required.");
  let r = a.ALL,
    t = !1;
  switch (c) {
    case "my-listings":
      if (!e) throw new Error("Username is required for fetching user listings.");
      (r = n.LISTINGS(e)), (t = !0);
      break;
    case "my-bids":
      if (!e) throw new Error("Username is required for fetching user bids.");
      (r = `${n.BIDS(e)}?_listings=true&_listings_seller=true`), (t = !0);
      break;
    case "my-current-auctions":
      if (!e) throw new Error("Username is required for fetching active auctions.");
      (r = `${n.LISTINGS(e)}?_active=true`), (t = !0);
      break;
    case "my-collection":
      if (!e) throw new Error("Username is required for fetching won auctions.");
      (r = n.WINS(e)), (t = !0);
      break;
    case "single-listing": {
      if (!f) throw new Error("Listing ID is required for fetching a single listing.");
      r = a.SINGLE(f);
      const o = i ? `?${i}` : "";
      r += o;
      break;
    }
    case "search":
      if (!i) throw new Error("A search query is required.");
      r = a.SEARCH(i);
      break;
    case "all-listings":
      r = `${a.ALL}?_active=true&_seller=true`;
      break;
    default:
      throw new Error(`Invalid listing type: ${c}`);
  }
  const w = { "Content-Type": "application/json" };
  if (t) {
    const o = localStorage.getItem("accessToken");
    if (!o) throw new Error("Authentication required. Please log in.");
    (w.Authorization = `Bearer ${o}`), (w["X-Noroff-API-Key"] = h);
  }
  const s = await fetch(r, { headers: w });
  if (!s.ok)
    switch (s.status) {
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
        throw new Error(`Unexpected error: ${s.statusText}`);
    }
  return await s.json();
}
export { h as A, u as f };
