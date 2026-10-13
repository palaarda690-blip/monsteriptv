document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('iptv-player');
    const channelButtons = document.querySelectorAll('.channel-btn');
    const currentTitle = document.getElementById('current-channel-title');

    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            channelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const streamUrl = button.getAttribute('data-url');
            const streamTitle = button.getAttribute('data-title');

            // Kaynağı değiştir ve oynat
            player.src({ src: streamUrl, type: 'application/x-mpegURL' });
            player.play();

            if (streamTitle) {
                currentTitle.textContent = streamTitle;
            }
        });
    });
});
