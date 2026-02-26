function pituRender() {
    // 1. Lấy ID từ tên file HTML hiện tại
    const currentPageId = window.location.pathname.split("/").pop().replace(".html", "");
    
    // 2. Tìm dữ liệu game
    const game = PITU_DATABASE.find(item => item.id === currentPageId);
    if (!game) return; // Không có trong data thì thôi

    // 3. Đổ Banner
    const banner = document.querySelector('.game-banner');
    if (banner) {
        banner.src = game.banner;
        banner.alt = game.name + " Banner";
        banner.setAttribute('fetchpriority', 'high');
        // Tối ưu Pagespeed
        banner.width = 1093; banner.height = 468;
        banner.style.width = "100%"; banner.style.height = "auto"; banner.style.objectFit = "cover";
    }

    // 4. Đổ Previews vào image-grid
    const previews = document.querySelectorAll('.image-grid img');
    previews.forEach((img, i) => {
        if (game.previews[i]) {
            img.src = game.previews[i];
            img.alt = game.name + " Preview " + (i + 1);
            img.setAttribute('loading', 'lazy');
            // Tối ưu Pagespeed
            img.width = 533; img.height = 300;
            img.style.width = "100%"; img.style.height = "auto"; img.style.objectFit = "cover";
        }
    });
}

document.addEventListener('DOMContentLoaded', pituRender);
