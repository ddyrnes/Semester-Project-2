import { getUserData } from "../myProfile/storage";
import { fetchListings } from "../../../api/fetchListings";

export async function loadMyBids() {
  const user = getUserData();
  if (!user) return;

  const myBidsContainer = document.querySelector("#myBidsContainer");
  const noBidsMessage = document.querySelector("#noBidsMessage");

  if (!myBidsContainer || !noBidsMessage) return;

  myBidsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetchListings({ type: "my-bids", username: user.name, query: "_listings=true" });

    let bidsArray = response.data || [];

    const now = new Date();
    bidsArray = bidsArray.filter((bid) => new Date(bid.listing.endsAt) > now);

    if (bidsArray.length === 0) {
      noBidsMessage.classList.remove("hidden");
      myBidsContainer.innerHTML = "";
      return;
    }

    noBidsMessage.classList.add("hidden");
    myBidsContainer.innerHTML = "";
    const template = document.querySelector("#auction-card-template");

    const latestBids = {};
    bidsArray.forEach((bid) => {
      const auctionId = bid.listing.id;
      if (!latestBids[auctionId] || new Date(bid.created) > new Date(latestBids[auctionId].created)) {
        latestBids[auctionId] = bid;
      }
    });

    const uniqueBids = Object.values(latestBids);

    const bidPromises = uniqueBids.map(async (bid) => {
      if (!bid.listing) return null;

      const auctionId = bid.listing.id;
      const auctionDetails = await fetchListings({
        type: "single-listing",
        listingId: auctionId,
        query: "_seller=true&_bids=true",
      });

      return { bid, auction: auctionDetails.data };
    });

    const bidListingsWithSellers = await Promise.all(bidPromises);

    bidListingsWithSellers.forEach(({ bid, auction }) => {
      if (!auction) return;

      const auctionCard = template.content.cloneNode(true);

      // Auction Image
      auctionCard.querySelector(".auction-image").src = auction.media?.[0]?.url || "/images/placeholder.jpg";

      // Seller Name & Avatar
      auctionCard.querySelector(".auction-seller").textContent = `Seller: ${auction.seller.name || "Unknown Seller"}`;
      auctionCard.querySelector(".auction-seller-avatar").src = auction.seller.avatar?.url || "/Icons/User.png";

      // Auction Details
      auctionCard.querySelector(".auction-title").textContent = auction.title;

      // Determine the highest bidder correctly
      let highestBid = 0;
      let highestBidder = null;

      if (auction.bids.length > 0) {
        const highestBidObj = auction.bids.reduce((max, b) => (b.amount > max.amount ? b : max), auction.bids[0]);
        highestBid = highestBidObj.amount;
        highestBidder = highestBidObj.bidder.name;
      }

      const isHighestBidder = bid.amount === highestBid && highestBidder === user.name;

      const bidStatus = auctionCard.querySelector(".auction-bid");
      bidStatus.textContent = `Your Bid: $${bid.amount}`;

      if (isHighestBidder) {
        bidStatus.textContent += " ✅ You are the highest bidder!";
        bidStatus.classList.add("text-green-600");
      } else {
        bidStatus.textContent += " ❌ You have been outbid!";
        bidStatus.classList.add("text-red-600");
      }

      // Auction End Time
      auctionCard.querySelector(".auction-time").textContent = new Date(auction.endsAt).toLocaleString();

      // View Button
      const viewButton = auctionCard.querySelector(".auction-button");
      viewButton.addEventListener("click", () => {
        window.location.href = `/pages/specific-auction.html?id=${bid.listing.id}`;
      });

      myBidsContainer.appendChild(auctionCard);
    });
  } catch {
    myBidsContainer.innerHTML = "<p>Failed to load your bids. Please try again later.</p>";
  }
}
