export function createAuctionCard(auctionData, removeButton = false) {
  const template = document.querySelector("#auction-card-template");

  if (!template) {
    console.error("❌ Template #auction-card-template not found.");
    return null;
  }

  const card = template.content.cloneNode(true);
  const cardElement = card.querySelector("div");

  cardElement.querySelector(".auction-title").textContent = auctionData.title;
  cardElement.querySelector(".auction-description").textContent = auctionData.description;
  cardElement.querySelector(".auction-image").src = auctionData.media[0]?.url || "";
  cardElement.querySelector(".auction-image").alt = auctionData.media[0]?.alt || "Auction Image";
  cardElement.querySelector(".auction-bid").textContent = `Bids: ${auctionData._count.bids}`;
  cardElement.querySelector(".auction-time").textContent = `Ends: ${new Date(auctionData.endsAt).toLocaleString()}`;

  if (removeButton) {
    cardElement.querySelector(".auction-button")?.remove();
  }

  return cardElement;
}
