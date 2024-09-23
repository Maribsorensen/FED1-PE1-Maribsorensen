import { BLOG_ENDPOINT } from "../constants.mjs";


export async function deleteBlogPost(postId) {
  try {
    const url = `${BLOG_ENDPOINT}/${postId}`;
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (response.ok) {
      console.log(`Post with ID ${postId} has been successfully deleted.`);
      const postElement = document.querySelector(`a[data-id='${postId}']`);
      postElement.closest("li").remove();
    } else {
      console.error(`Failed to delete post with ID ${postId}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error occurred while deleting the post:', error);
  }
};