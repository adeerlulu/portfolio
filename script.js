
function initPortfolio() {
    // 1. 取得資料與元素
    const data = window.projectData;
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    
    // --- 新增：SVG 太陽圖示元素 ---
    const fixedSunIcon = document.querySelector('.fixed-sun-icon img');

    // --- 2. 渲染作品區塊 ---
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

    // --- 3. 綜合滾動效果監聽 ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // A. 導覽列變色
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // B. 背景圖 (bg1) 捲動淡出
        if (bannerBg && banner) {
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, opacity);
        }

        // C. --- 新增：SVG 太陽圖示滾動動畫 ---
        if (fixedSunIcon) {
            // 透明度隨滾動漸變 (0.2 到 0.6 之間)
            let iconOpacity = 0.2 + (scrollPos / 800); 
            fixedSunIcon.style.opacity = Math.min(0.6, Math.max(0.2, iconOpacity));

            // 旋轉動畫 (滾動距離 * 0.5 決定轉速)
            let rotation = scrollPos * 0.5; 
            fixedSunIcon.style.transform = `rotate(${rotation}deg)`;
        }
    });

    // --- 4. 規律跳色互動 ---
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

// 資源載入後執行
window.onload = initPortfolio;
