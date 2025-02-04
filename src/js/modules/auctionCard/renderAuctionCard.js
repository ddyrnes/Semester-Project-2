export async function loadAuctionCardTemplate() {
  try {
    const response = await fetch("/src/js/modules/auctionCard/auctionCardTemplate.html");

    if (!response.ok) {
      throw new Error(`❌ Failed to load template: ${response.status} ${response.statusText}`);
    }

    let templateText = await response.text();

    // Remove any <script> tags that Vite injects
    // This was causing problems when running server locally
    templateText = templateText.replace(/<script[^>]*>.*?<\/script>/gi, "").trim();

    // Insert the cleaned template into the DOM
    document.body.insertAdjacentHTML("beforeend", templateText);
  } catch (error) {
    console.error("Error loading auction card template:", error);
  }
}
