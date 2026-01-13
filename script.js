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

        if (nav) scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');

        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        if (sunSvg) {
            const extraRotate = scrollPos * 0.2;
            sunSvg.style.setProperty('--scroll-rotate', `${extraRotate}deg`);
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }

        if (btt) {
            scrollPos > 600 ? btt.classList.add('active') : btt.classList.remove('active');
        }

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

    // --- 4. Work Item Hover Effects ---
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
                
                // 進入：使用純色透明度，這樣 transition 才會生效
                item.style.transition = 'background-color 0.3s ease-out';
                item.style.backgroundColor = color + '44'; // 44 是十六進制的透明度 (約 25%)
            });

            item.addEventListener('mouseleave', () => {
                // 離開：達成 1.5s 的緩慢淡出停留感
                item.style.transition = 'background-color 1.5s ease-in-out';
                item.style.backgroundColor = 'transparent';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initPortfolio);
