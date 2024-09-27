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
      const postElement = document.querySelector(`a[data-id='${postId}']`);
      postElement.closest("li").remove();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}