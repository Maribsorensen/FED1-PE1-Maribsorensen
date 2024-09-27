import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { showModal } from "./shared/modal.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";

function getBlogPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function fetchBlogPostInformation() {
  const blogPostId = getBlogPostId();
  if (!blogPostId) {
    showModal("No blog post ID found in the URL.");
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
    showModal("Something went wrong, please try again later");
    return null;
  }
}

function createBlogPostHtml(blogPost) {
  if (!blogPost) return;

  const blogPostContainer = document.createElement("div");
  blogPostContainer.className = "blog-post-container";

  const blogPostImageContainer = document.createElement("div");
  blogPostImageContainer.className = "blog-post-img-container";

  const blogPostImage = document.createElement("img");
  blogPostImage.className = "blog-post-img";
  blogPostImage.src = blogPost.media.url;
  blogPostImage.alt = blogPost.media.alt;

  blogPostImageContainer.appendChild(blogPostImage);

  const blogPostArticle = document.createElement("article");
  blogPostArticle.className = "blog-post-article";

  const blogPostTitle = document.createElement("h1");
  blogPostTitle.className = "blog-post-title";
  blogPostTitle.textContent = blogPost.title;

  const blogPostParagraph = document.createElement("p");
  blogPostParagraph.className = "blog-post-paragraph";
  blogPostParagraph.textContent = blogPost.body;

  blogPostArticle.append(blogPostTitle, blogPostParagraph);

  const authorName = document.createElement("p");
  authorName.className = "author-name";
  authorName.textContent = `Author: ${blogPost.author.name}`;

  const publicationDate = document.createElement("p");
  publicationDate.className = "publication-date";
  publicationDate.textContent = `Published on: ${new Date(blogPost.created).toLocaleDateString()}`;

  blogPostArticle.append(authorName, publicationDate);
  blogPostContainer.append(blogPostImageContainer, blogPostArticle);

  return blogPostContainer;
}

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

document.getElementById("shareBtn").addEventListener("click", function () {
  const currentPostUrl = window.location.href;

  navigator.clipboard.writeText(currentPostUrl)
    .then(() => {
      const toasterMessage = document.getElementById("toaster");
      toasterMessage.classList.add("show-toaster");

      setTimeout(function () {
        toasterMessage.classList.remove("show-toaster");
      }, 3000);
    });
});

generateBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);


