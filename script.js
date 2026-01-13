/**
 * Portfolio Core Logic - script.js
 */
function initPortfolio() {
    // 這裡對應你 data.js 裡的變數名稱，若 data.js 裡是 worksData 請改成 worksData
    const data = window.projectData || window.worksData; 
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    const sunSvg = document.querySelector('.sun-svg');

    // --- 1. Render Works Grid ---
    if (grid && data && data.length > 0) {
        grid.innerHTML = data.map(work => `
            <a href="${work.link || '#'}" class="work-item">
                <div class="img-container">
                    <img src="${work.image}" alt="${work.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Image+Missing'">
                </div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p>${work.category}</p>
                </div>
            </a>
        `).join('');
        initWorkItemHovers();
    }

    // --- 2. Scroll Interaction ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Nav 樣式切換
        if (nav) scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        
        // Banner 背景淡出
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // 太陽捲動特效：增加顏色變換與捲動後的額外旋轉量
        if (sunSvg) {
            const extraRotate = scrollPos * 0.2;
            // 這裡只負責捲動帶來的位移，自動旋轉由 HTML 內的 initSunRotation 處理
            sunSvg.style.setProperty('--scroll-rotate', `${extraRotate}deg`);
            
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }
    });

    // --- 3. Work Item Hover Effects ---
    function initWorkItemHovers() {
        const items = document.querySelectorAll('.work-item');
        const baseColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
        
        const getColumnCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 4;
        };

        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                const cols = getColumnCount();
                const color = baseColors[(Math.floor(index / cols) + (index % cols)) % baseColors.length];
                item.style.background = `linear-gradient(to bottom, ${color}CC 5%, ${color}33 60%)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initPortfolio);
