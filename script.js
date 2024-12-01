// Selecting elements
const gallery = document.getElementById('gallery');
const toggleButton = document.getElementById('toggle');
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');
const backgroundMusic = document.getElementById('background-music');

// State
let isDay = true;
let currentDateIndex = 0;
let dates;

// Function to generate random offset and rotation
function applyRandomStyles(element) {
    const rotation = `${Math.random() * 10 - 5}deg`; // Random rotation between -5 and 5 degrees
    const offsetX = `${Math.random() * 10 - 5}px`;
    const offsetY = `${Math.random() * 10 - 5}px`;

    element.style.setProperty('--rotation', rotation);
    element.style.setProperty('--offsetX', offsetX);
    element.style.setProperty('--offsetY', offsetY);
}

// Function to render images for a specific date
function renderGallery(imagesByDate) {
    const date = dates[currentDateIndex];
    const images = imagesByDate[date];
    gallery.innerHTML = '';
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        applyRandomStyles(img);
        gallery.appendChild(img);
    });
}

// Function to update the mode
function updateMode() {
    if (isDay) {
        document.body.className = 'light-mode';
        renderGallery(dayImagesByDate);
        backgroundMusic.src = '/audio/day-music.mp3';
        toggleButton.textContent = 'Switch to Night Mode';
    } else {
        document.body.className = 'dark-mode';
        renderGallery(nightImagesByDate);
        backgroundMusic.src = '/audio/night-music.mp3';
        toggleButton.textContent = 'Switch to Day Mode';
    }
    backgroundMusic.play();
}

// Event listeners
toggleButton.addEventListener('click', () => {
    isDay = !isDay;
    updateMode();
});

prevDayButton.addEventListener('click', () => {
    currentDateIndex = (currentDateIndex - 1 + dates.length) % dates.length;
    updateMode();
});

nextDayButton.addEventListener('click', () => {
    currentDateIndex = (currentDateIndex + 1) % dates.length;
    updateMode();
});

// Initialization
window.onload = () => {
    dates = Object.keys(dayImagesByDate).sort(); // Sort dates chronologically
    currentDateIndex = dates.length - 1; // Start with the latest date
    updateMode();
};
