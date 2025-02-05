import { A as l } from "./input-BhcJG2o-.js";
function t(e) {
  const o = document.querySelector("#loginError");
  o && ((o.textContent = e), o.classList.remove("hidden"));
}
function u(e) {
  localStorage.setItem("accessToken", e.accessToken), localStorage.setItem("user", JSON.stringify(e));
}
function d(e, o) {
  return !e || !o ? (t("Both fields are required."), !1) : !0;
}
async function g(e) {
  e.preventDefault();
  const o = document.querySelector("#email"),
    s = document.querySelector("#password");
  if (!o || !s) {
    console.error("❌ Email or password input not found.");
    return;
  }
  const a = o.value.trim(),
    i = s.value.trim();
  if (d(a, i))
    try {
      const r = await fetch(`${l}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: a, password: i }),
        }),
        n = await r.json();
      if (!r.ok) throw new Error(n.errors ? n.errors[0].message : "Invalid email or password.");
      console.log("Login successful:", n), t(""), u(n.data), (window.location.href = "/pages/profile.html");
    } catch (r) {
      console.error("Error logging in:", r.message), t(r.message);
    }
}
function c() {
  const e = localStorage.getItem("accessToken");
  return console.log(e), !!e;
}
c() ? console.log("User is logged in!") : console.log("No access token found, user is not logged in.");
c();
document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("form");
  e &&
    e.addEventListener("submit", async (o) => {
      o.preventDefault(), g(o);
    });
});
