// APIコール時の共通処理をまとめたモジュール
export { fetchAndNavigate }

async function fetchAndNavigate(reqUrl, storageKey, navigateTo) {
    try {
        const response = await fetch(reqUrl);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem(storageKey, JSON.stringify(data));
            window.location.href = navigateTo;
        } else {
            alert("エラーが発生しました。");
            console.error("エラーメッセージ:", response.status, response.statusText);
            return;
        }
    } catch (error) {
        alert("不明なエラーです");
        console.error("データ取得中にエラーが発生しました:", error);
    }
}