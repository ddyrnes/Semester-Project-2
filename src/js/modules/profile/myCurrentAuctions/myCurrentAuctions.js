import { getUserData } from "../myProfile/storage";
import { fetchListings } from "../../../api/fetchListings";
import { createAuctionCard } from "../../auctionCard/createAuctionCard";
import { loadAuctionCardTemplate } from "../../auctionCard/renderAuctionCard";

export async function loadMyCurrentAuctions() {
  console.log("🔍 Loading auction card template...");
  await loadAuctionCardTemplate(); // Ensure template is loaded

  const container = document.querySelector("#currentAuctionsContainer");
  if (!container) {
    console.error("❌ #currentAuctionsContainer not found.");
    return;
  }

  const user = getUserData();
  if (!user || !user.name) {
    console.error("❌ No user found. Redirecting to login.");
    document.querySelector("#noAuctionsMessage").classList.remove("hidden");
    return;
  }

  const username = user.name;
  console.log(`👤 Logged-in user: ${username}`);

  const response = await fetchListings({ type: "my-current-auctions", username });

  if (!response || !response.data || !Array.isArray(response.data)) {
    console.error("❌ Invalid response from API:", response);
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

  console.log(`✅ Loaded ${myAuctions.length} auctions.`);
}
