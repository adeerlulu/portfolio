/**
 * 作品集渲染與互動邏輯
 */
function initPortfolio() {
    // 1. 取得資料來源 (與 data.js 的 window.projectData 對齊)
    const data = window.projectData;
    
    const grid = document.getElementById('works-grid');
    const nav = document.querySelector('nav');
    const bannerBg = document.querySelector('.banner-bg');
    const banner = document.querySelector('.banner');

    // --- 2. 渲染作品區塊 ---
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
        console.log("作品渲染成功，資料筆數：", data.length);
    } else {
        console.error("渲染失敗：請檢查 index.html 是否有 <div id='works-grid'>，或 data.js 資料是否正確。");
    }

    // --- 3. 滾動效果 (導覽列變色 + 背景淡出) ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // 導覽列透明度切換
        if (nav) {
            if (scrollPos > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        // 背景圖捲動淡出
        if (bannerBg && banner) {
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, opacity);
        }
    });

    // --- 4. 隨機背景色互動 (漸層跳色) ---
    const items = document.querySelectorAll('.work-item');
    // 你指定的四種顏色
    const baseColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
    
    items.forEach(item => {
        // 為每個項目隨機分配一個顏色
        const color = baseColors[Math.floor(Math.random() * baseColors.length)];
        
        item.addEventListener('mouseenter', () => {
            // 套用 100% 到 40% (66) 的垂直漸層，文字維持黑色
            item.style.background = `linear-gradient(to bottom, ${color} 0%, ${color}66 100%)`;
            item.style.color = '#1a1a1a';
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
            item.style.color = '#1a1a1a';
        });
    });
}

// 確保所有資源載入後執行
window.onload = initPortfolio;
