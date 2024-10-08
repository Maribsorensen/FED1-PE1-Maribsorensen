import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { showModal } from "./shared/modal.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";

let blogPosts = [];
let currentPage = 1;
const postsPerPage = 12;

export async function displayBlogPost() {
  const blogData = await fetchBlogPost();

  if (blogData && Array.isArray(blogData.data)) {
    blogPosts = blogData.data;
    renderSortedPosts();
  } else {
    showModal("Invalid data format received or no data.");
  }
}
// Function regarding sorting order for static list
function renderSortedPosts() {
  const sortOrder = document.getElementById("sortOrder").value;
  let sortedPosts = [];

  if (sortOrder === "newest") {
    sortedPosts = blogPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (sortOrder === "oldest") {
    sortedPosts = blogPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  } else if (sortOrder === "alphabetical") {
    sortedPosts = blogPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  generateBlogPost(paginatedPosts);
  updatePaginationControls(sortedPosts.length);
}

function generateBlogPost(blogPostData) {
  const blogPostContainer = document.getElementById("blogPostSection");
  blogPostContainer.textContent = "";

  blogPostData.forEach((blogPost) => {
    const blogPostCard = createBlogPostCard(blogPost);
    blogPostContainer.appendChild(blogPostCard);
  });
}
// Create all the blog post cards in the static list
function createBlogPostCard(blogPost) {
  const blogPostCard = document.createElement("a");
  blogPostCard.href = `post/index.html?id=${blogPost.id}`;

  const staticBlogPostContainer = document.createElement("div");
  staticBlogPostContainer.className = "static-blog-post-container";

  const staticBlogPostImg = document.createElement("img");
  staticBlogPostImg.className = "static-blog-post-img";
  staticBlogPostImg.src = blogPost.media.url;
  staticBlogPostImg.alt = blogPost.media.alt;

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
// Function for buttons to only show next page because there is only 12 posts per page
function updatePaginationControls(totalPosts) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.textContent = "";

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", () => {
      currentPage--;
      renderSortedPosts();
    });
    paginationContainer.appendChild(prevButton);
  }
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
      currentPage++;
      renderSortedPosts();
    });
    paginationContainer.appendChild(nextButton);
  }

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageInfo);
}

document.getElementById("sortOrder").addEventListener("change", () => {
  currentPage = 1;
  renderSortedPosts();
});

displayBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);

