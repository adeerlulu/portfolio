/**
 * 作品集渲染與互動邏輯
 */
function initPortfolio() {
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');

    // --- 1. 渲染作品 ---
    // 這裡改為讀取 projectData
    if (grid && typeof projectData !== 'undefined' && projectData.length > 0) {
        grid.innerHTML = projectData.map(work => `
            <a href="project.html?id=${work.id}" class="work-item">
                <div class="img-container">
                    <img src="${work.image}" alt="${work.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Image+Missing'">
                </div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p>${work.category}</p>
                </div>
            </a>
        `).join('');
        console.log("作品渲染成功，資料筆數：", projectData.length);
    } else {
        console.error("錯誤：找不到 projectData 資料。請確認 data.js 已正確載入且變數名稱無誤。");
    }

    // --- 2. 滾動效果 ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // 導覽列變色 (透明 -> 白底)
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // 背景圖淡出 (bg1)
        if (bannerBg && banner) {
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, opacity);
        }
    });
}

// 使用 window.onload 確保所有 JS 檔案載入完成後執行
window.onload = initPortfolio;
