import { fetchCompaniesOverview } from "./utils/requestParams.js";
import {fetchAndNavigate} from "./utils/apiClient.js";

const form = document.querySelector("#stockForm");
form.addEventListener('submit', async (event) => {
    // フォームのデフォルト動作を無効化
    event.preventDefault();
    // ユーザーの入力したティッカーシンボルを検出
    const tickerSymbol = document.querySelector('#tickerSymbol').value;
    // 入力したティッカーシンボルでリクエストを送信
    const reqUrl = fetchCompaniesOverview(tickerSymbol);
    fetchAndNavigate(reqUrl,"responseCompanyOverView","companyoverview.html");
});