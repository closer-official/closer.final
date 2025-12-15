// main.js

window.addEventListener('load', () => {
    // 要素を取得
    const logo = document.getElementById('opening-logo');
    const opening = document.getElementById('opening');

    // 1. オープニングアニメーション (index.html用)
    if (opening && logo) {
        // ロゴをフェードイン
        setTimeout(() => { 
            logo.style.opacity = '1'; 
        }, 500);

        // オープニング画面を消す
        setTimeout(() => {
            opening.style.opacity = '0';
            setTimeout(() => { 
                opening.style.display = 'none'; 
            }, 1000);
        }, 2000);
    }

    // 2. スクロールアニメーション (fade-inクラスがついている要素)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});