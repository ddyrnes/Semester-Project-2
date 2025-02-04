import { fetchAllAuctions } from "./fetchAllAuctions.js";
import { createAuctionCard } from "../auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../auctionCard/renderAuctionCard.js";

export async function displayEndingSoonAuctions() {
  const auctionsContainer = document.querySelector("#auctions-container");
  if (!auctionsContainer) return;

  await loadAuctionCardTemplate();

  const allAuctions = await fetchAllAuctions();
  if (!allAuctions || allAuctions.length === 0) {
    auctionsContainer.innerHTML =
      "<p class='text-center col-span-full'>Couldn't load auctions right now. Please try again later.</p>";
    return;
  }

  const endingSoon = allAuctions
    .filter((auction) => auction.endsAt)
    .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt))
    .slice(0, 6);

  auctionsContainer.innerHTML = "";

  if (endingSoon.length === 0) {
    auctionsContainer.innerHTML = "<p class='text-center col-span-full'>No auctions ending soon.</p>";
    return;
  }

  endingSoon.forEach((auction) => {
    const auctionCard = createAuctionCard(auction);
    if (auctionCard) auctionsContainer.appendChild(auctionCard);
  });
}
