// main.js

window.addEventListener('load', () => {
    // 要素を取得
    const logo = document.getElementById('opening-logo');
    const opening = document.getElementById('opening');

    // LP（index.html）のオープニング処理
    // opening要素がある場合のみ実行する
    if (opening && logo) {
        // ロゴをフェードイン
        setTimeout(() => { 
            logo.style.opacity = '1'; 
        }, 500);

        // オープニングを消す
        setTimeout(() => {
            opening.style.opacity = '0';
            setTimeout(() => { 
                opening.style.display = 'none'; 
            }, 1000);
        }, 2500);
    }
});