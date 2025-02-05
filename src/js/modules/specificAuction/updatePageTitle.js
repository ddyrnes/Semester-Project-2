export function updatePageTitle() {
  const auctionTitleElement = document.getElementById("auction-title");

  if (auctionTitleElement) {
    const auctionTitle = auctionTitleElement.innerText.trim();

    if (auctionTitle) {
      document.title = `${auctionTitle} | Auctions`;
    }
  }
}
