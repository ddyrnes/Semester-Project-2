import { fetchListings } from "../../api/fetchListings";

export async function fetchSpecificAuction(auctionId) {
  try {
    const response = await fetchListings({
      type: "single-listing",
      listingId: auctionId,
      query: "_seller=true&_bids=true",
    });

    if (!response || !response.data) {
      throw new Error("Auction not found.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching auction:", error);
    throw error;
  }
}
