export function filterAuctions(allAuctions, query) {
  if (!Array.isArray(allAuctions)) return [];

  return allAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(query) ||
      (auction.description && auction.description.toLowerCase().includes(query)),
  );
}
