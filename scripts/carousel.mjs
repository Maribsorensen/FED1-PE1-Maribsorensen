import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";
import { showModal } from "./shared/modal.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.getElementById("carouselContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentIndex = 0;

  // Function to create slides for the carousel
  function createCarouselSlides(posts) {
    carouselContainer.innerHTML = "";

    posts.forEach((post) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      // Click on the slide redirects to the post page
      slide.addEventListener("click", () => {
        window.location.href = `post/index.html?id=${post.id}`;
      });

      const imageUrl = post.media.url;
      const imgAlt = post.media.alt;
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = imgAlt;

      const title = document.createElement("div");
      title.classList.add("slide-title");
      title.textContent = post.title;

      slide.appendChild(img);
      slide.appendChild(title);
      carouselContainer.appendChild(slide);
    });
  }

  // Initialize the carousel with the latest posts
  async function initCarousel() {
    try {
      const allPosts = await fetchBlogPost();

      // Check if the posts were fetched successfully
      if (!allPosts || !allPosts.data) {
        showModal("Failed to fetch posts or response is empty.");
        return;
      }

      const postsArray = allPosts.data;

      // Ensure postsArray is an array
      if (!Array.isArray(postsArray)) {
        showModal("Posts data is not in the expected array format.");
        return;
      }

      // Sort posts by creation date and get the latest 3
      const sortedPosts = postsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
      const newestPosts = sortedPosts.slice(0, 3);

      // Create slides for the carousel
      createCarouselSlides(newestPosts);
    } catch (error) {
      // Catch any errors in the async function and show a modal
      showModal("An error occurred while fetching the posts. Please try again.");
    }
  }

  // Call the initCarousel function to load posts into the carousel
  initCarousel();

  // Helper function to get the width of a slide
  function getSlideWidth() {
    return carouselContainer.clientWidth;
  }

  // Scroll to a specific slide based on the index
  function scrollToSlide(index) {
    const slideWidth = getSlideWidth();
    carouselContainer.scrollTo({
      left: index * slideWidth,
    });
  }

  // Move to the next slide on clicking the "next" button
  nextButton.addEventListener("click", () => {
    const totalSlides = document.querySelectorAll(".slide").length;
    currentIndex = (currentIndex + 1) % totalSlides;
    scrollToSlide(currentIndex);
  });

  // Move to the previous slide on clicking the "prev" button
  prevButton.addEventListener("click", () => {
    const totalSlides = document.querySelectorAll(".slide").length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    scrollToSlide(currentIndex);
  });
});
