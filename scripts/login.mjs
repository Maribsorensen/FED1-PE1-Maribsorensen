import { LOGIN_ENDPOINT } from "./shared/constants.mjs";
import { initializeHeaderNav } from "./shared/initializeNav.mjs";

const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser();
});

async function loginUser() {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const customOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(LOGIN_ENDPOINT, customOptions);
    const json = await response.json();

    if (response.ok && json.data) {
      const accessToken = json.data.accessToken;
      const username = json.data.name;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);


      window.location.href = "../post/manage.html";
    } else {
      console.error("Login failed:", json.message || "Unknown error");
      alert("Login failed. Please check your credentials.");
    }

    return json;
  } catch (error) {
    console.log("Error during login:", error);
    alert("An error occurred while trying to log in.");
  }
};
document.addEventListener("DOMContentLoaded", initializeHeaderNav);