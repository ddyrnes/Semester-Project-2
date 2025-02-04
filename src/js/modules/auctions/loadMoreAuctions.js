import { displayAuctions } from "./displayAuctions.js";

export function setupLoadMore() {
  const loadMoreBtn = document.querySelector("#load-more-btn");

  if (!loadMoreBtn) {
    console.error("Load More button not found.");
    return;
  }

  loadMoreBtn.addEventListener("click", () => {
    displayAuctions();
  });
}
