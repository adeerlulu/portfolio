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

        // A. Navigation Bar
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // B. Banner Background Fade
        if (bannerBg && banner) {
            let bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity);
        }

        // C. Sun Icon Rotation & Color Jump
        if (sunSvg) {
            let rotation = scrollPos * 0.2; 
            sunSvg.style.transform = `rotate(${rotation}deg)`;

            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            let colorIndex = Math.floor(scrollPos / 400) % sunColors.length;
            sunSvg.style.color = sunColors[colorIndex];
        }
    });

    // --- 3. Work Item Hover Effects ---
    function initWorkItemHovers() {
        const items = document.querySelectorAll('.work-item');
        const baseColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Updated to matching system colors
        
        const getColumnCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 4;
        };

        items.forEach((item, index) => {
            const columns = getColumnCount();
            const row = Math.floor(index / columns);
            const col = index % columns;
            const colorIndex = (row + col) % baseColors.length;
            const color = baseColors[colorIndex];
            
            item.addEventListener('mouseenter', () => {
                // Applied subtle gradient matching your system colors
                item.style.background = `linear-gradient(to bottom, ${color}1A 0%, ${color}05 100%)`;
                item.style.borderColor = color;
            });

            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
                item.style.borderColor = 'transparent';
            });
        });
    }
}

// Entry Point
document.addEventListener('DOMContentLoaded', initPortfolio);
