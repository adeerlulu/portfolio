/**
 * 作品集渲染與互動邏輯
 */
function initPortfolio() {
    // 1. 取得資料來源
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
        console.error("渲染失敗：請檢查 index.html 是否有 <div id='works-grid'>。");
    }

    // --- 3. 滾動效果 ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (nav) {
            if (scrollPos > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
        if (bannerBg && banner) {
            let opacity = 1 - (scrollPos / (banner.offsetHeight * 0.6));
            bannerBg.style.opacity = Math.max(0, opacity);
        }
    });

    // --- 4. 規律跳色互動 (確保上下左右不重複) ---
    const items = document.querySelectorAll('.work-item');
    const baseColors = ['#87CEEB', '#B497BD', '#B0CADE', '#AFEEEE'];
    
    // 取得當前網格有幾欄 (會隨 RWD 變化)
    const getColumnCount = () => {
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4; // 預設 1400px 下是 4 欄
    };

    items.forEach((item, index) => {
        const columns = getColumnCount();
        const row = Math.floor(index / columns); // 第幾列
        const col = index % columns;             // 第幾欄
        
        // 核心邏輯：利用座標相加取餘數，達成棋盤式交錯
        const colorIndex = (row + col) % baseColors.length;
        const color = baseColors[colorIndex];
        
        item.addEventListener('mouseenter', () => {
            // 套用 100% 到 40% (66) 的垂直漸層
            item.style.background = `linear-gradient(to bottom, ${color} 0%, ${color}66 100%)`;
            item.style.color = '#1a1a1a';
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
    });
}

// 監聽視窗縮放，確保 RWD 切換欄數時邏輯依然正確 (選配)
window.addEventListener('resize', () => {
    // 如果想要縮放時立刻重新計算，可以重新呼叫部分邏輯，
    // 但通常 onload 執行一次已足夠，因為一般使用者不會頻繁縮放視窗。
});

window.onload = initPortfolio;
