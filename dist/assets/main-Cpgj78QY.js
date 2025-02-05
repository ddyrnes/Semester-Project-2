import "./input-BhcJG2o-.js";
import { f as i } from "./fetchAllAuctions-Df6dsF-c.js";
import { l as r, c } from "./renderAuctionCard--FsWgia8.js";
import "./fetchListings-Bt2osnrz.js";
async function s() {
  const n = document.querySelector("#auctions-container");
  if (!n) return;
  await r();
  const o = await i();
  if (!o || o.length === 0) {
    n.innerHTML = "<p class='text-center col-span-full'>Couldn't load auctions right now. Please try again later.</p>";
    return;
  }
  const a = o
    .filter((t) => t.endsAt)
    .sort((t, e) => new Date(t.endsAt) - new Date(e.endsAt))
    .slice(0, 6);
  if (((n.innerHTML = ""), a.length === 0)) {
    n.innerHTML = "<p class='text-center col-span-full'>No auctions ending soon.</p>";
    return;
  }
  a.forEach((t) => {
    const e = c(t);
    e && n.appendChild(e);
  });
}
document.addEventListener("DOMContentLoaded", s);
