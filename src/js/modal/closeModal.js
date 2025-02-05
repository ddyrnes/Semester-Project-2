export function closeUniversalModal() {
  const modal = document.getElementById("universal-modal");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.style.display = "none";
}
