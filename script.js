const projects = [
    { title: "作品名稱 01", category: "Brand Design", image: "https://via.placeholder.com/800x600", link: "project-01.html" },
    { title: "作品名稱 02", category: "UI/UX", image: "https://via.placeholder.com/800x600", link: "project-02.html" },
    { title: "作品名稱 03", category: "Graphic", image: "https://via.placeholder.com/800x600", link: "project-03.html" },
    { title: "作品名稱 04", category: "Web Design", image: "https://via.placeholder.com/800x600", link: "project-04.html" },
];

// 定義一組活潑的配色 (日系/現代感)
const dynamicColors = ['#FFEDA3', '#D4E9FF', '#FFD1D1', '#D0F0C0', '#E5D1FA', '#FFD8B1'];

const grid = document.getElementById('works-grid');

projects.forEach(p => {
    // 隨機選一個顏色
    const randomColor = dynamicColors[Math.floor(Math.random() * dynamicColors.length)];
    
    const item = `
        <a href="${p.link}" class="work-item">
            <div class="img-container" style="background-color: ${randomColor};">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <h3 style="font-size: 16px;">${p.title}</h3>
            <p style="font-size: 12px; color: #888;">${p.category}</p>
        </a>
    `;
    grid.innerHTML += item;
});

// 滾動偵測動畫
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.work-item').forEach(item => observer.observe(item));
