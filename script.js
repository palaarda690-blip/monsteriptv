document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const volumeSlider = document.getElementById('volume-slider');

    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseStream();
        } else {
            playStream();
        }
    });

    function playStream() {
        if (audioPlayer.src && !audioPlayer.src.includes('YOUR_STREAM_URL_HERE')) {
            audioPlayer.play();
        }
        isPlaying = true;
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }

    function pauseStream() {
        audioPlayer.pause();
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }

    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });
});
