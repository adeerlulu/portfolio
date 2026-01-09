/* --- 1. 全域重設與防溢出 --- */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { 
    max-width: 100%; overflow-x: hidden; 
    font-family: "Lora", "Noto Sans TC", serif;
    background: #fff; color: #1a1a1a; line-height: 1.8;
    -webkit-font-smoothing: antialiased;
}

/* --- 2. 太陽圖示 Sun Icon --- */
.fixed-sun-icon {
    position: fixed; left: -150px; top: 50%;
    transform: translateY(-50%); z-index: 9999;
    opacity: 0.5; pointer-events: none; mix-blend-mode: multiply;
}
.sun-svg {
    width: 350px; height: auto; display: block;
    transform-origin: center center; fill: currentColor !important;
    transition: color 0.8s ease, opacity 0.3s ease;
}
.sun-svg .cls-1, .sun-svg path { fill: currentColor !important; }

/* --- 3. 字體與導覽列 --- */
.banner h1, #proj-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; }
nav .logo, .nav-links a, .category, .work-info p { 
    font-family: "Lora", serif; letter-spacing: 2px; text-transform: uppercase; 
}
nav {
    display: flex; justify-content: space-between; padding: 30px 5%;
    position: fixed; width: 100%; top: 0; z-index: 1000;
    transition: all 0.4s ease; background: transparent;
}
nav.scrolled {
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
    padding: 15px 5%; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.logo { font-size: 18px; font-weight: 500; letter-spacing: 3px; }
.nav-links a { margin-left: 30px; text-decoration: none; color: #1a1a1a; font-size: 12px; }

/* --- 4. Banner 區塊 --- */
.banner { 
    position: relative; height: 55vh; display: flex; 
    flex-direction: column; justify-content: flex-end; 
    padding: 0 5% 60px; overflow: hidden;
}
.banner-bg {
    position: absolute; inset: 0; z-index: -1;
    background: url('images/bg1.jpg') center/cover;
    -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
}
.banner-content { width: 100%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 10; }
.banner h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); margin-bottom: 10px; line-height: 1.1; word-break: break-word; }
.banner p { color: #666; font-size: 15px; letter-spacing: 1px; max-width: 600px; }

/* --- 5. 作品網格 (正方形色塊版) --- */
.works-section { padding: 80px 5%; }
.grid { 
    max-width: 1400px; margin: 0 auto; display: grid; 
    grid-template-columns: repeat(4, 1fr); gap: 30px; 
}
.work-item { 
    text-decoration: none; color: #1a1a1a; 
    aspect-ratio: 1 / 1; width: 100%; /* 強制正方形 */
    display: flex; flex-direction: column; 
    justify-content: center; align-items: center; /* 內容居中 */
    padding: 30px; transition: all 0.6s ease; overflow: hidden;
    text-align: center;
}

.img-container { 
    width: 90%; aspect-ratio: 3/2; overflow: hidden; 
    margin-bottom: 18px; background: #f9f9f9; 
}
.img-container img { 
    width: 100%; height: 100%; object-fit: cover; 
    transition: 1.5s ease; pointer-events: none; 
}
.work-item:hover .img-container img { transform: scale(1.08); }

/* 圖片保護 */
.work-item img, .project-details img {
    -webkit-user-select: none; user-select: none; -webkit-user-drag: none;
}

/* --- 6. 聯絡區 --- */
.contact-section { padding: 120px 5%; text-align: center; border-top: 1px solid #eee; }
.email-btn { 
    display: inline-block; padding: 15px 40px; border: 1px solid #1a1a1a; 
    text-decoration: none; color: #1a1a1a; font-size: 13px; transition: 0.3s;
}
.email-btn:hover { background: #1a1a1a; color: #fff; }

/* --- 7. RWD 媒體查詢 --- */
@media (max-width: 1200px) { .grid { grid-template-columns: repeat(3, 1fr); } }

@media (max-width: 1024px) {
    .grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .fixed-sun-icon { left: -120px; opacity: 0.25; }
    .sun-svg { width: 240px; }
}

@media (max-width: 600px) {
    .banner { height: 50vh; padding-bottom: 40px; }
    .banner h1 { font-size: 2.2rem; }
    .grid { grid-template-columns: 1fr; } /* 手機改為單欄大正方形 */
    .work-item { padding: 20px; }
}
