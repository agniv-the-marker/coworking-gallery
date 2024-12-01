// Selecting elements
const gallery = document.getElementById('gallery');
const toggleButton = document.getElementById('toggle');
const backgroundMusic = document.getElementById('background-music');
const icon = document.getElementById('icon');

// Initial state
let isDay = true;

// Function to render images with random offset
function renderGallery(images) {
    gallery.innerHTML = ''; // Clear the gallery

    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;

        // Randomly offset images by adding a class
        if (Math.random() > 0.5) {
            img.classList.add('offset');
        }

        gallery.appendChild(img);
    });
}

// Function to update the mode
function updateMode() {
    if (isDay) {
        document.body.className = 'light-mode';
        renderGallery(dayImages);
        backgroundMusic.src = '/audio/day-music.mp3';
        icon.textContent = '🌞';
        toggleButton.setAttribute('aria-label', 'Switch to Night Mode');
    } else {
        document.body.className = 'dark-mode';
        renderGallery(nightImages);
        backgroundMusic.src = '/audio/night-music.mp3';
        icon.textContent = '🌙';
        toggleButton.setAttribute('aria-label', 'Switch to Day Mode');
    }
    backgroundMusic.play();
}

// Event listener for toggle
toggleButton.addEventListener('click', () => {
    isDay = !isDay;
    updateMode();
});

// Initial render
updateMode();
