/**
 * Portfolio Logic Script
 */

const dynamicColors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9477CB', '#FF9248'];

/**
 * 1. 背景捲動淡出效果
 * 當頁面往下滑動時，讓 .banner-bg 逐漸變透明
 */
function handleBackgroundFade() {
    const bannerBg = document.querySelector('.banner-bg');
    const worksSection = document.getElementById('works');
    
    if (!bannerBg || !worksSection) return;

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const worksTop = worksSection.offsetTop;

        // 計算透明度：當滑到作品集頂部時完全消失 (0.8 係數可微調淡出節奏)
        let opacity = 1 - (scrollPos / (worksTop * 0.8));
        
        if (opacity < 0) opacity = 0;
        if (opacity > 1) opacity = 1;

        bannerBg.style.opacity = opacity;
    });
}

/**
 * 2. 渲染作品列表
 */
function renderWorks() {
    const grid = document.getElementById('works-grid');
    const data = window.projectData || []; 
    
    if (!grid) return;
    if (data.length === 0) {
        console.log('Waiting for data...');
        return;
    }

    grid.innerHTML = ''; 

    data.forEach(p => {
        const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
        const item = document.createElement('a');
        item.href = p.link || '#';
        item.className = 'work-item';
        
        item.innerHTML = `
            <div class="img-container">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="work-info">
                <h3>${p.title}</h3>
                <p>${p.category}</p>
            </div>
        `;

        // 懸停時的隨機漸層效果
        item.addEventListener('mouseenter', () => {
            item.style.background = `linear-gradient(to bottom, ${randomColor} 0%, ${randomColor}80 100%)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });

        grid.appendChild(item);
    });

    // 設定 Fade-in 動畫觀察器
    setupScrollObserver();
}

/**
 * 3. 作品進入視窗的淡入動畫 (Intersection Observer)
 */
function setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
}

/**
 * 4. 初始化啟動
 */
document.addEventListener('DOMContentLoaded', () => {
    handleBackgroundFade(); // 啟動背景淡出
    renderWorks();          // 啟動作品渲染
});

// 額外確保 load 完畢後再跑一次 (預防 data.js 讀取延遲)
window.addEventListener('load', renderWorks);
