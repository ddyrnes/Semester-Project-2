import { displayAuctions } from "./displayAuctions.js";

export function setupLoadMore() {
  const loadMoreBtn = document.querySelector("#load-more-btn");

  if (!loadMoreBtn) {
    return;
  }

  loadMoreBtn.addEventListener("click", () => {
    displayAuctions();
  });
}
