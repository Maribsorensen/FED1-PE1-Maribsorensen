import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";



export async function displayBlogPost() {
  const blogData = await fetchBlogPost();

  if (blogData && Array.isArray(blogData.data)) {
    generateBlogPost(blogData.data);
  } else {
    console.error("Invalid data format received or no data:", blogData);
  }
}

function generateBlogPost(blogPostData) {
  const blogPostContainer = document.getElementById("blogPostSection");
  blogPostContainer.textContent = "";

  blogPostData.forEach((blogPost) => {
    const blogPostCard = createBlogPostCard(blogPost);
    blogPostContainer.appendChild(blogPostCard);
  });
}

function createBlogPostCard(blogPost) {
  const blogPostCard = document.createElement("a");
  blogPostCard.href = `post/index.html?id=${blogPost.id}`;

  const staticBlogPostContainer = document.createElement("div");
  staticBlogPostContainer.className = "static-blog-post-container";

  const imageUrl = blogPost.media.url;
  // const imageAltText = blogPost.media.alt;
  const staticBlogPostImg = document.createElement("img");
  staticBlogPostImg.className = "static-blog-post-img";
  staticBlogPostImg.src = imageUrl;
  // staticBlogPostImg.alt = imageAltText;

  const staticBlogPostOverlay = document.createElement("div");
  staticBlogPostOverlay.className = "static-blog-post-overlay";

  const staticBlogPostTitle = document.createElement("span");
  staticBlogPostTitle.className = "static-blog-post-title";
  staticBlogPostTitle.textContent = blogPost.title;

  staticBlogPostOverlay.append(staticBlogPostTitle);
  staticBlogPostContainer.append(staticBlogPostImg, staticBlogPostOverlay);
  blogPostCard.append(staticBlogPostContainer);
  return blogPostCard;
}

displayBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);