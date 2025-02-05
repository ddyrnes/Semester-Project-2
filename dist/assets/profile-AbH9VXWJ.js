import { g as h, P as B, u as x, L as b } from "./input-BhcJG2o-.js";
import { A as D, f as E } from "./fetchListings-Bt2osnrz.js";
import { l as U, c as M } from "./renderAuctionCard--FsWgia8.js";
document.addEventListener("DOMContentLoaded", () => {
  const n = document.querySelectorAll(".tab-button"),
    e = document.querySelectorAll(".tab-content");
  function t(s) {
    n.forEach((i) => {
      i.classList.remove("bg-primary", "text-primaryText", "border-primary", "font-bold"),
        i.classList.add("text-dark", "border-transparent");
    }),
      e.forEach((i) => i.classList.add("hidden"));
    const r = document.querySelector(`.tab-button[data-tab="${s}"]`);
    r &&
      (r.classList.add("bg-primary", "text-primaryText", "border-primary", "font-bold"),
      r.classList.remove("text-dark", "border-transparent"));
    const c = document.getElementById(s);
    c && c.classList.remove("hidden");
  }
  t("profile"),
    n.forEach((s) => {
      s.addEventListener("click", () => {
        const r = s.getAttribute("data-tab");
        t(r);
      });
    });
});
async function N() {
  var i, u;
  const n = h();
  if (!n) return;
  const { name: e, accessToken: t } = n,
    s = document.querySelector("#profileUsername"),
    r = document.querySelector("#profileBalance"),
    c = document.querySelector("#profileAvatar");
  try {
    const d = await fetch(B.SINGLE(e), { headers: { Authorization: `Bearer ${t}`, "X-Noroff-API-Key": D } }),
      l = await d.json();
    if (!d.ok)
      throw new Error(
        ((u = (i = l.errors) == null ? void 0 : i[0]) == null ? void 0 : u.message) || "Failed to fetch profile.",
      );
    (s.textContent = l.data.name),
      (r.textContent = l.data.credits),
      (c.src = l.data.avatar.url),
      (c.alt = l.data.avatar.alt),
      x(l.data);
  } catch (d) {
    console.error("Error fetching profile:", d.message);
  }
}
async function k(n) {
  var l, p;
  n.preventDefault();
  const e = document.querySelector("#avatarUrl"),
    t = document.querySelector("#avatarError"),
    s = document.querySelector("#profileAvatar"),
    r = e.value.trim();
  if (!r) return;
  const c = h();
  if (!c) return;
  const { name: i, accessToken: u } = c,
    d = JSON.stringify({ avatar: { url: r, alt: `${i}'s avatar picture` } });
  try {
    const a = await fetch(`${B.UPDATE(i)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${u}`, "X-Noroff-API-Key": D },
        body: d,
      }),
      o = await a.json();
    if (!a.ok)
      throw new Error(
        ((p = (l = o.errors) == null ? void 0 : l[0]) == null ? void 0 : p.message) || "Failed to update avatar.",
      );
    (s.src = o.data.avatar.url), (s.alt = o.data.avatar.alt), x(o), t.classList.add("hidden");
  } catch (a) {
    console.error("❌ Error updating avatar:", a.message), (t.textContent = a.message), t.classList.remove("hidden");
  }
}
async function P() {
  await U();
  const n = document.querySelector("#currentAuctionsContainer");
  if (!n) return;
  const e = h();
  if (!e || !e.name) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }
  const t = e.name,
    s = await E({ type: "my-current-auctions", username: t });
  if (!s || !s.data || !Array.isArray(s.data)) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }
  const r = s.data;
  if (((n.innerHTML = ""), r.length === 0)) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }
  r.forEach((c) => {
    const i = M(c, !0);
    i && n.appendChild(i);
  });
}
async function $(n) {
  var C, S, L;
  n.preventDefault(),
    console.log(b),
    console.log(b.CREATE),
    document.querySelectorAll(".auction-error").forEach((f) => f.classList.add("hidden"));
  const e = document.querySelector("#auctionTitle"),
    t = document.querySelector("#auctionDescription"),
    s = document.querySelector("#auctionTags"),
    r = document.querySelector("#auctionImage"),
    c = document.querySelector("#auctionEndDate"),
    i = e.value.trim(),
    u = t.value.trim(),
    d = s.value.trim()
      ? s.value
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean)
      : [],
    l = r.value.trim(),
    p = c.value.trim();
  let a = !1;
  if (
    (i || (A(e, "Title is required."), (a = !0)),
    l ? j(l) || (A(r, "Please enter a valid image URL."), (a = !0)) : (A(r, "Image URL is required."), (a = !0)),
    p || (A(c, "Auction end date is required."), (a = !0)),
    a)
  )
    return;
  const o = new Date(p);
  if (isNaN(o.getTime())) {
    A(c, "Invalid date format.");
    return;
  }
  const m = o.toISOString();
  console.log("📅 Converted End Date:", m);
  const q = l ? [{ url: l, alt: `Auction Image ${i}` }] : [],
    v = h();
  console.log(v);
  const w = v.accessToken,
    g = { title: i, description: u || "", tags: d, media: q, endsAt: m };
  console.log("🔹 Sending Auction Data:", JSON.stringify(g, null, 2));
  try {
    const f = await fetch(b.CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${w}`, "X-Noroff-API-Key": D },
        body: JSON.stringify(g),
      }),
      y = await f.json();
    if ((console.log("Auction Created Response:", y), !f.ok))
      throw (
        (console.error("Full API Error Response:", y),
        new Error(
          ((S = (C = y.errors) == null ? void 0 : C[0]) == null ? void 0 : S.message) || "Failed to create auction.",
        ))
      );
    alert("Auction successfully created!"),
      P(),
      (e.value = ""),
      (t.value = ""),
      (s.value = ""),
      (r.value = ""),
      (c.value = "");
  } catch (f) {
    console.error("Error creating auction:", f.message);
    const y = ((L = f.response) == null ? void 0 : L.errors) || f.message;
    console.error("Detailed API Errors:", y), alert(y);
  }
}
function A(n, e) {
  let t = n.parentNode.querySelector(".auction-error");
  t ||
    ((t = document.createElement("p")),
    (t.className = "auction-error text-red-500 text-sm absolute mt-1 left-0"),
    n.parentNode.appendChild(t)),
    (t.textContent = e),
    t.classList.remove("hidden");
}
function j(n) {
  try {
    const e = new URL(n);
    return /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i.test(e.pathname)
      ? !0
      : ["unsplash.com", "freepik.com", "imgur.com", "robohash.org"].some((r) => e.hostname.includes(r));
  } catch {
    return !1;
  }
}
async function O() {
  const n = h();
  if (!n) return;
  const e = document.querySelector("#myBidsContainer"),
    t = document.querySelector("#noBidsMessage");
  if (!(!e || !t)) {
    e.innerHTML = "<p>Loading...</p>";
    try {
      let r = (await E({ type: "my-bids", username: n.name, query: "_listings=true" })).data || [];
      const c = new Date();
      if (((r = r.filter((a) => new Date(a.listing.endsAt) > c)), r.length === 0)) {
        t.classList.remove("hidden"), (e.innerHTML = "");
        return;
      }
      t.classList.add("hidden"), (e.innerHTML = "");
      const i = document.querySelector("#auction-card-template"),
        u = {};
      r.forEach((a) => {
        const o = a.listing.id;
        (!u[o] || new Date(a.created) > new Date(u[o].created)) && (u[o] = a);
      });
      const l = Object.values(u).map(async (a) => {
        if (!a.listing) return null;
        const o = a.listing.id,
          m = await E({ type: "single-listing", listingId: o, query: "_seller=true&_bids=true" });
        return { bid: a, auction: m.data };
      });
      (await Promise.all(l)).forEach(({ bid: a, auction: o }) => {
        var S, L, f;
        if (!o) return;
        const m = i.content.cloneNode(!0);
        (m.querySelector(".auction-image").src =
          ((L = (S = o.media) == null ? void 0 : S[0]) == null ? void 0 : L.url) || "/images/placeholder.jpg"),
          (m.querySelector(".auction-seller").textContent = `Seller: ${o.seller.name || "Unknown Seller"}`),
          (m.querySelector(".auction-seller-avatar").src =
            ((f = o.seller.avatar) == null ? void 0 : f.url) || "/Icons/User.png"),
          (m.querySelector(".auction-title").textContent = o.title);
        let q = 0,
          v = null;
        if (o.bids.length > 0) {
          const y = o.bids.reduce((T, I) => (I.amount > T.amount ? I : T), o.bids[0]);
          (q = y.amount), (v = y.bidder.name);
        }
        const w = a.amount === q && v === n.name,
          g = m.querySelector(".auction-bid");
        (g.textContent = `Your Bid: $${a.amount}`),
          w
            ? ((g.textContent += " ✅ You are the highest bidder!"), g.classList.add("text-green-600"))
            : ((g.textContent += " ❌ You have been outbid!"), g.classList.add("text-red-600")),
          (m.querySelector(".auction-time").textContent = new Date(o.endsAt).toLocaleString()),
          m.querySelector(".auction-button").addEventListener("click", () => {
            window.location.href = `/pages/specific-auction.html?id=${a.listing.id}`;
          }),
          e.appendChild(m);
      });
    } catch {
      e.innerHTML = "<p>Failed to load your bids. Please try again later.</p>";
    }
  }
}
async function H() {
  const n = h();
  if (!n) return;
  const e = document.querySelector("#myCollectionContainer"),
    t = document.querySelector("#noCollectionMessage");
  if (!(!e || !t)) {
    e.innerHTML = "<p>Loading...</p>";
    try {
      const r = (await E({ type: "my-collection", username: n.name })).data || [];
      if (r.length === 0) {
        t.classList.remove("hidden"), (e.innerHTML = "");
        return;
      }
      t.classList.add("hidden"), (e.innerHTML = "");
      const c = r.map(async (u) => (await E({ type: "single-listing", listingId: u.id, query: "_seller=true" })).data);
      (await Promise.all(c)).forEach((u) => {
        if (!u) return;
        const d = M(u);
        if (!d) return;
        const l = d.querySelector("#auction-end-container");
        l && l.remove();
        const p = d.querySelector(".auction-bid");
        p && p.remove(), e.appendChild(d);
      });
    } catch {
      e.innerHTML = "<p>Failed to load your collection. Please try again later.</p>";
    }
  }
}
const F = h();
F || (window.location.href = "/pages/login.html");
document.addEventListener("DOMContentLoaded", async () => {
  await N(), document.querySelector("#updateAvatarForm").addEventListener("submit", k), P(), H(), O();
  const n = document.querySelector("#createAuctionBtn");
  n && n.addEventListener("click", $);
});
