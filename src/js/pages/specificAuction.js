import "../modules/nav/nav.js";
import { initSpecificAuction } from "../modules/specificAuction/initSpecificAuction.js";
import { updateBidButtonState } from "../modules/specificAuction/updateBidButtonState.js";

async function init() {
  await initSpecificAuction();
  updateBidButtonState();
}

document.addEventListener("DOMContentLoaded", init);
