import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";
import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";
import { createAuctionCard } from "../modules/auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../modules/auctionCard/renderAuctionCard.js";

import { fetchListings } from "../api/fetchListings.js";

// ✅ Ensure profile data loads first
document.addEventListener("DOMContentLoaded", async () => {
  await fetchProfileData();
  document.querySelector("#updateAvatarForm").addEventListener("submit", updateAvatar);
});

// ✅ Load the auction template BEFORE trying to create cards
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🔍 Loading auction card template...");
  await loadAuctionCardTemplate();

  const container = document.querySelector("#my-current-auctions");
  if (!container) {
    console.error("❌ #my-current-auctions container not found.");
    return;
  }

  // Sample auction data (for testing)
  const sampleAuction = {
    title: "Cool NFT",
    description: "Something",
    media: [
      {
        url: "https://www.shutterstock.com/image-vector/illustration-mafia-gangster-spy-icon-600nw-1906650151.jpg",
        alt: "Sample Image",
      },
    ],
    _count: { bids: 3 },
    endsAt: "2025-02-10T15:30:00.000Z",
  };

  // Create auction card & insert it into the container
  const auctionCard = createAuctionCard(sampleAuction);
  if (auctionCard) container.appendChild(auctionCard);
});

const createAuctionBtn = document.querySelector("#createAuctionBtn");
if (createAuctionBtn) {
  createAuctionBtn.addEventListener("click", handleCreateAuction);
}

// For testing purposes, will delete before final push
// For testing purposes, will delete before final push
// For testing purposes, will delete before final push

const listings = await fetchListings({ type: "all-listings" });
console.log(listings);
const myListings = await fetchListings({ type: "my-listings", username: "dady" });
console.log(myListings);
const myBids = await fetchListings({ type: "my-bids", username: "dady" });
console.log(myBids);
const myCollection = await fetchListings({ type: "my-collection", username: "dady" });
console.log(myCollection);
const listingId = await fetchListings({ type: "single-listing", listingId: "93067ed0-cc15-43bb-9e71-f71974b0f6eb" });
console.log(listingId);
const searchResults = await fetchListings({ type: "search", query: "modern" });
console.log(searchResults);
