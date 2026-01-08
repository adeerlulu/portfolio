/**
 * Portfolio Logic Script
 */

const dynamicColors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9477CB', '#FF9248'];

function renderWorks() {
    const grid = document.getElementById('works-grid');
    
    // 關鍵修改：增加 window. 確保從全域讀取資料，並加入防錯判定
    const data = window.projectData || []; 
    
    if (!grid || data.length === 0) {
        console.log('Waiting for data...');
        return;
    }

    grid.innerHTML = ''; 

    data.forEach(p => {
        const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
        const item = document.createElement('a');
        item.href = p.link || '#';
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
            item.style.background = `linear-gradient(to bottom, ${randomColor} 0%, ${randomColor}80 100%)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });

        grid.appendChild(item);
    });

    // Fade-in Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
}

// 改用更穩定的事件監聽
window.addEventListener('DOMContentLoaded', renderWorks);
window.addEventListener('load', renderWorks);
