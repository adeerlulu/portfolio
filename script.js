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

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const scrollPos = window.scrollY;
        if (nav) scrollPos > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        if (btt) scrollPos > 400 ? btt.classList.add('active') : btt.classList.remove('active');
        if (bannerBg && banner) {
            const bgOpacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, bgOpacity).toString();
        }
        if (sunSvg) {
            sunSvg.style.setProperty('--scroll-rotate', `${scrollPos * 0.2}deg`);
            const sunColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
            sunSvg.style.color = sunColors[Math.floor(scrollPos / 400) % sunColors.length];
        }
        if (revealTarget) {
            const rect = revealTarget.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                revealTarget.classList.add('active');
            }
        }
    }

    if (btt) {
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
                item.style.backgroundColor = color + '44';
            });
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', initPortfolio);

// 數字跑動動畫函式
function initCounter() {
    const counter = document.querySelector('.stat-number');
    if (!counter) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +counter.getAttribute('data-target');
                animateValue(counter, 0, target, 1500); // 1500ms = 1.5秒跑完
                observer.unobserve(entry.target); // 只跑一次
            }
        });
    }, { threshold: 1.0 });

    observer.observe(counter);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 記得在 DOM 加載完後執行
document.addEventListener('DOMContentLoaded', () => {
    // ... 你原本的 initPortfolio();
    initCounter(); 
});
