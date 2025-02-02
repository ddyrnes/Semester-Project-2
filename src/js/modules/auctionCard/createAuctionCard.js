export function createAuctionCard(auctionData) {
  console.log("🔍 Creating auction card for:", auctionData);

  // Find the template in the DOM
  const template = document.querySelector("#auction-card-template");

  if (!template) {
    console.error("❌ Template not found in the document.");
    return null;
  }

  // Clone the template
  const card = template.content.cloneNode(true);

  // Populate card with auction data
  card.querySelector(".auction-image").src = auctionData.media?.[0]?.url || "/Images/default-image.jpg";
  card.querySelector(".auction-image").alt = auctionData.media?.[0]?.alt || "Auction Image";
  card.querySelector(".auction-title").textContent = auctionData.title || "Untitled Auction";
  card.querySelector(".auction-description").textContent = auctionData.description || "No description available";
  card.querySelector(".auction-bid").textContent = `Bids: ${auctionData._count?.bids || 0}`;
  card.querySelector(".auction-time").textContent = `Ends at: ${new Date(auctionData.endsAt).toLocaleString()}`;

  return card;
}
