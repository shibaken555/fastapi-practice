from typing import Annotated
from fastapi import APIRouter, FastAPI, Query
import yfinance as yf

app = FastAPI()
router = APIRouter()


# 入力したティッカーシンボルに合致する企業の株価を返却するAPI
@router.get("/companies/stock_price")
async def fetch_price(
    ticker_symbol: Annotated[list[str], Query()], period: str = Query(default="1d")
):
    tickers = yf.Tickers(" ".join(ticker_symbol))
    all_price_data = []
    for symbol in ticker_symbol:
        prices = tickers.tickers[symbol].history(period=period)
        prices_dict = prices.reset_index()
        prices_dict["Date"] = prices_dict["Date"].dt.strftime("%Y-%m-%d")
        price_data = prices_dict.to_dict(orient="records")
        all_price_data.append({"ticker_symbol": symbol, "price_data": price_data})
    return all_price_data
