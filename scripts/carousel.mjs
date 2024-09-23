import { fetchBlogPost } from "./shared/utils/fetchBlogPost.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.getElementById("carouselContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentIndex = 0;

  const selectedPostIds = [
    "c8144c4a-a23f-44eb-a208-283d5db15576",
    "cbd0e013-5403-4de2-9817-8140d9d60b3b",
    "fdd66db0-73b0-44d4-b96a-dcc2f45bf559",
  ];

  function createCarouselSlides(posts) {
    carouselContainer.innerHTML = "";

    posts.forEach((post) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      slide.addEventListener("click", () => {
        window.location.href = `post/index.html?id=${post.id}`;
      });

      const imageUrl = post.media.url;
      const img = document.createElement("img");
      img.src = imageUrl;

      const title = document.createElement("div");
      title.classList.add("slide-title");
      title.textContent = post.title;

      slide.appendChild(img);
      slide.appendChild(title);
      carouselContainer.appendChild(slide);
    });
  }

  async function initCarousel() {
    const allPosts = await fetchBlogPost();
    if (!allPosts || !allPosts.data) {
      console.error("Failed to fetch posts or response is empty.");
      return;
    }

    const postsArray = allPosts.data;

    if (!Array.isArray(postsArray)) {
      console.error("Posts data is not in the expected array format.");
      return;
    }

    const selectedPosts = postsArray.filter((post) =>
      selectedPostIds.includes(post.id)
    );

    createCarouselSlides(selectedPosts);
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