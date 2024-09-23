import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";
import { updateBlogPost } from "./shared/utils/updateBlogPost.mjs";

function getBlogPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}


document.addEventListener("DOMContentLoaded", async () => {
  const blogPostId = getBlogPostId();

  if (blogPostId) {
    try {
      const response = await fetchBlogPost();

      if (response && Array.isArray(response.data)) {
        const blogPostData = response.data.find((post) => post.id === blogPostId);

        console.log("Filtered blog post data:", blogPostData);

        if (blogPostData) {
          document.getElementById("title").value = blogPostData.title || "";
          document.getElementById("body").value = blogPostData.body || "";
          const imageUrl = blogPostData.media && blogPostData.media.url ? blogPostData.media.url : "";
          document.getElementById("img").value = imageUrl;
        } else {
          console.error("Blog post with the specified ID not found");
        }
      } else {
        console.error("Failed to fetch blog posts or invalid data format");
      }
    } catch (error) {
      console.error("Error fetching the blog post:", error);
    }
  } else {
    console.error("No blog post ID found in the URL");
  }

  const blogPostForm = document.getElementById("blogPostForm");
  blogPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedTitle = document.getElementById("title").value;
    const updatedBody = document.getElementById("body").value;
    const updatedImgUrl = document.getElementById("img").value;

    const updatedBlogPost = {
      title: updatedTitle,
      body: updatedBody,
      media: {
        url: updatedImgUrl,
      }
    };

    try {
      const result = await updateBlogPost(blogPostId, updatedBlogPost);

      console.log("Update result:", result);

      if (result && result.data) {
        alert("Blog post updated successfully");
        window.location.href = "manage.html";
      } else {
        console.error("Error updating the blog post:", result ? result.error : "Unknown error");
      }
    } catch (error) {
      console.error("Error updating the blog post:", error);
    }
  });
});