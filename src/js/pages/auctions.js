import "../modules/nav/nav.js";
import { displayAuctions } from "../modules/auctions/displayAuctions.js";
import { setupLoadMore } from "../modules/auctions/loadMoreAuctions.js";
import { searchAuctions } from "../modules/search/search.js";

document.addEventListener("DOMContentLoaded", async () => {
  await displayAuctions();
  setupLoadMore();
  searchAuctions();
});
