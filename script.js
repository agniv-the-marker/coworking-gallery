import { dayImagesByDate, nightImagesByDate } from "./images.js";

let currentMode = "day";
let currentDateIndex = 0;
const dates = Object.keys(dayImagesByDate);

const gallery = document.getElementById("gallery");
const toggleModeButton = document.getElementById("toggle-mode");
const prevDateButton = document.getElementById("prev-date");
const nextDateButton = document.getElementById("next-date");

function getRandomTransform() {
    return {
        rotation: `${Math.random() * 10 - 5}deg`,
        xOffset: `${Math.random() * 10 - 5}px`,
        yOffset: `${Math.random() * 10 - 5}px`,
        scale: `${1 + Math.random() * 0.1}`
    };
}

function updateGallery() {
    gallery.innerHTML = "";
    const imagesByDate = currentMode === "day" ? dayImagesByDate : nightImagesByDate;
    const date = dates[currentDateIndex];

    const images = imagesByDate[date] || [];
    images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;

        const { rotation, xOffset, yOffset, scale } = getRandomTransform();
        img.style.setProperty("--rotation", rotation);
        img.style.setProperty("--x-offset", xOffset);
        img.style.setProperty("--y-offset", yOffset);
        img.style.setProperty("--scale", scale);

        img.classList.add("rotated");
        gallery.appendChild(img);
    });
}

function toggleMode() {
    currentMode = currentMode === "day" ? "night" : "day";
    document.body.className = currentMode === "day" ? "day-mode" : "night-mode";
    toggleModeButton.textContent = currentMode === "day" ? "🌞" : "🌙";
    updateGallery();
}

function changeDate(offset) {
    currentDateIndex = (currentDateIndex + offset + dates.length) % dates.length;
    updateGallery();
}

toggleModeButton.addEventListener("click", toggleMode);
prevDateButton.addEventListener("click", () => changeDate(-1));
nextDateButton.addEventListener("click", () => changeDate(1));

document.body.className = "day-mode";
updateGallery();
