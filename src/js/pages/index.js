import "../modules/nav/nav.js";
import { fetchListings } from "../api/fetchListings.js";
import { createAuctionCard } from "../modules/auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../modules/auctionCard/renderAuctionCard.js";

async function getEndingSoonAuctions() {
  try {
    const response = await fetchListings({ type: "all-listings", query: "_seller=true" });
    if (!response || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn("❌ No auctions found or invalid response.");
      return [];
    }

    const { data: listings } = response;
    const sortedListings = listings
      .filter((auction) => auction.endsAt)
      .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    return sortedListings.slice(0, 6);
  } catch (error) {
    console.error("❌ Error fetching ending soon auctions:", error);
    return [];
  }
}

async function displayEndingSoonAuctions() {
  const auctionsContainer = document.querySelector("#auctions-container");
  if (!auctionsContainer) {
    console.error("❌ Container #auctions-container not found.");
    return;
  }

  // Load the auction card template
  await loadAuctionCardTemplate();

  // Fetch auctions ending soon
  const auctions = await getEndingSoonAuctions();

  // If no auctions are found, show the default error message
  if (!auctions || auctions.length === 0) {
    auctionsContainer.innerHTML =
      "<p class='text-center col-span-full'>Couldn't load auctions right now. Please try again later.</p>";
    return;
  }

  // Clear existing content before adding new auctions
  auctionsContainer.innerHTML = "";

  // Create and append auction cards
  auctions.forEach((auction) => {
    const auctionCard = createAuctionCard(auction);
    if (auctionCard) auctionsContainer.appendChild(auctionCard);
  });
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayEndingSoonAuctions);
