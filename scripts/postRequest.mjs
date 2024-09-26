import { BLOG_ENDPOINT } from "./shared/constants.mjs";
import { initializeHeaderNav } from "./shared/initializeNav.mjs";

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
      alert('Blog post created');
      console.log(result);
    } else {
      const errorData = await response.json();
      alert('Failed to create: ' + errorData.message);
      console.error(errorData);
    }
  } catch (error) {
    alert('Error: ' + error.message);
    console.error('Error: ', error);
  }
});
document.addEventListener("DOMContentLoaded", initializeHeaderNav);