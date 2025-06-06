let songs = [
    { songName: "Baitikochi Chuste", filePath: "songs/Baitikochi Chuste.mp3", coverPath: "cover/rrr.jpg" },
    { songName: "Gaali Vaaluga", filePath: "songs/Gaali Vaaluga.mp3", coverPath: "cover/2.jpg" },
    { songName: "Dhaga Dhagamaney", filePath: "songs/Dhaga Dhagamaney.mp3", coverPath: "cover/3.jpg" },
    { songName: "Swagatham Krishna", filePath: "songs/Swagatham Krishna.mp3", coverPath: "cover/4.jpg" },
    { songName: "AB Yevaro Nee Baby", filePath: "songs/AB Yevaro Nee Baby.mp3", coverPath: "cover/5.jpg" },
    { songName: "Kodakaa Koteswar Rao", filePath: "songs/Kodakaa Koteswar Rao.mp3", coverPath: "cover/6.jpg" },
    
];

let currentIndex = 0; // Tracks the currently playing song
let audioElement = new Audio(); // Empty audio element for playback
audioElement.src = songs[currentIndex].filePath; // Initialize the first song

// DOM Elements
let playButtons = document.querySelectorAll('.play-btn'); // Individual song play buttons
let masterPlay = document.getElementById('masterPlay'); // Master play/pause button
let prevButton = document.getElementById('previous'); // Previous button
let nextButton = document.getElementById('next'); // Next button
let progressBar = document.getElementById('myProgressBar'); // Progress bar
let gifElement = document.querySelector('#gif'); // Animation GIF
let currentSongName = document.querySelector('.current-song-name'); // Current song name display

// Function to play a specific song
function playSong(index) {
    currentIndex = index;
    audioElement.src = songs[currentIndex].filePath; // Load the selected song
    audioElement.play();
    currentSongName.textContent = songs[currentIndex].songName; // Update the song name
    gifElement.style.opacity = 1; // Show GIF animation
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle'); // Update master button to pause
    updatePlayButtons(index); // Update individual play buttons
}

// Function to pause the current song
function pauseSong() {
    audioElement.pause();
    currentSongName.textContent = "Paused"; // Show "Paused" status
    gifElement.style.opacity = 0; // Hide GIF animation
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle'); // Update master button to play
    updatePlayButtons(-1); // Reset all play buttons
}

// Function to update play/pause icons for individual song buttons
function updatePlayButtons(activeIndex) {
    playButtons.forEach((btn, index) => {
        if (index === activeIndex && !audioElement.paused) {
            btn.classList.replace('fa-play-circle', 'fa-pause-circle'); // Show pause icon
        } else {
            btn.classList.replace('fa-pause-circle', 'fa-play-circle'); // Show play icon
        }
    });
}

// Play/Pause functionality for each song button
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentIndex === index && !audioElement.paused) {
            pauseSong();
        } else {
            playSong(index);
        }
    });
});

// Master Play button functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime === 0) {
        playSong(currentIndex); // Play the current song
    } else {
        pauseSong(); // Pause the song
    }
});

// Previous button functionality
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length; // Go to the previous song
    playSong(currentIndex); // Play the previous song
});

// Next button functionality
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length; // Go to the next song
    playSong(currentIndex); // Play the next song
});

// Sync progress bar with the song's current time
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress; // Update progress bar
    }
});

// Seek functionality when progress bar is adjusted
progressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    }
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { // Check if the pressed key is the spacebar
        e.preventDefault(); // Prevent default browser behavior like scrolling
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
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        // Move to the previous song
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        playSong(currentIndex);
    } else if (e.code === 'ArrowRight') {
        // Move to the next song
        currentIndex = (currentIndex + 1) % songs.length;
        playSong(currentIndex);
    }
});
// Auto-play the next song when the current song ends
audioElement.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length; // Move to the next song
    playSong(currentIndex); // Automatically play the next song
});
