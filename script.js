const projects = [
    { 
        title: "頑者拉麵行銷圖", 
        category: "Visual Design", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 02", 
        category: "Brand Identity", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 03", 
        category: "Editorial Design", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    },
    { 
        title: "Project Title 04", 
        category: "Digital Experience", 
        image: "images/w01-cover.jpg", 
        link: "project-01.html" 
    }
];

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
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="work-info">
                <h3>${p.title}</h3>
                <p>${p.category}</p>
            </div>
        `;

        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = randomColor;
        });

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });

        grid.appendChild(item);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
}

// 使用 DOMContentLoaded 確保 HTML 結構讀取完才執行
document.addEventListener('DOMContentLoaded', renderWorks);
