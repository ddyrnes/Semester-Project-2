import { fetchAllAuctions } from "./fetchAllAuctions.js";
import { createAuctionCard } from "../auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../auctionCard/renderAuctionCard.js";

let allAuctions = [];
let displayedCount = 0;
const auctionsPerPage = 10;

export async function displayAuctions(filteredAuctions = null, reset = false) {
  const auctionsContainer = document.querySelector("#auctions-container");
  const loadMoreBtn = document.querySelector("#load-more-btn");
  if (!auctionsContainer) return;

  await loadAuctionCardTemplate();

  if (!filteredAuctions && allAuctions.length === 0) {
    allAuctions = await fetchAllAuctions();
  }

  // Only reset if explicitly requested
  if (reset) {
    displayedCount = 0;
  }

  if (!filteredAuctions) {
    filteredAuctions = allAuctions;
  }

  const auctionsToShow = filteredAuctions.slice(0, displayedCount + auctionsPerPage);

  auctionsContainer.innerHTML = "";
  if (auctionsToShow.length === 0) {
    auctionsContainer.innerHTML =
      "<p class='text-center col-span-full text-dark'>No auctions found matching your search.</p>";
    return;
  }

  auctionsToShow.forEach((auction) => {
    const auctionCard = createAuctionCard(auction);
    if (auctionCard) auctionsContainer.appendChild(auctionCard);
  });

  displayedCount += auctionsPerPage;

  if (displayedCount >= filteredAuctions.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}
