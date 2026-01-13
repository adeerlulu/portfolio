/**
 * Portfolio Core Logic - script.js
 * 結合進階視覺特效與首頁渲染邏輯
 */

function initPortfolio() {
    // 優先讀取 window.projectData (由 data.js 提供)
    const data = window.projectData || window.worksData;
    const grid = document.getElementById('works-grid');
    const nav = document.getElementById('main-nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    const sunSvg = document.querySelector('.sun-svg');
    const btt = document.getElementById('backToTop');
    const revealTarget = document.getElementById('revealContact');

    // --- 1. Render Works Grid (首頁專用，不顯示 Tags) ---
    if (grid && data && data.length > 0) {
        grid.innerHTML = data.map(work => `
            <a href="works.html?id=${work.id}" class="work-item">
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

    // --- 2. Scroll Interaction (捲動特效) ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Nav 樣式切換 (捲動超過 50px 加入背景)
        if (nav) {
            scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }

        // Banner 背景淡出特效
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // 太陽捲動特效：包含旋轉變數與顏色切換
        if (sunSvg) {
            const extraRotate = scrollPos * 0.2;
            sunSvg.style.setProperty('--scroll-rotate', `${extraRotate}deg`);
            
            // 隨捲動深度切換太陽色系
            const sunColors = ['#d7c4b7', '#B497BD', '#B0CADE', '#AFEEEE'];
            const colorIndex = Math.floor(scrollPos / 400) % sunColors.length;
            sunSvg.style.color = sunColors[colorIndex];
        }

        // Back to Top 顯示邏輯 (超過 600px 顯示)
        if (btt) {
            scrollPos > 600 ? btt.classList.add('active') : btt.classList.remove('active');
        }

        // Contact Section 顯現動畫
        if (revealTarget) {
            const rect = revealTarget.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                revealTarget.classList.add('active');
            }
        }
    });

    // --- 3. Click Events ---
    if (btt) {
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Work Item Hover Effects (格線 Hover 多彩特效) ---
    function initWorkItemHovers() {
        const items = document.querySelectorAll('.work-item');
        const baseColors = ['#d7c4b7', '#f4f1ee', '#e5ddd5', '#c2b2a6'];
        
        const getColumnCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 4;
        };

        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                const cols = getColumnCount();
                const color = baseColors[(Math.floor(index / cols) + (index % cols)) % baseColors.length];
                // 使用 CSS 變數或直接修改背景
                item.style.background = `linear-gradient(to bottom, ${color}33 0%, ${color}11 100%)`;
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }
}

// 啟動初始化
document.addEventListener('DOMContentLoaded', initPortfolio);
