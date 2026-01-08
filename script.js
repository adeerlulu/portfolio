// 【重要】以後增加新作品，就在下面這組中括號 [] 裡面增加內容
const projects = [
    { 
        title: "Brand Identity 2024", 
        category: "Visual Design", 
        image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800", 
        link: "project-01.html" 
    },
    { 
        title: "Editorial Design", 
        category: "Print", 
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800", 
        link: "project-02.html" 
    }
];

const grid = document.getElementById('works-grid');

// 自動生成 HTML
projects.forEach(p => {
    const item = `
        <a href="${p.link}" class="work-item">
            <div class="img-container">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <h3>${p.title}</h3>
            <p>${p.category}</p>
        </a>
    `;
    grid.innerHTML += item;
});

// 滾動淡入效果 (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.work-item').forEach(item => observer.observe(item));
