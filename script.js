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

    // 1. 初始化作品集網格
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

    // 2. 捲動相關監聽
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // 導航欄樣式
        if (nav) {
            scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }
        
        // Banner 背景透明度
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }
        
        // 太陽 SVG 旋轉與變色
        if (sunSvg) {
            const extraRotate = scrollPos * 0.2;
            sunSvg.style.setProperty('--scroll-rotate', extraRotate + 'deg');
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }
        
        // 回到頂部按鈕
        if (btt) {
            scrollPos > 600 ? btt.classList.add('active') : btt.classList.remove('active');
        }
        
        // 聯絡表單揭露動畫
        if (revealTarget) {
            const rect = revealTarget.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                revealTarget.classList.add('active');
            }
        }
    });

    // 3. 回到頂部點擊事件
    if (btt) {
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. 作品項目滑過特效
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
                item.style.transition = 'background-color 0.3s ease-out';
                item.style.backgroundColor = color + '66'; // 40% 透明度
            });

            item.addEventListener('mouseleave', () => {
                item.style.transition = 'background-color 1.5s ease-in-out';
                item.style.backgroundColor = 'transparent';
            });
        });
    }
}

// 確保 DOM 載入後執行
document.addEventListener('DOMContentLoaded', initPortfolio);
