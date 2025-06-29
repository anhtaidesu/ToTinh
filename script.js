const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttons = document.querySelector('.buttons');
const darkBtn = document.getElementById('darkModeBtn');

// --- Xử lý Dark Mode đồng bộ ---
function applyDarkModeFromStorage() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', isDark);
    if (darkBtn) darkBtn.querySelector('span').textContent = isDark ? '☀️' : '🌙';
}
applyDarkModeFromStorage();

if (darkBtn) {
    darkBtn.addEventListener('click', function() {
        const isDarkNow = !document.body.classList.contains('dark');
        document.body.classList.toggle('dark', isDarkNow);
        localStorage.setItem('darkMode', isDarkNow);
        this.querySelector('span').textContent = isDarkNow ? '☀️' : '🌙';
    });
}

// --- Xử lý nút Không di chuyển ---
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);
yesBtn.addEventListener('click', function() {
    window.location.href = "date.html";
});

function moveButton() {
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const padding = 10; // Khoảng cách tối thiểu giữa hai nút
    const minDistance = 60; // Khoảng cách tối thiểu với vị trí cũ
    const margin = 20 * 2.54 / 96; // 2cm đổi ra px

    // Tính vùng di chuyển trong cửa sổ, cách mép ngoài 2cm
    const minX = margin;
    const minY = margin;
    const maxX = window.innerWidth - noRect.width - margin;
    const maxY = window.innerHeight - noRect.height - margin;

    // Lấy vị trí hiện tại của nút "Không"
    let currentLeft = noRect.left;
    let currentTop = noRect.top;

    let newLeft, newTop, overlap, farEnough;
    let tries = 0;
    do {
        newLeft = Math.random() * (maxX - minX) + minX;
        newTop = Math.random() * (maxY - minY) + minY;

        // Kiểm tra không đè lên nút "Đồng ý"
        const noFuture = {
            left: newLeft,
            right: newLeft + noRect.width,
            top: newTop,
            bottom: newTop + noRect.height
        };
        overlap = !(
            noFuture.right < yesRect.left - padding ||
            noFuture.left > yesRect.right + padding ||
            noFuture.bottom < yesRect.top - padding ||
            noFuture.top > yesRect.bottom + padding
        );

        // Kiểm tra di chuyển đủ xa vị trí cũ
        const dx = newLeft - currentLeft;
        const dy = newTop - currentTop;
        farEnough = Math.sqrt(dx * dx + dy * dy) > minDistance;

        tries++;
    } while ((overlap || !farEnough) && tries < 30);

    // Đặt vị trí tuyệt đối so với cửa sổ
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
}

// --- Hiệu ứng trái tim rơi ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 2 + 1;
    heart.style.fontSize = `${size}rem`;
    const duration = Math.random() * 4 + 5;
    heart.style.animationDuration = `${duration}s`;
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    heart.innerText = '❤️';
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
setInterval(createHeart, 400);

// --- GSAP animation cho tiêu đề và nút ---
window.addEventListener('DOMContentLoaded', () => {
    gsap.from(".gsap-title", {y: -80, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)"});
    gsap.from(".love-btn", {
        scale: 0.7,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.7)"
    });
    gsap.to(".heart", {
        y: "100vh",
        repeat: -1,
        duration: 3,
        ease: "power1.in",
        yoyo: true
    });
});

document.addEventListener('DOMContentLoaded', function() {
    lottie.loadAnimation({
        container: document.getElementById('lottie-heart'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_0yfsb3a1.json' // link trái tim đập
    });
});

// Animate nút khi hover
document.querySelectorAll('.love-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });
    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            scale: 1,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });
});