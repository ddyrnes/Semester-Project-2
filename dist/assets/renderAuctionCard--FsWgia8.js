function f(e, r = !1) {
  var i, a, d;
  const o = document.querySelector("#auction-card-template");
  if (!o) return null;
  const t = o.content.cloneNode(!0).querySelector("div");
  t.querySelector(".auction-title").textContent = e.title;
  const m = t.querySelector(".auction-description"),
    l = 100,
    n = e.description || "No description provided";
  m.textContent = n.length > l ? n.substring(0, l) + "..." : n;
  const c = t.querySelector(".auction-image");
  (c.src = ((i = e.media[0]) == null ? void 0 : i.url) || "/Icons/Placeholder.png"),
    (c.alt = ((a = e.media[0]) == null ? void 0 : a.alt) || "Auction Image"),
    (t.querySelector(".auction-bid").textContent = `Bids: ${e._count.bids}`),
    (t.querySelector(".auction-time").textContent = `Ends: ${new Date(e.endsAt).toLocaleString()}`);
  const p = t.querySelector(".seller-info");
  if (r) p.style.display = "none";
  else if (e.seller) {
    t.querySelector(".auction-seller").textContent = e.seller.name || "Unknown Seller";
    const u = t.querySelector(".auction-seller-avatar");
    (u.src = ((d = e.seller.avatar) == null ? void 0 : d.url) || "/Icons/User.png"),
      (u.alt = e.seller.name || "Seller Avatar");
  }
  const s = t.querySelector(".auction-button");
  return (
    s &&
      s.addEventListener("click", () => {
        window.location.href = `/pages/specific-auction.html?id=${e.id}`;
      }),
    t
  );
}
async function S() {
  try {
    const e = await fetch("/src/js/modules/auctionCard/auctionCardTemplate.html");
    if (!e.ok) throw new Error(`❌ Failed to load template: ${e.status} ${e.statusText}`);
    let r = await e.text();
    (r = r.replace(/<script[^>]*>.*?<\/script>/gi, "").trim()), document.body.insertAdjacentHTML("beforeend", r);
  } catch (e) {
    console.error("Error loading auction card template:", e);
  }
}
export { f as c, S as l };
