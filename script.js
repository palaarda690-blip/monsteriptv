document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('iptv-player');
    const channelButtons = document.querySelectorAll('.channel-btn');
    const currentTitle = document.getElementById('current-channel-title');

    let hls = new Hls();

    function loadStream(url, title) {
        if (Hls.isSupported()) {
            hls.destroy(); // Önceki yayını sıfırla
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari / iOS Tarafı İçin Yerel HLS Desteği
            video.src = url;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
        
        if (title) {
            currentTitle.textContent = title;
        }
    }

    // İlk varsayılan kanalı yükle
    const firstBtn = channelButtons[0];
    if (firstBtn) {
        const initialUrl = firstBtn.getAttribute('data-url');
        const initialTitle = firstBtn.querySelector('span').textContent;
        loadStream(initialUrl, initialTitle);
    }

    // Kanal Butonlarına Tıklama Mantığı
    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            channelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const streamUrl = button.getAttribute('data-url');
            const channelName = button.querySelector('span').textContent;
            
            loadStream(streamUrl, channelName);
        });
    });
});
