import { REGISTER_ENDPOINT } from "./shared/constants.mjs";
import { initializeHeaderNav } from "./shared/initializeNav.mjs";

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
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", initializeHeaderNav);