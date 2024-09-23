
import { initializeHeaderNav } from "./shared/initializeNav.mjs";
import { deleteBlogPost } from "./shared/utils/deleteBlogPost.mjs";
import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";


export async function displayBlogPost() {
  const blogData = await fetchBlogPost();

  if (blogData && Array.isArray(blogData.data)) {
    generateBlogPostList(blogData.data);
  } else {
    console.error("Invalid data format received or no data:", blogData);
  }
}

function generateBlogPostList(blogPostData) {
  const blogPostList = document.getElementById("blogPostSection");
  blogPostList.textContent = "";

  blogPostData.forEach((blogPost) => {
    const blogPosts = createBlogPostList(blogPost);
    blogPostList.appendChild(blogPosts);
  });
}

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

  const deletePostButton = document.createElement("button");
  deletePostButton.textContent = "Delete";

  deletePostButton.addEventListener('click', () => {
    deleteBlogPost(blogPost.id);
  });

  blogPostLi.append(blogPostAnchor, deletePostButton);
  blogPostUl.appendChild(blogPostLi);
  return blogPostUl;
};

displayBlogPost();
document.addEventListener("DOMContentLoaded", initializeHeaderNav);