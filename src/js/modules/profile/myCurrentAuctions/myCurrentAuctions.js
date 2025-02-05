import { getUserData } from "../myProfile/storage";
import { fetchListings } from "../../../api/fetchListings";
import { createAuctionCard } from "../../auctionCard/createAuctionCard";
import { loadAuctionCardTemplate } from "../../auctionCard/renderAuctionCard";

export async function loadMyCurrentAuctions() {
  await loadAuctionCardTemplate(); // Ensure template is loaded

  const container = document.querySelector("#currentAuctionsContainer");
  if (!container) {
    return;
  }

  const user = getUserData();
  if (!user || !user.name) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }

  const username = user.name;

  const response = await fetchListings({ type: "my-current-auctions", username });

  if (!response || !response.data || !Array.isArray(response.data)) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }

  const myAuctions = response.data;
  container.innerHTML = ""; // Clear existing content

  if (myAuctions.length === 0) {
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }

  myAuctions.forEach((auction) => {
    const auctionCard = createAuctionCard(auction, true);
    if (auctionCard) container.appendChild(auctionCard);
  });
}
