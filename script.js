document.addEventListener('DOMContentLoaded', () => {
    // 1. 導覽列滾動效果
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. 背景圖滾動淡出
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    if (bannerBg && banner) {
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, Math.min(1, opacity));
        });
    }

    // 3. 作品集進場動畫與隨機色
    const workItems = document.querySelectorAll('.work-item');
    const colors = ['#e9ecef', '#dee2e6', '#ced4da', '#adb5bd']; // 你可以換成更鮮豔的顏色

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    workItems.forEach(item => {
        observer.observe(item);
        
        // 滑動變色邏輯
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = randomColor;
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });
});
