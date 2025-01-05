let songIndex = 0;
let audioElement = new Audio('songs/Hungry Cheetah.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let durationTimeDisplay = document.getElementById('durationTime');

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    }
});

// Update the progress bar and timestamps
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Update current time display
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);

    // Update duration time display
    if (audioElement.duration) {
        durationTimeDisplay.innerText = formatTime(audioElement.duration);
    }
});

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Seek audio when progress bar is clicked
myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Image click functionality
const image = document.getElementById('clickableImage');
const button = document.getElementById('actionButton');

image.addEventListener('click', () => {
    button.classList.remove('hidden');
});
