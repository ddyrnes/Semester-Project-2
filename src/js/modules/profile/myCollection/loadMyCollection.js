import { getUserData } from "../myProfile/storage";
import { fetchListings } from "../../../api/fetchListings";
import { createAuctionCard } from "../../auctionCard/createAuctionCard";

export async function loadMyCollection() {
  const user = getUserData();
  if (!user) return;

  const myCollectionContainer = document.querySelector("#myCollectionContainer");
  const noCollectionMessage = document.querySelector("#noCollectionMessage");

  if (!myCollectionContainer || !noCollectionMessage) return;

  myCollectionContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetchListings({ type: "my-collection", username: user.name });

    const wonAuctions = response.data || [];

    if (wonAuctions.length === 0) {
      noCollectionMessage.classList.remove("hidden");
      myCollectionContainer.innerHTML = "";
      return;
    }

    noCollectionMessage.classList.add("hidden");
    myCollectionContainer.innerHTML = "";

    const auctionPromises = wonAuctions.map(async (auction) => {
      const auctionDetails = await fetchListings({
        type: "single-listing",
        listingId: auction.id,
        query: "_seller=true",
      });

      return auctionDetails.data;
    });

    const completeAuctions = await Promise.all(auctionPromises);

    completeAuctions.forEach((auction) => {
      if (!auction) return;

      const auctionCard = createAuctionCard(auction);
      if (!auctionCard) return;

      const auctionEndContainer = auctionCard.querySelector("#auction-end-container");
      if (auctionEndContainer) auctionEndContainer.remove();

      const auctionBid = auctionCard.querySelector(".auction-bid");
      if (auctionBid) auctionBid.remove();

      myCollectionContainer.appendChild(auctionCard);
    });
  } catch {
    myCollectionContainer.innerHTML = "<p>Failed to load your collection. Please try again later.</p>";
  }
}
