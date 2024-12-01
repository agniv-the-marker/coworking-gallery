// Selecting elements
const gallery = document.getElementById('gallery');
const toggleButton = document.getElementById('toggle');
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');
const prevNightButton = document.getElementById('prev-night');
const nextNightButton = document.getElementById('next-night');
const backgroundMusic = document.getElementById('background-music');

// State
let isDay = true;
let currentDayIndex = 0;
let currentNightIndex = 0;

// Function to generate random offset and rotation
function applyRandomStyles(element) {
    const rotation = `${Math.random() * 10 - 5}deg`; // Random rotation between -5 and 5 degrees
    const offsetX = `${Math.random() * 10 - 5}px`;
    const offsetY = `${Math.random() * 10 - 5}px`;

    element.style.setProperty('--rotation', rotation);
    element.style.setProperty('--offsetX', offsetX);
    element.style.setProperty('--offsetY', offsetY);
}

// Function to add random heights to images
function addRandomHeight(imageElement) {
    if (Math.random() > 0.5) {  // Randomly assign some images to have varied heights
        imageElement.classList.add('random-height');
    }
}

// Function to render images for a specific day or night date
function renderGallery(imagesByDate, isDayMode) {
    const currentIndex = isDayMode ? currentDayIndex : currentNightIndex;
    const date = isDayMode ? dayDates[currentIndex] : nightDates[currentIndex];
    const images = imagesByDate[date]; // isDayMode ? dayImagesByDate[date] : nightImagesByDate[date];
    
    gallery.innerHTML = ''; // Clear gallery
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        applyRandomStyles(img);
        addRandomHeight(img);  // Apply random height to some images
        gallery.appendChild(img);
    });
}

// Function to update the mode
function updateMode() {
    if (isDay) {
        document.body.className = 'light-mode';
        renderGallery(dayImagesByDate, true);  // Render day images
        backgroundMusic.src = './audio/day-music.mp3';
        toggleButton.textContent = 'sunset?';
    } else {
        document.body.className = 'dark-mode';
        renderGallery(nightImagesByDate, false);  // Render night images
        backgroundMusic.src = './audio/night-music.mp3';
        toggleButton.textContent = 'sunrise?';
    }
    backgroundMusic.play();
}

// Event listeners for mode toggle
toggleButton.addEventListener('click', () => {
    isDay = !isDay;
    updateMode();
});

// Event listeners for navigating between day/night dates
prevDayButton.addEventListener('click', () => {
    currentDayIndex = (currentDayIndex - 1 + dayDates.length) % dayDates.length;
    updateMode();
});

nextDayButton.addEventListener('click', () => {
    currentDayIndex = (currentDayIndex + 1) % dayDates.length;
    updateMode();
});

prevNightButton.addEventListener('click', () => {
    currentNightIndex = (currentNightIndex - 1 + nightDates.length) % nightDates.length;
    updateMode();
});

nextNightButton.addEventListener('click', () => {
    currentNightIndex = (currentNightIndex + 1) % nightDates.length;
    updateMode();
});

// Initialization
window.onload = () => {
    currentDayIndex = 0; // Start with the latest day date
    currentNightIndex = 0; // Start with the latest night date
    updateMode();
};
