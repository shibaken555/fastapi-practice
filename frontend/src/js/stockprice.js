import { fetchCompaniesStockPrice } from "./utils/requestParams.js";

// バックエンドのAPIから返却されたデータを基にチャートや関連する企業情報を表示させるコード
const value = localStorage.getItem('responseCompanyPriceData');
const parsedValue = JSON.parse(value);
// 検索した企業名を表示させる
const tickerSymbol = parsedValue[0].ticker_symbol;
document.querySelector('.companyName').textContent = tickerSymbol;
// price_dataを取得。
const priceData = parsedValue[0].price_data;
// チャートの設定を定義
const config = {
    type: 'line',
    data: {
        // 株価を取得する期間。デフォルトの表示は5日間
        labels: priceData.map(closePriceDates => closePriceDates.Date),
        datasets: [{
            label: '株価',
            // 取得した株価のデータ。終値を表示させるのでCloseを使用
            data: priceData.map(closePriceDates => closePriceDates.Close),
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};
const ctx = document.querySelector('#stockPrice');
const stockPriceChart = new Chart(ctx, config);

// 選択されたラジオボタンの値を取得
const form = document.querySelector('form');
// ラジオボタンを押下した際、指定期間に応じたチャートを表示させる
form.addEventListener('click', async (event) => {
    const selectedRadioButton = document.querySelector('input[name=period]:checked').value;
    const tickerSymbol = parsedValue[0].ticker_symbol;
    const reqUrl = fetchCompaniesStockPrice(tickerSymbol,selectedRadioButton);
    try {
        const response = await fetch(reqUrl);
        if (response.ok) {
            const responseCompanyPriceData = await response.json();
            // 取得したレスポンスパラメータのうち必要なデータはprice_dataなので、それを指定
            const priceData = responseCompanyPriceData[0].price_data;
            // ラジオボタンを押下した期間分の年月日のデータを取得する
            // 取得したデータをconfig.data.labelsに指定してチャートをupdate出来るようにする
            const updatedLabels = priceData.map(closePriceDates => closePriceDates.Date);
            config.data.labels = updatedLabels;
            // ラジオボタンを押下した期間分の株価のデータを取得する
            // 取得したデータをconfig.data.datasets[0].dataに指定してチャートをupdate出来るようにする
            const updatedData = priceData.map(priceDates => priceDates.Close);
            config.data.datasets[0].data = updatedData;
            stockPriceChart.update();
        } else {
            console.error("サーバーエラー:", response.status, response.statusText);
            return;
        }
    } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
    }
});