from typing import Annotated
from fastapi import APIRouter, FastAPI, Query
import yfinance as yf

app = FastAPI()
router = APIRouter()


# 入力したティッカーシンボルに合致する企業の株価を返却するAPI
# 複数の企業の株価が取得出来る
@router.get("/compare_stocks/")
async def compare_stocks(ticker_symbol: Annotated[list[str], Query()] = None):
    tickers = yf.Tickers(ticker_symbol)
    # 全企業の株価データを格納するリスト
    all_price_data = []
    for symbol in ticker_symbol:
        prices = tickers.tickers[symbol].history(period="5d")
        price_data = prices.reset_index().to_dict(orient="records")
        # 各ティッカーのデータを辞書形式でリストに追加
        all_price_data.append({"ticker_symbol": symbol, "price_data": price_data})
    return all_price_data
