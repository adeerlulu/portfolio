/**
 * 作品資料管理區
 * 以後有新作品，直接在 [] 裡面增加一組 {} 即可
 */
const projects = [
    { 
        title: "作品名稱 01", 
        category: "Brand Identity", 
        image: "https://via.placeholder.com/800x600", 
        link: "project-01.html" 
    },
    { 
        title: "作品名稱 02", 
        category: "UI/UX Design", 
        image: "https://via.placeholder.com/800x600", 
        link: "project-02.html" 
    },
    { 
        title: "作品名稱 03", 
        category: "Graphic Design", 
        image: "https://via.placeholder.com/800x600", 
        link: "project-03.html" 
    },
    { 
        title: "作品名稱 04", 
        category: "Photography", 
        image: "https://via.placeholder.com/800x600", 
        link: "project-04.html" 
    }
];

// 活潑的跳色配色盤 (日系現代感)
const dynamicColors = ['#FFEDA3', '#D4E9FF', '#FFD1D1', '#D0F0C0', '#E5D1FA', '#FFD8B1', '#FFCC99'];

/**
 * 核心執行邏輯
 */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('works-grid');

    // 1. 檢查 HTML 是否有對應的 ID，避免錯誤
    if (!grid) {
        console.error("錯誤：找不到 id 為 'works-grid' 的元素。請檢查 index.html。");
        return;
    }

    // 2. 生成作品 HTML
    projects.forEach(p => {
        // 隨機選一個顏色作為 Hover 時的背景
        const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
        
        const workItem = document.createElement('a');
        workItem.href = p.link;
        workItem.className = 'work-item';
        
        workItem.innerHTML = `
            <div class="img-container" style="background-color: ${randomColor};">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <h3>${p.title}</h3>
            <p>${p.category}</p>
        `;
        
        grid.appendChild(workItem);
    });

    // 3. 滾動淡入動畫 (Intersection Observer)
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 觸發後就不再重複偵測，提升效能
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, // 當作品露出 10% 時觸發
        rootMargin:
