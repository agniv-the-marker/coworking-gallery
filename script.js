// Import day and night image data
import { dayImagesByDate, nightImagesByDate } from './images.js';

// State variables
let currentMode = "day"; // "day" or "night"
let currentDates = Object.keys(dayImagesByDate).sort(); // Sorted date keys
let currentIndex = 0;

// DOM references
const galleryContainer = document.getElementById("gallery");
const modeToggle = document.getElementById("toggle");
const prevButton = document.createElement("button");
const nextButton = document.createElement("button");
const navigationContainer = document.getElementById("navigation");

// Initialize arrows
prevButton.className = "nav-button";
prevButton.innerHTML = "&#8592;";
nextButton.className = "nav-button";
nextButton.innerHTML = "&#8594;";
navigationContainer.appendChild(prevButton);
navigationContainer.appendChild(nextButton);

// Function to get current images based on mode and index
function getCurrentImages() {
    const imageGroups = currentMode === "day" ? dayImagesByDate : nightImagesByDate;
    const currentDate = currentDates[currentIndex];
    return imageGroups[currentDate] || [];
}

// Function to render images
function renderImages() {
    const images = getCurrentImages();
    galleryContainer.innerHTML = ""; // Clear previous images

    images.forEach((imageSrc, idx) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.className = "gallery-image";
            img.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(${1 + Math.random() * 0.2})`;
            galleryContainer.appendChild(img);
        }, idx * 200); // Stagger image loading by 200ms
    });
}

// Function to update navigation state
function updateNavigation() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === currentDates.length - 1;
}

// Event listener for mode toggle
modeToggle.addEventListener("click", () => {
    currentMode = currentMode === "day" ? "night" : "day";
    currentDates = Object.keys(currentMode === "day" ? dayImagesByDate : nightImagesByDate).sort();
    currentIndex = 0; // Reset to the first date group
    document.body.className = currentMode === "day" ? "light-mode" : "dark-mode";
    renderImages();
    updateNavigation();
});

// Event listener for navigation buttons
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderImages();
        updateNavigation();
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < currentDates.length - 1) {
        currentIndex++;
        renderImages();
        updateNavigation();
    }
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderImages();
    updateNavigation();
});
