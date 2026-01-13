document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('works-grid');
    if (grid && window.projectData) {
        grid.innerHTML = window.projectData.map(work => `
            <a href="works.html?id=${work.id}" class="work-item">
                <div class="img-container">
                    <img src="${work.image}" alt="${work.title}" loading="lazy">
                </div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p>${work.category}</p>
                </div>
            </a>
        `).join('');
    }

    // 2. 太陽特效：隨捲動旋轉與變色
    const sunSvg = document.querySelector('.sun-svg');
    const colors = ['#87CEEB', '#FF6B6B', '#4ECDC4', '#FFE66D', '#1a1a1a'];
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // 旋轉
        if (sunSvg) {
            sunSvg.style.transform = `rotate(${scrolled * 0.2}deg)`;
            // 隨機變色 (每捲動 500px 換一次色)
            const colorIndex = Math.floor(scrolled / 500) % colors.length;
            sunSvg.style.color = colors[colorIndex];
        }

        // 導覽列背景切換
        const nav = document.querySelector('nav');
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Back to Top 按鈕顯示
        const btt = document.getElementById('backToTop');
        if (scrolled > 300) {
            btt.classList.add('active');
        } else {
            btt.classList.remove('active');
        }
    });

    // 3. Back to Top 點擊事件
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. 聯絡表單：驗證碼邏輯
    const captchaDisplay = document.getElementById('captchaDisplay');
    let currentCaptcha = "";

    function generateCaptcha() {
        currentCaptcha = Math.random().toString(36).substring(2, 6).toUpperCase();
        if (captchaDisplay) captchaDisplay.innerText = currentCaptcha;
    }
    generateCaptcha();

    // 5. 表單提交處理
    const contactForm = document.getElementById('portfolioContactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userInput = document.getElementById('captchaInput').value.toUpperCase();
        const modal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMsg = document.getElementById('modalMsg');

        if (userInput === currentCaptcha) {
            modalTitle.innerText = "Success";
            modalMsg.innerText = "感謝您的來信！我們將盡快與您聯繫。";
            modal.classList.add('active');
            contactForm.reset();
            generateCaptcha();
        } else {
            alert("驗證碼錯誤，請重新輸入");
            generateCaptcha();
            document.getElementById('captchaInput').value = "";
        }
    });

    // 6. 捲動顯現動畫 (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));
});

// Modal 關閉函數 (全域)
function closeModal() {
    document.getElementById('customModal').classList.remove('active');
}
