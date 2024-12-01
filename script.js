import { dayImagesByDate, nightImagesByDate } from "./images.js";

let currentMode = "day"; // 'day' or 'night'
let currentDateIndex = 0; // Index for the date navigation
const gallery = document.getElementById("gallery");
const toggleModeButton = document.getElementById("toggle-mode");
const prevDateButton = document.getElementById("prev-date");
const nextDateButton = document.getElementById("next-date");
const audio = new Audio(); // Create an audio element

// Generate a random transform for an image
function getRandomTransform() {
    return {
        rotation: `${Math.random() * 10 - 5}deg`,
        xOffset: `${Math.random() * 10 - 5}px`,
        yOffset: `${Math.random() * 10 - 5}px`,
        scale: `${1 + Math.random() * 0.1}`
    };
}

// Populate the gallery with images for the current date and mode
function updateGallery() {
    gallery.innerHTML = ""; // Clear existing images
    const imagesByDate = currentMode === "day" ? dayImagesByDate : nightImagesByDate;
    const date = dates[currentDateIndex];
    const images = imagesByDate[date] || [];

    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;

        // Apply random transformations to the image
        const { rotation, xOffset, yOffset, scale } = getRandomTransform();
        img.style.setProperty("--rotation", rotation);
        img.style.setProperty("--x-offset", xOffset);
        img.style.setProperty("--y-offset", yOffset);
        img.style.setProperty("--scale", scale);
        img.classList.add("rotated");

        gallery.appendChild(img);
    });
}

// Toggle between day and night mode
function toggleMode() {
    currentMode = currentMode === "day" ? "night" : "day";
    document.body.className = currentMode === "day" ? "day-mode" : "night-mode";
    toggleModeButton.textContent = currentMode === "day" ? "🌞" : "🌙";

    // Play the corresponding audio
    audio.src = currentMode === "day" ? "./audio/day-music.mp3" : "./audio/night-music.mp3";
    audio.play();

    updateGallery();
}

// Change the current date (backward or forward)
function changeDate(offset) {
    currentDateIndex = (currentDateIndex + offset + dates.length) % dates.length;
    updateGallery();
}

// Event listeners
toggleModeButton.addEventListener("click", toggleMode);
prevDateButton.addEventListener("click", () => changeDate(-1));
nextDateButton.addEventListener("click", () => changeDate(1));

// Initialize
document.body.className = "day-mode";
audio.src = "./audio/day-music.mp3"; // Default to day mode
audio.loop = true; // Loop the audio for continuous playback
audio.play();
updateGallery();
