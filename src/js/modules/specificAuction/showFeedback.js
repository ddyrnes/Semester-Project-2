export function showFeedback(message, type) {
  const bidFeedback = document.getElementById("bid-feedback");
  if (!bidFeedback) return;

  bidFeedback.innerHTML = message;
  bidFeedback.className = `text-body h-[24px] ${type === "error" ? "text-red-900" : "text-green-900"}`;
}
