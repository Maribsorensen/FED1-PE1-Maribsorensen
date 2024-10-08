export function showModal(message) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.textContent = message;
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.remove();
  }, 6000);
}

export function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement("div");
  modal.className = "modal confirmation-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.textContent = message;

  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.className = "yes-button";

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.className = "no-button";

  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  yesButton.addEventListener("click", () => {
    modal.remove();
    onConfirm(true);
  });

  noButton.addEventListener("click", () => {
    modal.remove();
    onConfirm(false);
  });
}