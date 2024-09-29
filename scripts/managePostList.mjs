import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { showConfirmationModal, showModal } from "./shared/modal.mjs";
import { deleteBlogPost } from "./shared/utils/deleteBlogPost.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";

// Fetch and display the blog post
export async function displayBlogPost() {
  try {
    const blogData = await fetchBlogPost();

    if (blogData && Array.isArray(blogData.data)) {
      generateBlogPostList(blogData.data);
    } else {
      showModal("Invalid data format received or no data.");
    }
  } catch (error) {
    showModal("Failed to fetch blog posts. Please try again.");
  }
}

// Generate blog post list 
function generateBlogPostList(blogPostData) {
  const blogPostList = document.getElementById("blogPostSection");
  blogPostList.textContent = "";

  blogPostData.forEach((blogPost) => {
    const blogPosts = createBlogPostList(blogPost);
    blogPostList.appendChild(blogPosts);
  });
}

// Create blog post elements
function createBlogPostList(blogPost) {
  const blogPostUl = document.createElement("ul");
  blogPostUl.className = "manage-post-ul";

  const blogPostLi = document.createElement("li");
  blogPostLi.className = "manage-post-li";

  const blogPostAnchor = document.createElement("a");
  blogPostAnchor.className = "manage-post-a";
  blogPostAnchor.textContent = blogPost.title;
  blogPostAnchor.setAttribute("data-id", blogPost.id);

  blogPostAnchor.addEventListener('click', () => {
    window.location.href = `edit.html?id=${blogPost.id}`;
  });

  // Delete post button
  const deletePostButton = document.createElement("button");
  deletePostButton.textContent = "Delete";
  deletePostButton.classList.add("delete-button");

  deletePostButton.addEventListener('click', async () => {
    showConfirmationModal(`Are you sure you want to delete the "${blogPost.title}" post?`, async (isConfirmed) => {
      if (isConfirmed) {
        const isDeleted = await deleteBlogPost(blogPost.id);

        if (isDeleted) {
          showModal("Blog post deleted successfully.");
          displayBlogPost();
        } else {
          showModal("Error deleting the blog post. Please try again.");
        }
      }
    });
  });

  blogPostLi.append(blogPostAnchor, deletePostButton);
  blogPostUl.appendChild(blogPostLi);
  return blogPostUl;
};

displayBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);
