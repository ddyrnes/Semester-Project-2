export function showUniversalModal(title, message) {
  const modal = document.getElementById("universal-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  if (!modal) {
    return;
  }

  modalTitle.innerText = title;
  modalMessage.innerText = message;

  modal.classList.remove("hidden");
  modal.style.display = "flex";
}
