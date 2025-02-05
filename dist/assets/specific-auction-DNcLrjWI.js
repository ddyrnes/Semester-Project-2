import { g as h, L as b } from "./input-BhcJG2o-.js";
import { f as p, A as y } from "./fetchListings-Bt2osnrz.js";
async function w(e) {
  try {
    const t = await p({ type: "single-listing", listingId: e, query: "_seller=true&_bids=true" });
    if (!t || !t.data) throw new Error("Auction not found.");
    return t.data;
  } catch (t) {
    throw (console.error("Error fetching auction:", t), t);
  }
}
function S(e) {
  var i, a, s, m, f;
  (document.querySelector("#auction-title").textContent = e.title),
    (document.querySelector("#auction-description").textContent = e.description || "No description available."),
    (document.querySelector("#seller-name").textContent =
      ((i = e.seller) == null ? void 0 : i.name) || "Unknown Seller"),
    (document.querySelector("#seller-avatar").src =
      ((s = (a = e.seller) == null ? void 0 : a.avatar) == null ? void 0 : s.url) || "/Icons/User.png"),
    (document.querySelector("#auction-end").textContent = new Date(e.endsAt).toLocaleString());
  const t = ((m = e.bids) == null ? void 0 : m.length) || 0;
  document.querySelector("#total-bids").textContent = t;
  let n = 0,
    o = "No bids yet";
  if (e.bids && e.bids.length > 0) {
    n = Math.max(...e.bids.map((d) => d.amount));
    const l = e.bids.find((d) => d.amount === n);
    o = ((f = l == null ? void 0 : l.bidder) == null ? void 0 : f.name) || "Unknown";
  }
  (document.querySelector("#current-bid").textContent = n), (document.querySelector("#highest-bidder").textContent = o);
  const r = document.querySelector("#auction-image");
  e.media && e.media.length > 0
    ? ((r.src = e.media[0].url), (r.alt = e.media[0].alt || "Auction Image"))
    : ((r.src = "/images/placeholder.jpg"), (r.alt = "No image available"));
}
async function x() {
  const t = new URLSearchParams(window.location.search).get("id");
  if (!t) {
    document.querySelector("main").innerHTML = "<p class='text-center text-dark'>Auction not found.</p>";
    return;
  }
  try {
    const n = await w(t);
    S(n);
  } catch (n) {
    console.error("Error loading auction:", n),
      (document.querySelector("main").innerHTML = "<p class='text-center text-dark'>Error loading auction.</p>");
  }
}
function B() {
  const e = document.querySelector("#place-bid-btn");
  if (!e) return;
  h()
    ? (console.log("User is logged inn"),
      (e.disabled = !1),
      e.classList.remove("opacity-50", "cursor-not-allowed"),
      (e.textContent = "Place Bid"))
    : ((e.disabled = !0),
      e.classList.add("opacity-50", "cursor-not-allowed"),
      (e.textContent = "Log in to Place Bid"),
      console.log("User is not logged inn"));
}
async function A(e, t = "GET", n = null, o = null) {
  const r = { "Content-Type": "application/json", "X-Noroff-API-Key": y };
  o && (r.Authorization = `Bearer ${o}`);
  const i = await fetch(e, { method: t, headers: r, body: n ? JSON.stringify(n) : null });
  if (!i.ok) {
    const a = await i.json();
    throw new Error(a.message || "An error occurred");
  }
  return await i.json();
}
let u;
function c(e, t) {
  const n = document.getElementById("bid-feedback");
  n &&
    ((n.innerHTML = e),
    (n.className = `text-sm h-[20px] ${t === "error" ? "text-red-500" : "text-green-500"}`),
    u && clearTimeout(u),
    (u = setTimeout(
      () => {
        n.innerHTML = "";
      },
      t === "success" ? 5e3 : 3e3,
    )));
}
function L() {
  return new URLSearchParams(window.location.search).get("id");
}
async function g() {
  const e = document.getElementById("bid-amount");
  if (!e) return;
  const t = parseFloat(e.value);
  if (isNaN(t) || t <= 0) {
    c("❌ Please enter a valid bid amount greater than 0.", "error");
    return;
  }
  const n = document.getElementById("current-bid"),
    o = n && n.textContent !== "-" ? parseFloat(n.textContent) : 0;
  if (t <= o) {
    c(`❌ Your bid must be higher than the current highest bid of ${o}.`, "error");
    return;
  }
  const r = h();
  if (!r || !r.accessToken) {
    c("❌ Authentication error: You must be logged in to place a bid.", "error");
    return;
  }
  const i = L(),
    a = b.BID(i);
  try {
    await A(a, "POST", { amount: t }, r.accessToken),
      c(
        `✅ Your bid of ${t} was placed successfully! You can view your bids on <a href="/profile.html">your profile</a>.`,
        "success",
      ),
      (e.value = ""),
      setTimeout(() => {
        location.reload();
      }, 5e3);
  } catch (s) {
    c(s.message || "❌ An error occurred while placing your bid. Please try again.", "error");
  }
}
function I() {
  const e = document.getElementById("place-bid-btn");
  e && (e.removeEventListener("click", g), e.addEventListener("click", g));
}
async function E() {
  await x(), B(), I();
}
document.addEventListener("DOMContentLoaded", E);
