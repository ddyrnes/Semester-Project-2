import { fetchAllAuctions } from "./fetchAllAuctions.js";
import { createAuctionCard } from "../auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../auctionCard/renderAuctionCard.js";

let allAuctions = [];
let displayedCount = 0;
const auctionsPerPage = 10;

export async function displayAuctions(filteredAuctions = null, reset = false) {
  const auctionsContainer = document.querySelector("#auctions-container");
  const statusElement = document.querySelector("#auction-error"); // Error/Loading message
  const loadMoreBtn = document.querySelector("#load-more-btn");

  if (!auctionsContainer) return;

  // Show "Loading..." before fetching auctions
  if (statusElement) {
    statusElement.innerText = "Loading auctions...";
    statusElement.classList.remove("hidden");
  }

  if (loadMoreBtn) {
    loadMoreBtn.style.display = "none"; // Hide Load More button initially
  }

  await loadAuctionCardTemplate();

  try {
    // Fetch auctions only if not filtering and cache is empty
    if (!filteredAuctions && allAuctions.length === 0) {
      allAuctions = await fetchAllAuctions();
    }

    // Reset only if explicitly requested
    if (reset) {
      displayedCount = 0;
    }

    // Use all fetched auctions if no filter is applied
    if (!filteredAuctions) {
      filteredAuctions = allAuctions;
    }

    // Determine how many auctions to display
    const auctionsToShow = filteredAuctions.slice(0, displayedCount + auctionsPerPage);

    auctionsContainer.innerHTML = "";

    if (statusElement) {
      statusElement.classList.add("hidden"); // Hide status message after loading
    }

    // Show "No auctions found" if there are no matching results
    if (auctionsToShow.length === 0) {
      auctionsContainer.innerHTML =
        "<p class='text-center col-span-full text-dark'>No auctions found matching your search.</p>";
      return;
    }

    // Render auctions
    auctionsToShow.forEach((auction) => {
      const auctionCard = createAuctionCard(auction);
      if (auctionCard) auctionsContainer.appendChild(auctionCard);
    });

    displayedCount += auctionsPerPage;

    // Show "Load More" button only if there are more auctions to load
    if (displayedCount >= filteredAuctions.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch {
    // Show an error message only if fetching fails
    if (statusElement) {
      statusElement.innerText = "Couldn't load auctions right now. Please try again later.";
      statusElement.classList.remove("hidden");
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display = "none"; // Hide Load More button on error
    }
  }
  return;
}
