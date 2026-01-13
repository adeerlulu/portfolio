/**
 * Portfolio Core Logic - script.js
 */

function initPortfolio() {
    const data = window.projectData || window.worksData;
    const grid = document.getElementById('works-grid');
    const nav = document.getElementById('main-nav'); 
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    const sunSvg = document.querySelector('.sun-svg');
    const btt = document.getElementById('backToTop');
    const revealTarget = document.getElementById('revealContact');

    // --- 1. Render Works Grid ---
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

    // --- 2. Scroll Interaction ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Nav 樣式
        if (nav) scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');

        // Banner 背景淡出
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // 太陽捲動特效
        if (sunSvg) {
            const extraRotate = scrollPos * 0.2;
            sunSvg.style.setProperty('--scroll-rotate', `${extraRotate}deg`);
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }

        // Back to Top
        if (btt) {
            scrollPos > 600 ? btt.classList.add('active') : btt.classList.remove('active');
        }

        // Contact Section 顯現
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

    // --- 4. Work Item Hover Effects (恢復 80%-20% 並加入顏色停留感) ---
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
                
                // 滑鼠進入：顏色反應較快
                item.style.transition = 'background 0.3s ease-out';
                item.style.background = `linear-gradient(to bottom, ${color}CC 5%, ${color}33 60%)`;
            });

            item.addEventListener('mouseleave', () => {
                // 滑鼠離開：讓背景顏色緩慢淡出 (0.8s)，達成停留效果
                item.style.transition = 'background 1.5s ease-in-out';
                item.style.background = 'transparent';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initPortfolio);
