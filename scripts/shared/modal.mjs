export function showModal(message) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.textContent = message;
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.remove();
  }, 3000);
}

