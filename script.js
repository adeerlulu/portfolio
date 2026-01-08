// 作品資料：未來新增作品請在這裡編輯
const projects = [
    { 
        title: "我的第一件作品", 
        category: "Visual Design", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 02", 
        category: "Web Design", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 03", 
        category: "Graphic", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 04", 
        category: "Photography", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    }
];

// 活潑色配色盤
const dynamicColors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9477CB', '#FF9248'];

function renderWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;

    projects.forEach(p => {
        const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
        const item = document.createElement('a');
        item.href = p.link;
        item.className = 'work-item';
        
        item.innerHTML = `
            <div class="img-container">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="work-info">
                <h3>${p.title}</h3>
                <p>${p.category}</p>
            </div>
        `;

        // 滑鼠移入：改變背景色
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = randomColor;
        });

        // 滑鼠移出：恢復透明背景
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });

        grid.appendChild(item);
    });

    // 啟動淡入觀察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
}

// 執行載入
window.onload = renderWorks;
