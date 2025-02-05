let feedbackTimeout;

export function showFeedback(message, type) {
  const bidFeedback = document.getElementById("bid-feedback");
  if (!bidFeedback) return;

  bidFeedback.innerHTML = message;
  bidFeedback.className = `text-sm h-[20px] ${type === "error" ? "text-red-500" : "text-green-500"}`;

  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout);
  }

  feedbackTimeout = setTimeout(
    () => {
      bidFeedback.innerHTML = "";
    },
    type === "success" ? 5000 : 3000,
  );
}
