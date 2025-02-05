import "../modules/nav/nav.js";
import { initSpecificAuction } from "../modules/specificAuction/initSpecificAuction.js";
import { updateBidButtonState } from "../modules/specificAuction/updateBidButtonState.js";
import { attachBidEvent } from "../modules/specificAuction/attackBidEvent.js";

async function init() {
  await initSpecificAuction();
  updateBidButtonState();
  attachBidEvent();
}

document.addEventListener("DOMContentLoaded", init);
