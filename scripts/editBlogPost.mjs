import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";
import { updateBlogPost } from "./shared/utils/updateBlogPost.mjs";
import { showModal } from "./shared/modal.mjs";

// Gets the blog post id
function getBlogPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
// Event listener for getting current blog post information and calling the update function with PUT to the api to update the post
document.addEventListener("DOMContentLoaded", async () => {
  const blogPostId = getBlogPostId();

  if (blogPostId) {
    try {
      const response = await fetchBlogPost();

      if (response && Array.isArray(response.data)) {
        const blogPostData = response.data.find((post) => post.id === blogPostId);

        if (blogPostData) {
          document.getElementById("title").value = blogPostData.title || "";
          document.getElementById("body").value = blogPostData.body || "";
          const imageUrl = blogPostData.media && blogPostData.media.url ? blogPostData.media.url : "";
          const imageAlt = blogPostData.media.alt || "";
          document.getElementById("img").value = imageUrl;
          document.getElementById("altText").value = imageAlt;
        } else {
          showModal("Blog post with the specified ID not found.");
        }
      } else {
        showModal("Failed to fetch blog posts or invalid data format.");
      }
    } catch (error) {
      showModal("Error fetching the blog post. Please try again.");
    }
  } else {
    showModal("No blog post ID found in the URL.");
  }

  const blogPostForm = document.getElementById("blogPostForm");
  blogPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedTitle = document.getElementById("title").value;
    const updatedBody = document.getElementById("body").value;
    const updatedImgUrl = document.getElementById("img").value;
    const updatedAltText = document.getElementById("altText").value;

    const updatedBlogPost = {
      title: updatedTitle,
      body: updatedBody,
      media: {
        url: updatedImgUrl,
        alt: updatedAltText,
      }
    };

    try {
      const result = await updateBlogPost(blogPostId, updatedBlogPost);

      if (result && result.data) {
        showModal("Blog post updated successfully! Redirecting...");
        setTimeout(() => {
          window.location.href = "manage.html";
        }, 3000);
      } else {
        showModal("Error updating the blog post: " + (result ? result.error : "Unknown error"));
      }
    } catch (error) {
      showModal("Error updating the blog post. Please try again.");
    }
  });
});

document.addEventListener("DOMContentLoaded", initializeHeaderNav);
