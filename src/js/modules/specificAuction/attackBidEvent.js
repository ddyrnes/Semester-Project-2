import { handleBid } from "./handleBid.js";

export function attachBidEvent() {
  const bidButton = document.getElementById("place-bid-btn");
  if (bidButton) {
    bidButton.removeEventListener("click", handleBid);
    bidButton.addEventListener("click", handleBid);
  }
}
