(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const a of n)
      if (a.type === "childList")
        for (const r of a.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(n) {
    const a = {};
    return (
      n.integrity && (a.integrity = n.integrity),
      n.referrerPolicy && (a.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const a = o(n);
    fetch(n.href, a);
  }
})();
function g() {
  const e = localStorage.getItem("user"),
    t = localStorage.getItem("accessToken");
  if (!e || !t) return null;
  try {
    return { ...JSON.parse(e), accessToken: t };
  } catch (o) {
    return console.error("Failed to parse user data:", o), null;
  }
}
function B(e) {
  if (!e) return;
  const t = JSON.parse(localStorage.getItem("user")) || {},
    o = {
      ...t,
      ...e,
      avatar: e.avatar || t.avatar || {},
      banner: e.banner || t.banner || {},
      credits: e.credits ?? t.credits ?? 0,
      _count: e._count || t._count || { listings: 0, wins: 0 },
    };
  localStorage.setItem("user", JSON.stringify(o));
}
function h() {
  const e = document.querySelector("#hamburgerBtn"),
    t = document.querySelector("#mobileMenu");
  !e ||
    !t ||
    (e.addEventListener("click", () => {
      t.classList.toggle("hidden"), t.classList.toggle("flex");
    }),
    document.addEventListener("click", (o) => {
      !t.contains(o.target) && !e.contains(o.target) && (t.classList.add("hidden"), t.classList.remove("flex"));
    }),
    window.addEventListener("resize", () => {
      window.innerWidth >= 1024 && (t.classList.add("hidden"), t.classList.remove("flex"));
      function o() {
        const s = document.getElementById("totalBalanceDesktop"),
          n = g();
        s && (window.innerWidth < 1024 ? s.classList.add("hidden") : n && s.classList.remove("hidden"));
      }
      o(), window.addEventListener("resize", o);
    }));
}
function p() {
  const e = document.querySelectorAll(".nav-link"),
    t = window.location.pathname.split("/").pop();
  e.forEach((o) => {
    if (o.tagName !== "A") return;
    const s = o.getAttribute("href");
    if (!s) return;
    const n = s.split("/").pop();
    t === n || (t === "" && n === "index.html")
      ? o.classList.add("bg-primary", "text-white", "rounded-[2px]")
      : o.classList.remove("bg-primary", "text-white", "rounded-[2px]");
  });
}
function v() {
  const e = JSON.parse(localStorage.getItem("user")),
    t = document.getElementById("registerLink"),
    o = document.getElementById("loginLink"),
    s = document.getElementById("profileLink"),
    n = document.getElementById("logoutBtn"),
    a = document.getElementById("registerLinkMobile"),
    r = document.getElementById("loginLinkMobile"),
    l = document.getElementById("profileLinkMobile"),
    d = document.getElementById("logoutBtnMobile"),
    c = document.getElementById("totalBalanceDesktop"),
    u = document.getElementById("totalBalanceContent"),
    m = document.getElementById("totalBalanceMobile"),
    f = document.getElementById("desktopBalance"),
    L = document.getElementById("mobileBalance");
  e
    ? (s.classList.remove("hidden"),
      n.classList.remove("hidden"),
      l.classList.remove("hidden"),
      d.classList.remove("hidden"),
      t.classList.add("hidden"),
      o.classList.add("hidden"),
      a.classList.add("hidden"),
      r.classList.add("hidden"),
      e.credits !== void 0 &&
        (c.classList.remove("hidden"),
        u.classList.remove("hidden"),
        m.classList.remove("hidden"),
        (f.textContent = `$${e.credits}`),
        (L.textContent = `$${e.credits}`)),
      window.innerWidth < 1024 && c.classList.add("hidden"))
    : (s.classList.add("hidden"),
      n.classList.add("hidden"),
      l.classList.add("hidden"),
      d.classList.add("hidden"),
      t.classList.remove("hidden"),
      o.classList.remove("hidden"),
      a.classList.remove("hidden"),
      r.classList.remove("hidden"),
      c.classList.add("hidden"),
      u.classList.add("hidden"),
      m.classList.add("hidden"));
}
function E() {
  localStorage.removeItem("accessToken"), localStorage.removeItem("user"), window.location.reload();
}
function b() {
  const e = g(),
    t = document.querySelector("#navbarUsername"),
    o = document.querySelector("#navbarUsernameMobile"),
    s = document.querySelector("#navbarAvatar"),
    n = document.querySelector("#navbarAvatarMobile");
  e &&
    (t && (t.textContent = e.name),
    o && (o.textContent = e.name),
    e.avatar &&
      e.avatar.url &&
      (s && ((s.src = e.avatar.url), (s.alt = `${e.name}'s Avatar`)),
      n && ((n.src = e.avatar.url), (n.alt = `${e.name}'s Avatar`))));
}
function y() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("DOMContentLoaded", () => {
  v(),
    h(),
    p(),
    b(),
    document.querySelectorAll("#logoutBtn, #logoutBtnMobile").forEach((t) => {
      t.addEventListener("click", E);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("#backToTopBtn");
  e && e.addEventListener("click", y);
});
const i = "https://v2.api.noroff.dev",
  I = { REGISTER: `${i}/auth/register`, LOGIN: `${i}/auth/login` },
  S = {
    ALL: `${i}/auction/listings`,
    SINGLE: (e) => `${i}/auction/listings/${e}`,
    CREATE: `${i}/auction/listings`,
    UPDATE: (e) => `${i}/auction/listings/${e}`,
    DELETE: (e) => `${i}/auction/listings/${e}`,
    BID: (e) => `${i}/auction/listings/${e}/bids`,
    SEARCH: (e) => `${i}/auction/listings/search?q=${e}`,
  },
  $ = {
    ALL: `${i}/auction/profiles`,
    SINGLE: (e) => `${i}/auction/profiles/${e}`,
    UPDATE: (e) => `${i}/auction/profiles/${e}`,
    LISTINGS: (e) => `${i}/auction/profiles/${e}/listings`,
    BIDS: (e) => `${i}/auction/profiles/${e}/bids`,
    WINS: (e) => `${i}/auction/profiles/${e}/wins`,
    SEARCH: (e) => `${i}/auction/profiles/search?q=${e}`,
  };
export { i as A, S as L, $ as P, I as a, g, B as u };
