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

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (nav) scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        if (bannerBg && banner) {
            bannerBg.style.opacity = Math.max(0, 1 - (scrollPos / (banner.offsetHeight * 0.6)));
        }
        if (sunSvg) {
            sunSvg.style.setProperty('--scroll-rotate', `${scrollPos * 0.2}deg`);
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }
        if (btt) scrollPos > 600 ? btt.classList.add('active') : btt.classList.remove('active');
        if (revealTarget) {
            if (revealTarget.getBoundingClientRect().top < window.innerHeight - 100) revealTarget.classList.add('active');
        }
    });

    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    function initWorkItemHovers() {
        const items = document.querySelectorAll('.work-item');
        const baseColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
        const getCols = () => window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);

        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                const color = baseColors[(Math.floor(index / getCols()) + (index % getCols())) % baseColors.length];
                item.style.transition = 'background-color 0.3s ease';
                item.style.backgroundColor = color + '44'; // 使用純色 25% 透明度
            });
            item.addEventListener('mouseleave', () => {
                item.style.transition = 'background-color 1.5s ease-in-out';
                item.style.backgroundColor = 'transparent';
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', initPortfolio);
