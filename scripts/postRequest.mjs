import { BLOG_ENDPOINT } from "./shared/constants.mjs";
import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { showModal } from "./shared/modal.mjs";

document.getElementById("blogPostForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const img = document.getElementById('img').value;
  const altText = document.getElementById('altText').value;

  const postBlogData = {
    title,
    body,
    media: {
      url: img,
      alt: altText,
    }
  };
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(BLOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postBlogData),
    });

    if (response.ok) {
      const result = await response.json();
      showModal('Blog post created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = "manage.html";
      }, 3000);
    } else {
      const errorData = await response.json();
      showModal('Failed to create: ' + errorData.message);
    }
  } catch (error) {
    showModal('Error: ' + error.message);
  }
});

document.addEventListener("DOMContentLoaded", initializeHeaderNav);
