import { REGISTER_ENDPOINT } from "./shared/constants.mjs";
import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { showModal } from "./shared/modal.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser();
  });

  async function registerUser() {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const customOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      };

      const response = await fetch(REGISTER_ENDPOINT, customOptions);

      if (!response.ok) {
        const errorData = await response.json();
        showModal("Registration failed: " + (errorData.message || "Unknown error"));
        return;
      }

      const json = await response.json();
      showModal("Registration successful!");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

      registerForm.reset();
    } catch (error) {
      showModal("An error occurred while trying to register.");
    }
  }

  initializeHeaderNav();
});
