import "./input-BhcJG2o-.js";
import { f } from "./fetchAllAuctions-Df6dsF-c.js";
import { l as h, c as m } from "./renderAuctionCard--FsWgia8.js";
import "./fetchListings-Bt2osnrz.js";
let l = [],
  i = 0;
const d = 10;
async function s(e = null, n = !1) {
  const t = document.querySelector("#auctions-container"),
    c = document.querySelector("#load-more-btn");
  if (!t) return;
  await h(), !e && l.length === 0 && (l = await f()), n && (i = 0), e || (e = l);
  const r = e.slice(0, i + d);
  if (((t.innerHTML = ""), r.length === 0)) {
    t.innerHTML = "<p class='text-center col-span-full text-dark'>No auctions found matching your search.</p>";
    return;
  }
  r.forEach((o) => {
    const a = m(o);
    a && t.appendChild(a);
  }),
    (i += d),
    i >= e.length ? (c.style.display = "none") : (c.style.display = "block");
}
function p() {
  const e = document.querySelector("#load-more-btn");
  if (!e) {
    console.error("Load More button not found.");
    return;
  }
  e.addEventListener("click", () => {
    s();
  });
}
function y(e, n) {
  return Array.isArray(e)
    ? e.filter((t) => t.title.toLowerCase().includes(n) || (t.description && t.description.toLowerCase().includes(n)))
    : [];
}
function u(e, n) {
  n ? e.classList.remove("hidden") : e.classList.add("hidden");
}
function L(e, n) {
  (e.value = ""), u(n, ""), s(null, !0);
}
async function C() {
  const e = document.querySelector("#search-bar"),
    n = document.querySelector("#search-button"),
    t = document.querySelector("#clear-search-icon");
  if (!e || !n || !t) return;
  let c = await f();
  function r() {
    const o = e.value.trim().toLowerCase(),
      a = y(c, o);
    s(a), u(t, o);
  }
  e.addEventListener("input", () => u(t, e.value.trim())),
    n.addEventListener("click", r),
    e.addEventListener("keypress", (o) => {
      o.key === "Enter" && r();
    }),
    t.addEventListener("click", () => L(e, t));
}
document.addEventListener("DOMContentLoaded", async () => {
  await s(), p(), C();
});
