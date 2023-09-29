"use strict";

// PRELOAD
// loading will be end after document is loaded
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Add Event Listener on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/*
 * NAV
 */
const navbar = document.querySelector("[data-navbar]"),
  navTogglers = document.querySelectorAll("[data-nav-toggler]"),
  overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/*
 * HEADER
 */
const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});

/*
 * HERO SECTION
 */

const heroSlider = document.querySelector("[data-hero-slider]"),
  heroSliderItems = document.querySelectorAll("[data-hero-slider-item]"),
  heroSliderPrevBtn = document.querySelector("[data-prev-btn]"),
  heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = () => {
  lastActiveSliderItem.classList.remove("active");

  heroSliderItems[currentSlidePos].classList.add("active");

  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const nextSlide = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};
heroSliderNextBtn.addEventListener("click", nextSlide);

const prevSlide = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};
heroSliderPrevBtn.addEventListener("click", prevSlide);

// auto slide
let autoSlideInterval;

const autoSlide = () => {
  autoSlideInterval = setInterval(function () {
    nextSlide();
  }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

// autoslide when we enter the website
window.addEventListener("load", autoSlide);

/*
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", (event) => {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);

    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
