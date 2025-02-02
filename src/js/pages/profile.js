import "../modules/profileTabs.js";
import { fetchProfileData } from "../modules/profile/myProfile/fetchProfile.js";
import { updateAvatar } from "../modules/profile/myProfile/updateAvatar.js";
import { handleCreateAuction } from "../modules/profile/createAuction/createAuction.js";
import { createAuctionCard } from "../modules/auctionCard/createAuctionCard.js";
import { loadAuctionCardTemplate } from "../modules/auctionCard/renderAuctionCard.js";

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

  // 🔹 Sample auction data (for testing)
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

  // 🔹 Create auction card & insert it into the container
  const auctionCard = createAuctionCard(sampleAuction);
  if (auctionCard) container.appendChild(auctionCard);
});

// ✅ Keep existing functionality
import { fetchAllListings } from "../listings/listings.js";
import { fetchUserListings } from "../listings/userListings.js";

fetchAllListings();
fetchUserListings();

const createAuctionBtn = document.querySelector("#createAuctionBtn");
if (createAuctionBtn) {
  createAuctionBtn.addEventListener("click", handleCreateAuction);
}
