import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";

function getBlogPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}


async function fetchBlogPostInformation() {
  const blogPostId = getBlogPostId();
  if (!blogPostId) {
    console.error("No blog post ID found in the URL.");
    return null;
  }
  try {
    const blogPosts = await fetchBlogPost();

    const blogPostArray = blogPosts.data;

    if (!Array.isArray(blogPostArray)) {
      throw new Error("Invalid data format: Expected an array of blog posts.");
    }

    const specificBlogPost = blogPostArray.find(blogPost => blogPost.id === blogPostId);

    if (!specificBlogPost) {
      throw new Error("Blog post not found for the provided ID.");
    }

    return specificBlogPost;
  } catch (error) {
    console.error("Error with fetching blog post information:", error);
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = "Something went wrong, please try again later";
    errorMessageElement.className = "error-msg";
    document.querySelector("main").appendChild(errorMessageElement);
    return null;
  }
}

// Function for dynamically creating html elements
function createBlogPostHtml(blogPost) {
  if (!blogPost) return;

  const blogPostImageContainer = document.createElement("div");
  blogPostImageContainer.className = "blog-post-img-container";

  const imageUrl = blogPost.media.url;
  const blogPostImage = document.createElement("img");
  blogPostImage.className = "blog-post-img";
  blogPostImage.src = imageUrl;

  const blogPostArticle = document.createElement("article");
  blogPostArticle.className = "blog-post-article";

  const blogPostTitle = document.createElement("h1");
  blogPostTitle.className = "blog-post-title";
  blogPostTitle.textContent = blogPost.title;

  const blogPostParagraph = document.createElement("p");
  blogPostParagraph.className = "blog-post-paragraph";
  blogPostParagraph.textContent = blogPost.body;

  blogPostImageContainer.appendChild(blogPostImage);
  blogPostArticle.append(blogPostTitle, blogPostParagraph);

  const blogPostContainer = document.createElement("div");
  blogPostContainer.className = "blog-post-container";
  blogPostContainer.append(blogPostImageContainer, blogPostArticle);

  return blogPostContainer;
}

// Function for changing the meta head title based on post title
function updatePageTitle(blogPostTitle) {
  if (blogPostTitle) {
    document.title = blogPostTitle;
  }
}

async function generateBlogPost() {
  const blogPost = await fetchBlogPostInformation();
  if (!blogPost) return;

  updatePageTitle(blogPost.title);

  const blogPostElement = createBlogPostHtml(blogPost);
  if (blogPostElement) {
    document.querySelector(".blog-post-section").appendChild(blogPostElement);
  }
}

// Shareable button functionality
document.getElementById("shareBtn").addEventListener("click", function () {
  const currentPostUrl = window.location.href;

  navigator.clipboard.writeText(currentPostUrl)
    .then(() => {
      const toasterMessage = document.getElementById("toaster");
      toasterMessage.classList.add("show-toaster");

      setTimeout(function () {
        toasterMessage.classList.remove("show-toaster");
      }, 3000);
    })
});

generateBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);