/**
 * 作品集完整邏輯
 */
function initPortfolio() {
    const data = window.projectData;
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
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
        
        // 渲染完後，立即初始化作品的 Hover 效果
        initWorkItemHovers();
    }

    // --- 2. 滾動監聽效果 ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // A. 導覽列
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // B. Banner 背景淡出
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // C. SVG 太陽旋轉與跳色
        if (sunSvg) {
            let rotation = scrollPos * 0.2; 
            sunSvg.style.transform = `rotate(${rotation}deg)`;

            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            let colorIndex = Math.floor(scrollPos / 400) % sunColors.length;
            sunSvg.style.color = sunColors[colorIndex];
        }
    });

    // --- 3. 作品集 Hover 邏輯 (獨立成函數確保順序) ---
    function initWorkItemHovers() {
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
}

// 執行初始化
document.addEventListener('DOMContentLoaded', initPortfolio);
