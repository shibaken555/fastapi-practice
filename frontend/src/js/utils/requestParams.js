// APIのリクエストパラメータを共通化するためのモジュール
export { fetchCompaniesOverview, fetchCompaniesStockPrice, fetchCompaniesInformation }

function fetchCompaniesOverview(tickerSymbol) {
    const reqParam = `/companies/overview/${encodeURIComponent(tickerSymbol)}`;
    return reqParam;
}

function fetchCompaniesStockPrice(tickerSymbol, period) {
    const params = new URLSearchParams();
    params.set("ticker_symbol", tickerSymbol);
    params.set("period", period);

    return `/companies/stock_price?${params.toString()}`;
}

function fetchCompaniesInformation(tickerSymbol) {
    const reqParam = `/companies/info/${encodeURIComponent(tickerSymbol)}`;
    return reqParam;
}