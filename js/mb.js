let songs = [
    { songName: "Dum Masala", filePath: "songs/Dum Masala.mp3", coverPath: "cover/rrr.jpg" },
    { songName: "Oh My Baby", filePath: "songs/Oh My Baby.mp3", coverPath: "cover/2.jpg" },
    { songName: "Kurchi Madathapetti", filePath: "songs/Kurchi Madathapetti.mp3", coverPath: "cover/3.jpg" },
    { songName: "Mawaa Enthaina", filePath: "songs/Mawaa Enthaina.mp3", coverPath: "cover/4.jpg" },
    { songName: "Ramana Aei", filePath: "songs/Ramana Aei.mp3", coverPath: "cover/5.jpg" },
    { songName: "Amma Song", filePath: "songs/Amma.mp3", coverPath: "cover/6.jpg" },
];

let currentIndex = 0;
let audioElement = new Audio();
audioElement.src = songs[currentIndex].filePath;

const playButtons = document.querySelectorAll('.play-btn');
const masterPlay = document.getElementById('masterPlay');
const prevButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('myProgressBar');
const gifElement = document.querySelector('#gif');
const currentSongName = document.querySelector('.current-song-name');

function playSong(index) {
    currentIndex = index;
    audioElement.src = songs[currentIndex].filePath;
    audioElement.play();
    currentSongName.textContent = songs[currentIndex].songName;
    gifElement.style.opacity = 1;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    updatePlayButtons(index);
}

function pauseSong() {
    audioElement.pause();
    currentSongName.textContent = "Paused";
    gifElement.style.opacity = 0;
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    updatePlayButtons(-1);
}

function updatePlayButtons(activeIndex) {
    playButtons.forEach((btn, index) => {
        if (index === activeIndex && !audioElement.paused) {
            btn.classList.replace('fa-play-circle', 'fa-pause-circle');
        } else {
            btn.classList.replace('fa-pause-circle', 'fa-play-circle');
        }
    });
}

playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentIndex === index && !audioElement.paused) {
            pauseSong();
        } else {
            playSong(index);
        }
    });
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime === 0) {
        playSong(currentIndex);
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
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

audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress;
    }
});

progressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    }
});

audioElement.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});