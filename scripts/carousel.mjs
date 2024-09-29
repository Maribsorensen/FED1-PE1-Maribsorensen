import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";
import { showModal } from "./shared/modal.mjs";

// Event listener for carousel
document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.getElementById("carouselContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentIndex = 0;
  // Function for creating the different slides
  function createCarouselSlides(posts) {
    carouselContainer.innerHTML = "";

    posts.forEach((post) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

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
  // Function for initializing the carousel
  async function initCarousel() {
    try {
      const allPosts = await fetchBlogPost();

      if (!allPosts || !allPosts.data) {
        showModal("Failed to fetch posts or response is empty.");
        return;
      }

      const postsArray = allPosts.data;

      if (!Array.isArray(postsArray)) {
        showModal("Posts data is not in the expected array format.");
        return;
      }

      const sortedPosts = postsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
      const newestPosts = sortedPosts.slice(0, 3);

      createCarouselSlides(newestPosts);
    } catch (error) {
      showModal("An error occurred while fetching the posts. Please try again.");
    }
  }

  initCarousel();

  function getSlideWidth() {
    return carouselContainer.clientWidth;
  }

  function scrollToSlide(index) {
    const slideWidth = getSlideWidth();
    carouselContainer.scrollTo({
      left: index * slideWidth,
    });
  }
  // Event listener for buttons on the carousel
  nextButton.addEventListener("click", () => {
    const totalSlides = document.querySelectorAll(".slide").length;
    currentIndex = (currentIndex + 1) % totalSlides;
    scrollToSlide(currentIndex);
  });

  prevButton.addEventListener("click", () => {
    const totalSlides = document.querySelectorAll(".slide").length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    scrollToSlide(currentIndex);
  });
});
