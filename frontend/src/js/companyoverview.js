import { fetchCompaniesStockPrice, fetchCompaniesInformation } from "./utils/requestParams.js";
import { addTextNode } from "./utils/domUtils.js";
import { getStoredData } from "./utils/storageManager.js";
import { fetchAndNavigate } from "./utils/apiClient.js";

const parsedValue = getStoredData('responseCompanyOverView');
if (parsedValue) {
    // 受け取ったレスポンスから企業名を表示させる
    addTextNode(parsedValue.company_name, "#companyName");
    // 受け取ったレスポンスから最新の株価を表示させる
    addTextNode(parsedValue.stock_price, "#stockPrice");
    // 受け取ったレスポンスから最新の時価総額を表示させる
    addTextNode(parsedValue.market_cap, "#marketCap");
} else {
    console.log('データが見つかりませんでした');
}

// 企業情報をクリックした際に画面遷移できるようにする
const companyInfo = document.querySelector('#companyInfo');
companyInfo.addEventListener('click', async (event) => {
    // フォームのデフォルト動作を無効化
    event.preventDefault();
    // ユーザーの入力したティッカーシンボルを検出
    const storedData = getStoredData('responseCompanyOverView');
    const tickerSymbol = storedData.ticker_symbol;
    // 取得したティッカーシンボルでリクエストを送信
    const reqUrl = fetchCompaniesInformation(tickerSymbol);
    fetchAndNavigate(reqUrl, "responseCompanyInfo", "companyinfo.html");
});

// チャートをクリックした際に画面遷移できるようにする
const chart = document.querySelector('#chart');
chart.addEventListener('click', async (event) => {
    // フォームのデフォルト動作を無効化
    event.preventDefault();
    // ユーザーの入力したティッカーシンボルを検出
    const storedData = getStoredData('responseCompanyOverView');
    const tickerSymbol = storedData.ticker_symbol;
    // 取得したティッカーシンボルでリクエストを送信
    // デフォルトでperiodを5dに設定してチャートを表示させる
    const reqUrl = fetchCompaniesStockPrice(tickerSymbol, '5d');
    fetchAndNavigate(reqUrl, "responseCompanyPriceData", "stockprice.html");
});