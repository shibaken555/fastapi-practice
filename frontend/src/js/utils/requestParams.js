// APIのリクエストパラメータを共通化するためのモジュール
export { fetchCompaniesOverview, fetchCompaniesStockPrice, fetchCompaniesInformation }

function fetchCompaniesOverview(tickerSymbol) {
    const reqParam = `/fetch_stocks/overview/${encodeURIComponent(tickerSymbol)}`;
    return reqParam;
}

function fetchCompaniesStockPrice(tickerSymbol, period) {
    const reqParam = `/fetch_price/${encodeURIComponent(tickerSymbol)}/period/${encodeURIComponent(period)}`;
    return reqParam;
}

function fetchCompaniesInformation(tickerSymbol) {
    const reqParam = `/fetch_stocks/info/${encodeURIComponent(tickerSymbol)}`;
    return reqParam;
}