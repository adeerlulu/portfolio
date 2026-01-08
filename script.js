/**
 * 
 */
function initPortfolio() {
    const data = window.projectData;
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    
    // 選取你貼在 HTML 裡的 SVG
    const sunSvg = document.querySelector('.sun-svg');

    // --- 1. 渲染作品區塊 ---
    if (grid && data && data.length > 0) {
        grid.innerHTML = data.map(work => `
            <a href="${work.link}" class="work-item">
                <div class="img-container">
                    <img src="${work.image}" alt="${work.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Image+Missing'">
                </div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p>${work.category}</p>
                </div>
            </a>
        `).join('');
    }

    // --- 2. 滾動監聽效果 (包含導覽列、背景、太陽) ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // A. 導覽列透明度切換
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // B. Banner 背景圖捲動淡出
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // C. SVG 太陽旋轉與跳色邏輯
        if (sunSvg) {
            // 原地旋轉 (像時鐘一樣)
            let rotation = scrollPos * 0.2; 
            sunSvg.style.transform = `rotate(${rotation}deg)`;

            // 四色跳動
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            let colorIndex = Math.floor(scrollPos / 400) % sunColors.length;
            
            // 透過改變 color 來改變 SVG 顏色 (配合 CSS 的 fill: currentColor)
            sunSvg.style.color = sunColors[colorIndex];
        }
    });

    // --- 3. 作品集項目的規律跳色 (Hover 效果) ---
    const items = document.querySelectorAll('.work-item');
    const baseColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
    
    const getColumnCount = () => {
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    };

    items.forEach((item, index) => {
        const columns = getColumnCount();
        const row = Math.floor(index / columns);
        const col = index % columns;
        const colorIndex = (row + col) % baseColors.length;
        const color = baseColors[colorIndex];
        
        item.addEventListener('mouseenter', () => {
            item.style.background = `linear-gradient(to bottom, ${color} 0%, ${color}66 100%)`;
            item.style.color = '#1a1a1a';
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
    });
}

// 確保所有資源載入後執行
window.onload = initPortfolio;
