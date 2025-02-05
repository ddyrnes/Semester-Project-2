export function createAuctionCard(auctionData, isMyAuction = false) {
  const template = document.querySelector("#auction-card-template");

  if (!template) {
    return null;
  }

  const card = template.content.cloneNode(true);
  const cardElement = card.querySelector("div");

  // Title
  cardElement.querySelector(".auction-title").textContent = auctionData.title;

  // Description (Limit to 100 characters)
  const descriptionElement = cardElement.querySelector(".auction-description");
  const maxDescriptionLength = 100;
  const descriptionText = auctionData.description || "No description provided";
  descriptionElement.textContent =
    descriptionText.length > maxDescriptionLength
      ? descriptionText.substring(0, maxDescriptionLength) + "..."
      : descriptionText;

  // Image
  const imageElement = cardElement.querySelector(".auction-image");
  imageElement.src = auctionData.media[0]?.url || "/images/Placeholder.png"; // Default if no image
  imageElement.alt = auctionData.media[0]?.alt || "Auction Image";

  // Bids
  cardElement.querySelector(".auction-bid").textContent = `Bids: ${auctionData._count.bids}`;

  // Auction End Time
  cardElement.querySelector(".auction-time").textContent = `Ends: ${new Date(auctionData.endsAt).toLocaleString()}`;

  // Seller Data (Hide if it's "My Auctions")
  const sellerInfoElement = cardElement.querySelector(".seller-info");

  if (isMyAuction) {
    sellerInfoElement.style.display = "none";
  } else if (auctionData.seller) {
    cardElement.querySelector(".auction-seller").textContent = auctionData.seller.name || "Unknown Seller";
    const sellerAvatarElement = cardElement.querySelector(".auction-seller-avatar");
    sellerAvatarElement.src = auctionData.seller.avatar?.url || "/Icons/User.png"; // Default icon if no avatar
    sellerAvatarElement.alt = auctionData.seller.name || "Seller Avatar";
  }

  // View Button
  const viewButton = cardElement.querySelector(".auction-button");
  if (viewButton) {
    viewButton.addEventListener("click", () => {
      window.location.href = `/pages/specific-auction.html?id=${auctionData.id}`;
    });
  }

  return cardElement;
}
