function pituRender() {
    // 1. Lấy toàn bộ path và dọn dẹp các khoảng trống/dấu gạch chéo
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    
    // 2. Lấy phần tử cuối cùng của URL
    let lastSegment = segments.pop() || "index";
    
    // 3. Thiến sạch đuôi .html nếu có
    const currentPageId = lastSegment.replace(".html", "");
    
    console.log("ID Game thực tế bốc được là:", currentPageId);

    // 4. Tìm trong Database
    const game = PITU_DATABASE.find(item => item.id === currentPageId);
    
    if (!game) {
        console.error("Lỗi: Không tìm thấy data cho ID '" + currentPageId + "'");
        // THỬ NGHIỆM: In ra toàn bộ Database để xem bài agoat có trong này chưa
        console.log("Danh sách ID hiện có:", PITU_DATABASE.map(g => g.id));
        return;
    }
    // ... (Đoạn đổ ảnh phía dưới giữ nguyên) ...
}
    // 3. Đổ Banner
    // --- CÁCH 2: TÌM THẺ IMG BÊN TRONG CLASS GAME-BANNER ---
    const bannerWrapper = document.querySelector('.game-banner');
    if (bannerWrapper) {
        // Tìm thẻ img thực sự nằm trong cái div .game-banner
        const actualImg = bannerWrapper.querySelector('img');
        
        if (actualImg) {
            actualImg.src = game.banner;
            actualImg.alt = game.name + " Banner";
            actualImg.setAttribute('fetchpriority', 'high');
            
            // Tối ưu Pagespeed nhưng không làm vỡ layout của div cha
            actualImg.width = 1093; 
            actualImg.height = 468;
            actualImg.style.width = "100%"; 
            actualImg.style.height = "100%"; 
            actualImg.style.display = "block"; // Đảm bảo không bị khoảng trống lạ
            
            console.log("Đã nạp ảnh vào thẻ img bên trong .game-banner");
        }
    }

    // 4. Đổ Previews vào image-grid
    const previews = document.querySelectorAll('.image-grid img');
    previews.forEach((img, i) => {
        if (game.previews[i]) {
            img.src = game.previews[i];
            img.alt = game.name + " Việt Hóa Screenshot " + (i + 1);
            img.setAttribute('loading', 'lazy');
            // Tối ưu Pagespeed
            img.width = 533; img.height = 300;
            img.style.width = "100%"; img.style.height = "auto"; img.style.objectFit = "cover";
        }
    });
}

window.onload = function() {
    console.log("Mọi dữ liệu đã tải xong! Bắt đầu đổ ảnh...");
    pituRender();
};
