import { BLOG_ENDPOINT } from "../constants.mjs";
import { hideLoadingIndicator, showLoadingIndicator } from "../createLoadingIndicator.mjs";

export async function fetchBlogPost() {
  try {
    const response = await fetch(BLOG_ENDPOINT);
    if (!response.ok) {
      throw new error("Failed to fetch Blog Posts. Please try again later.")
    }
    const postData = await response.json();
    return postData;
  } catch (error) {
    console.error(error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Something went wrong, please try again later.";
    errorMessage.className = "error-msg";
    const contentSection = document.getElementById("blogPostSection");
    contentSection.appendChild(errorMessage);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  showLoadingIndicator();
  fetchBlogPost().finally(() => hideLoadingIndicator());
});