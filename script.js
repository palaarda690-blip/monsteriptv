document.addEventListener('DOMContentLoaded', () => {
    let player = null;
    const channelButtons = document.querySelectorAll('.channel-btn');
    const currentTitle = document.getElementById('current-channel-title');

    function initPlayer(url, title) {
        // Eğer daha önce açılmış bir oynatıcı varsa tamamen yok et
        if (player) {
            player.destroy();
        }

        // Clappr Player'ı yeniden oluştur
        player = new Clappr.Player({
            source: url,
            parentId: "#clappr-player",
            width: "100%",
            height: "100%",
            autoPlay: true,
            mute: false
        });

        if (title) {
            currentTitle.textContent = title;
        }
    }

    // Sayfa açıldığında ilk kanalı otomatik başlat
    const firstBtn = channelButtons[0];
    if (firstBtn) {
        initPlayer(firstBtn.getAttribute('data-url'), firstBtn.getAttribute('data-title'));
    }

    // Kanal butonlarına tıklandığında yayını değiştir
    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            channelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const streamUrl = button.getAttribute('data-url');
            const streamTitle = button.getAttribute('data-title');

            initPlayer(streamUrl, streamTitle);
        });
    });
});
