import { displayAuctions } from "../auctions/displayAuctions.js";
import { toggleClearButton } from "./toggleClearButton.js";

export function clearSearch(searchInput, clearSearchIcon) {
  searchInput.value = "";
  toggleClearButton(clearSearchIcon, "");
  displayAuctions(null, true);
}
