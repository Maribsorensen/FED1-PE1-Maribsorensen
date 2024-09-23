import { BLOG_ENDPOINT } from "../constants.mjs";

export async function updateBlogPost(postId, updatedPostData) {
  try {
    const api = `${BLOG_ENDPOINT}/${postId}`;
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }, body: JSON.stringify(updatedPostData),
    });

    if (!response.ok) {
      throw new Error('Failed to update blog post');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    return { success: false, error: error.message };
  }
};