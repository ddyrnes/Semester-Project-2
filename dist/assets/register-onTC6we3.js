import { a as d } from "./input-BhcJG2o-.js";
async function l() {
  event.preventDefault();
  const r = document.querySelector("#username"),
    n = document.querySelector("#email"),
    s = document.querySelector("#password"),
    e = document.querySelector("#registerError");
  if (!r || !n || !s) {
    console.error("One or more input fields are missing.");
    return;
  }
  const i = r.value.trim(),
    a = n.value.trim(),
    c = s.value.trim();
  if (!i || !a || !c) {
    console.error("All fields are required."),
      e && ((e.textContent = "All fields are required."), e.classList.remove("hidden"));
    return;
  }
  try {
    const t = await fetch(d.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: i, email: a, password: c }),
      }),
      o = await t.json();
    if (!t.ok) throw new Error(o.errors ? o.errors[0].message : "Registration failed");
    console.log("Registration successful:", o),
      e && e.classList.add("hidden"),
      setTimeout(() => {
        window.location.href = "/pages/login.html";
      }, 1500);
  } catch (t) {
    console.error("❌ Error registering:", t.message), e && ((e.textContent = t.message), e.classList.remove("hidden"));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const r = document.querySelector("form");
  r && r.addEventListener("submit", l);
});
