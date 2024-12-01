// Selecting elements
const gallery = document.getElementById('gallery');
const toggleButton = document.getElementById('toggle');
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');
const backgroundMusic = document.getElementById('background-music');
const dateElement = document.getElementById('date');  // For displaying the date

// State
let isDay = true;
let currentDayIndex = 0;
let currentNightIndex = 0;

// Function to format the date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

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
    const images = imagesByDate[date];
    
    gallery.innerHTML = ''; // Clear gallery
    
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        applyRandomStyles(img);
        addRandomHeight(img);  // Apply random height to some images
        img.addEventListener('click', () => openFullScreen(img)); // Add click event for full screen
        gallery.appendChild(img);
    });

    // Update the date text next to the title
    dateElement.textContent = `(${formatDate(date)})`;
}

// Function to open the image in fullscreen
function openFullScreen(image) {
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = image.src;
    fullscreenModal.innerHTML = ''; // Clear previous content
    fullscreenModal.appendChild(fullScreenImage);
    fullscreenModal.appendChild(closeModalButton); // Add close button
    fullscreenModal.classList.add('active'); // Show modal
    document.body.appendChild(fullscreenModal);
}

// Function to close the fullscreen modal
function closeFullScreen() {
    fullscreenModal.classList.remove('active');
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
    // Update title color based on mode
    const title = document.getElementById('orchard-title');
    title.style.color = isDay ? '#000' : '#fff'; // Adjust title color
}


// Event listeners for mode toggle
toggleButton.addEventListener('click', () => {
    isDay = !isDay;
    updateMode();
});

// Event listeners for navigating between day/night dates
prevDayButton.addEventListener('click', () => {
    currentDayIndex = Math.max(0, currentDayIndex - 1);
    currentNightIndex = Math.max(0, currentNightIndex - 1);
    updateMode();
});

nextDayButton.addEventListener('click', () => {
    currentDayIndex = Math.min(dayDates.length - 1, currentDayIndex + 1);
    currentNightIndex = Math.min(nightDates.length - 1, currentNightIndex + 1);
    updateMode();
});

// Initialization
window.onload = () => {
    currentDayIndex = 0; // Start with the first day date
    currentNightIndex = 0; // Start with the first night date
    updateMode();
};
