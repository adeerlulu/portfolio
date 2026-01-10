/**
 * Portfolio Core Logic
 */
function initPortfolio() {
    const data = window.projectData;
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');
    const sunSvg = document.querySelector('.sun-svg');

    // --- 1. Render Works Grid ---
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
            sunSvg.style.transform = `rotate(${scrollPos * 0.2}deg)`;
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
            const cols = getColumnCount();
            const color = baseColors[(Math.floor(index / cols) + (index % cols)) % baseColors.length];
            
            item.addEventListener('mouseenter', () => {
                // 套用 80%(CC) 到 20%(33) 的漸層色
                item.style.background = `linear-gradient(to bottom, ${color}CC 0%, ${color}33 100%)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', initPortfolio);
