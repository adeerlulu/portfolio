/**
 * Portfolio Logic Script
 * Dependencies: data.js (must be loaded before this script)
 */

const dynamicColors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9477CB', '#FF9248'];

function renderWorks() {
    const grid = document.getElementById('works-grid');
    // 檢查是否有讀取到 data.js 中的 projectData
    if (!grid || typeof projectData === 'undefined') return;

    grid.innerHTML = ''; // Clear grid

    projectData.forEach(p => {
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

        // Gradient Background Hover (100% -> 50%)
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

// Initialization
window.addEventListener('load', renderWorks);
