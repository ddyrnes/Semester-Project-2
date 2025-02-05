import { getUserData } from "../profile/myProfile/storage.js";
import { LISTINGS } from "../../api/apiEndpoints.js";
import { makeRequest } from "./makeRequest.js";
import { showFeedback } from "./showFeedback.js";
import { getAuctionIdFromURL } from "./getAuctionIdFromURL.js";

/**
 * Handles the bid placement process for an auction.
 *
 * This function performs the following steps:
 * 1. Retrieves the bid amount input from the DOM and validates it.
 * 2. Compares the entered bid against the current highest bid and shows feedback if the bid is too low.
 * 3. Checks if the user is authenticated by retrieving user data from storage.
 * 4. Constructs the API URL using the auction ID extracted from the current URL.
 * 5. Sends a POST request to place the bid with the specified amount.
 * 6. Upon a successful bid, updates the DOM elements for highest bid, highest bidder, and total bid count.
 * 7. Provides appropriate feedback messages for both success and error conditions.
 *
 * @async
 * @function handleBid
 * @returns {Promise<void>} A promise that resolves when the bid handling process completes.
 *
 * @throws {Error} If the bid amount is invalid, the user is not authenticated, or the request fails due to insufficient credits.
 */

export async function handleBid() {
  const bidAmountInput = document.getElementById("bid-amount");
  if (!bidAmountInput) return;

  const bidAmount = parseFloat(bidAmountInput.value);
  if (isNaN(bidAmount) || bidAmount <= 0) {
    showFeedback("❌ Please enter a valid bid amount greater than 0.", "error");
    return;
  }

  const highestBidElement = document.getElementById("current-bid");
  const highestBidderElement = document.getElementById("highest-bidder");
  const totalBidsElement = document.getElementById("total-bids");

  const highestBid =
    highestBidElement && highestBidElement.textContent !== "-" ? parseFloat(highestBidElement.textContent) : 0;

  if (bidAmount <= highestBid) {
    showFeedback(`❌ Your bid must be higher than the current highest bid of ${highestBid}.`, "error");
    return;
  }

  const user = getUserData();
  if (!user || !user.accessToken) {
    showFeedback("❌ Authentication error: You must be logged in to place a bid.", "error");
    return;
  }

  const auctionId = getAuctionIdFromURL();
  const apiUrl = LISTINGS.BID(auctionId);

  try {
    await makeRequest(apiUrl, "POST", { amount: bidAmount }, user.accessToken);

    showFeedback(
      `✅ Your bid of ${bidAmount} was placed successfully! You can view your bids on <a href="/profile.html">your profile</a>.`,
      "success",
    );

    if (highestBidElement) {
      highestBidElement.textContent = bidAmount.toFixed(2);
    }

    if (highestBidderElement) {
      highestBidderElement.textContent = user.name;
    }

    if (totalBidsElement) {
      let totalBids = parseInt(totalBidsElement.textContent) || 0;
      totalBidsElement.textContent = totalBids + 1;
    }

    bidAmountInput.value = "";
  } catch {
    showFeedback("❌ You don't have enough credits to place this bid.", "error");
  }
}
