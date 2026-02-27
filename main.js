function pituRender() {
    // 1. Tự động biến DIV thành MAIN để fix lỗi SEO "Điểm mốc chính"
    const wrapper = document.querySelector('.main-container'); 
    if (wrapper && wrapper.tagName !== 'MAIN') {
        const mainElement = document.createElement('main');
        mainElement.innerHTML = wrapper.innerHTML;
        mainElement.className = wrapper.className;
        wrapper.parentNode.replaceChild(mainElement, wrapper);
        console.log("Đã nâng cấp lên thẻ <main> cho SEO!");
    }
    // Cách này sẽ lấy chính xác cái tên file cuối cùng, bất chấp thư mục sâu bao nhiêu
    const path = window.location.pathname;
    const filename = path.split("/").filter(Boolean).pop(); // Lấy phần cuối cùng của path
    const currentPageId = filename ? filename.replace(".html", "") : "index";
    
    console.log("Dò ID game:", currentPageId);

    const game = PITU_DATABASE.find(item => item.id === currentPageId);
    
    if (!game) {
        console.error("Lỗi: Không tìm thấy data cho ID '" + currentPageId + "'");
        return;
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

document.addEventListener('DOMContentLoaded', pituRender);
