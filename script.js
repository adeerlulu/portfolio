/**
 * +1 Design Portfolio Script
 * 包含：動態作品渲染、隨機漸層背景、進場動畫偵測
 */

// 1. 作品資料庫
const projects = [
    { 
        title: "我的第一件作品", 
        category: "Visual Design", 
        image: "images/w02-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 02", 
        category: "Brand Identity", 
        image: "images/w02-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 03", 
        category: "Editorial Design", 
        image: "images/w02-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 04", 
        category: "Digital Experience", 
        image: "images/w02-cover.jpg", 
        link: "project-01.html" 
    }
];

// 2. 隨機色池 (Hex 格式)
const dynamicColors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9477CB', '#FF9248'];

/**
 * 渲染作品網格
 */
function renderWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;

    // 清空現有內容（防止重複渲染）
    grid.innerHTML = '';

    projects.forEach(p => {
        // 隨機挑選顏色
        const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
        
        // 建立作品連結卡片
        const item = document.createElement('a');
        item.href = p.link;
        item.className = 'work-item';
        
        // 組合 HTML 結構
        item.innerHTML = `
            <div class="img-container">
                <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/1200x800?text=Image+Loading...'">
            </div>
            <div class="work-info">
                <h3>${p.title}</h3>
                <p>${p.category}</p>
            </div>
        `;

        // --- 互動事件：柔和漸層效果 ---
        
        // 滑鼠移入：產生由上而下 (100% -> 50%) 的漸層
        // 注意：${randomColor}80 代表在原色碼後加上 50% 透明度的 Alpha 值
        item.addEventListener('mouseenter', () => {
            item.style.background = `linear-gradient(to bottom, ${randomColor} 0%, ${randomColor}80 100%)`;
        });

        // 滑鼠移出：恢復透明
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });

        grid.appendChild(item);
    });

    // 3. 啟動進場動畫偵測 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1, // 看到 10% 內容時觸發
        rootMargin: '0px 0px -50px 0px' // 稍微提前或延後觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一旦顯示後就停止觀察該元件
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 對所有作品卡片進行觀察
    document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
}

// 4. 初始化執行
// 確保 DOM 結構完全載入後再執行渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWorks);
} else {
    renderWorks();
}
