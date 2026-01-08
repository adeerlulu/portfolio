/**
 * 作品集渲染與互動邏輯
 */
function initPortfolio() {
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');

    // --- 1. 渲染作品函數 ---
    function renderWorks() {
        if (!grid) return;
        
        // 檢查資料是否存在
        if (typeof worksData !== 'undefined' && worksData.length > 0) {
            grid.innerHTML = worksData.map(work => `
                <a href="project.html?id=${work.id}" class="work-item">
                    <div class="img-container">
                        <img src="${work.image}" alt="${work.title}">
                    </div>
                    <div class="work-info">
                        <h3>${work.title}</h3>
                        <p>${work.category}</p>
                    </div>
                </a>
            `).join('');
            console.log("作品渲染成功");
        } else {
            console.error("資料 worksData 尚未載入或為空");
        }
    }

    // --- 2. 滾動效果 (導覽列變色 + 背景淡出) ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // 導覽列變色
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // 背景圖淡出
        if (bannerBg && banner) {
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, opacity);
        }
    });

    // 執行渲染
    renderWorks();
}

// 確保所有資源（包含 data.js）都載入完成再執行
window.addEventListener('load', initPortfolio);
