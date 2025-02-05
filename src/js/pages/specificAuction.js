import "../modules/nav/nav.js";
import { initSpecificAuction } from "../modules/specificAuction/initSpecificAuction.js";
import { updateBidButtonState } from "../modules/specificAuction/updateBidButtonState.js";
import { attachBidEvent } from "../modules/specificAuction/attackBidEvent.js";
import { updatePageTitle } from "../modules/specificAuction/updatePageTitle.js";

async function init() {
  await initSpecificAuction();
  updatePageTitle();
  updateBidButtonState();
  attachBidEvent();
}

document.addEventListener("DOMContentLoaded", init);
