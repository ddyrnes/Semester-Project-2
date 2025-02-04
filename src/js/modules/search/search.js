import { fetchAllAuctions } from "../auctions/fetchAllAuctions.js";
import { displayAuctions } from "../auctions/displayAuctions.js";
import { filterAuctions } from "./filterAuctions.js";
import { toggleClearButton } from "./toggleClearButton.js";
import { clearSearch } from "./clearSearch.js";

export async function searchAuctions() {
  const searchInput = document.querySelector("#search-bar");
  const searchButton = document.querySelector("#search-button");
  const clearSearchIcon = document.querySelector("#clear-search-icon");

  if (!searchInput || !searchButton || !clearSearchIcon) return;

  let allAuctions = await fetchAllAuctions();

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const filteredAuctions = filterAuctions(allAuctions, query);
    displayAuctions(filteredAuctions);
    toggleClearButton(clearSearchIcon, query);
  }

  searchInput.addEventListener("input", () => toggleClearButton(clearSearchIcon, searchInput.value.trim()));
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") handleSearch();
  });
  clearSearchIcon.addEventListener("click", () => clearSearch(searchInput, clearSearchIcon));
}
