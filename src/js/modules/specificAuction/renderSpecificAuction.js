export function renderSpecificAuction(auction) {
  // Populate Auction Details
  document.querySelector("#auction-title").textContent = auction.title;
  document.querySelector("#auction-description").textContent = auction.description || "No description available.";

  // Seller Info
  document.querySelector("#seller-name").textContent = auction.seller?.name || "Unknown Seller";
  document.querySelector("#seller-avatar").src = auction.seller?.avatar?.url || "/Icons/User.png";

  // Auction End Time
  document.querySelector("#auction-end").textContent = new Date(auction.endsAt).toLocaleString();

  // Get the highest bid and total bids
  const totalBids = auction.bids?.length || 0;
  document.querySelector("#total-bids").textContent = totalBids;

  let highestBidAmount = "No bids yet";
  if (auction.bids && auction.bids.length > 0) {
    highestBidAmount = Math.max(...auction.bids.map((bid) => bid.amount));
  }
  document.querySelector("#current-bid").textContent = highestBidAmount;

  // Handle Media (Auction Image)
  const auctionImage = document.querySelector("#auction-image");
  if (auction.media && auction.media.length > 0) {
    auctionImage.src = auction.media[0].url;
    auctionImage.alt = auction.media[0].alt || "Auction Image";
  } else {
    auctionImage.src = "/images/placeholder.jpg"; // Default image
    auctionImage.alt = "No image available";
  }
}
