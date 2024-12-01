// Selecting elements
const gallery = document.getElementById('gallery');
const toggleButton = document.getElementById('toggle');
const backgroundMusic = document.getElementById('background-music');

// Initial state
let isDay = true;

// Function to render images
function renderGallery(images) {
    gallery.innerHTML = '';
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        gallery.appendChild(img);
    });
}

// Function to update the mode
function updateMode() {
    if (isDay) {
        document.body.className = 'light-mode';
        renderGallery(dayImages);
        backgroundMusic.src = '/audio/day-music.mp3';
        toggleButton.textContent = 'Switch to Night Mode';
    } else {
        document.body.className = 'dark-mode';
        renderGallery(nightImages);
        backgroundMusic.src = '/audio/night-music.mp3';
        toggleButton.textContent = 'Switch to Day Mode';
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
