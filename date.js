// Thay các entry.xxxxxxx bằng đúng ID trường của bạn
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSeKbXu5Kprf-Hw5juVByO3lLFsNLcMP7_CXS20MD0ngI_mSUQ/formResponse";
const ENTRY_DIA_DIEM = "entry.1152021238";
const ENTRY_DO_UONG = "entry.33105471";
const ENTRY_MON_AN = "entry.710744664";

document.addEventListener('DOMContentLoaded', function() {
    const darkBtn = document.getElementById('darkModeBtn');
    // Đọc trạng thái dark mode từ localStorage khi load trang
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark');
        if (darkBtn) darkBtn.querySelector('span').textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        if (darkBtn) darkBtn.querySelector('span').textContent = '🌙';
    }

    // Xử lý khi bấm nút dark mode
    if (darkBtn) {
        darkBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            const isDarkNow = document.body.classList.contains('dark');
            localStorage.setItem('darkMode', isDarkNow);
            this.querySelector('span').textContent = isDarkNow ? '☀️' : '🌙';
        });
    }

    lottie.loadAnimation({
        container: document.getElementById('lottie-heart'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_0yfsb3a1.json'
    });
});

document.getElementById('henhoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData();
  data.append(ENTRY_DIA_DIEM, form.dia_diem.value);
  data.append(ENTRY_DO_UONG, form.do_uong.value);
  data.append(ENTRY_MON_AN, form.mon_an.value);

  fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    body: data
  }).then(() => {
    document.getElementById('thongbao').textContent = "Đã gửi thành công! Hẹn hò thôi 💖";
    showFirework(); // <-- Gọi hiệu ứng pháo hoa
    form.reset();
  }).catch(() => {
    document.getElementById('thongbao').textContent = "Có lỗi xảy ra, thử lại nhé!";
  });
});

function showFirework() {
    const fireworkDiv = document.getElementById('lottie-firework');
    fireworkDiv.style.display = 'block';
    lottie.loadAnimation({
        container: fireworkDiv,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_3rwasyjy.json' // pháo hoa
    });
    setTimeout(() => {
        fireworkDiv.style.display = 'none';
        fireworkDiv.innerHTML = '';
    }, 3500); // Ẩn sau 3.5s
}