import { fetchSpecificAuction } from "./fetchSpecificAuction";
import { renderSpecificAuction } from "./renderSpecificAuction";

export async function initSpecificAuction() {
  const urlParams = new URLSearchParams(window.location.search);
  const auctionId = urlParams.get("id");

  if (!auctionId) {
    document.querySelector("main").innerHTML = "<p class='text-center text-dark'>Auction not found.</p>";
    return;
  }

  try {
    const auction = await fetchSpecificAuction(auctionId);
    renderSpecificAuction(auction);
  } catch (error) {
    console.error("Error loading auction:", error);
    document.querySelector("main").innerHTML = "<p class='text-center text-dark'>Error loading auction.</p>";
  }
}
