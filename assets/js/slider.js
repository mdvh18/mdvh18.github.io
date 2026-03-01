document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    let index = 0;
    const total = slideItems.length;

    // --- LOGIC 1: ĐỔ ẢNH BANNER (GIỐNG SEARCH) ---
    function loadSliderImages() {
        if (typeof PITU_DATABASE === "undefined") {
            // Nếu DB chưa tới, đợi 100ms rồi thử lại (tránh lỗi race condition)
            setTimeout(loadSliderImages, 100);
            return;
        }

        document.querySelectorAll(".slide-img").forEach(img => {
            const id = img.dataset.pitu;
            // Dò ID y hệt cách làm của Search
            const game = PITU_DATABASE.find(item => item.id === id);
            
            if (game && game.banner) {
                img.src = game.banner;
            } else {
                img.src = "https://via.placeholder.com/800x400?text=No+Image";
            }
        });
    }

    // --- LOGIC 2: CHUYỂN SLIDE ---
    function showSlide(i) {
        slides.style.transform = `translateX(-${i * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % total;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        showSlide(index);
    }

    // Khởi chạy
    loadSliderImages();

    if (next && prev) {
        next.addEventListener("click", nextSlide);
        prev.addEventListener("click", prevSlide);
    }

    setInterval(nextSlide, 5000); // Tự động chạy mỗi 5s
});
document.addEventListener("DOMContentLoaded", function () {
  // Hàm này sẽ tự gọi lại chính nó cho đến khi PITU_DATABASE xuất hiện
  function syncSliderImages() {
    if (typeof PITU_DATABASE === "undefined") {
      console.log("Đang đợi Database từ assets/js...");
      setTimeout(syncSliderImages, 100); 
      return;
    }

    document.querySelectorAll(".slide-img").forEach(img => {
      const id = img.dataset.pitu;
      const game = PITU_DATABASE.find(item => item.id === id);
      if (game && game.banner) {
        img.src = game.banner;
      }
    });
    console.log("Slider đã khớp ảnh xong!");
  }

  syncSliderImages();
});
