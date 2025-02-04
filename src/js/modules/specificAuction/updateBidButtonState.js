import { getUserData } from "../profile/myProfile/storage";

export function updateBidButtonState() {
  const placeBidButton = document.querySelector("#place-bid-btn");
  if (!placeBidButton) return;

  const user = getUserData();
  if (!user) {
    // User is not logged in, disable button and update styles/text
    placeBidButton.disabled = true;
    placeBidButton.classList.add("opacity-50", "cursor-not-allowed");
    placeBidButton.textContent = "Log in to Place Bid";
    console.log("User is not logged inn");
  } else {
    // User is logged in, enable button and reset text/styles if necessary
    console.log("User is logged inn");
    placeBidButton.disabled = false;
    placeBidButton.classList.remove("opacity-50", "cursor-not-allowed");
    placeBidButton.textContent = "Place Bid";
  }
}
