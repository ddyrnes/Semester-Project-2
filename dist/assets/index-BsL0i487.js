(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const o of e)
      if (o.type === "childList")
        for (const n of o.addedNodes) n.tagName === "LINK" && n.rel === "modulepreload" && s(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(e) {
    const o = {};
    return (
      e.integrity && (o.integrity = e.integrity),
      e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = c(e);
    fetch(e.href, o);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  const t = JSON.parse(localStorage.getItem("user")),
    r = localStorage.getItem("accessToken");
  t && r ? (console.log("User is logged in:", t), console.log("Access Token:", r)) : console.log("No user logged in.");
});
function i() {
  localStorage.removeItem("accessToken"), localStorage.removeItem("user");
}
document.addEventListener("DOMContentLoaded", () => {
  const t = document.querySelector("#logoutBtn");
  t &&
    t.addEventListener("click", () => {
      i(), (window.location.href = "/pages/login.html");
    });
});
