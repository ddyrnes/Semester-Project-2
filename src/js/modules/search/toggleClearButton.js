export function toggleClearButton(clearSearchIcon, query) {
  if (query) clearSearchIcon.classList.remove("hidden");
  else clearSearchIcon.classList.add("hidden");
}
