import fetchCompaniesOverview from "./utils/requestParams";

const form = document.querySelector("#stockForm");
form.addEventListener('submit', async (event) => {
    // フォームのデフォルト動作を無効化
    event.preventDefault();
    // ユーザーの入力したティッカーシンボルを検出
    const tickerSymbol = document.querySelector('#tickerSymbol').value;
    // 入力したティッカーシンボルでリクエストを送信
    const reqUrl = fetchCompaniesOverview(tickerSymbol);
    try {
        const response = await fetch(reqUrl);
        if (response.ok) {
            // messageを受け取り存在しないティッカーシンボルを入力している場合は画面遷移が出来ないようにする
            const responseCompanyOverView = await response.json();
            const message = responseCompanyOverView.message;
            if (message === "OK") {
                // レスポンスを localStorage に保存
                localStorage.setItem("responseCompanyOverView", JSON.stringify(responseCompanyOverView));
                // データ保存後に画面遷移
                window.location.href = 'companyoverview.html';
            } else {
                alert(message);
            }
        } else {
            // response.ok はステータスコードが 200～299 以外のときに false になるため、専用のページに遷移させる
            window.location.href = 'error.html';
        }
    } catch (error) {
        alert("不明なエラーです");
        console.log("データ取得中にエラーが発生しました:", error);
    }
});