from typing import Annotated
from fastapi import APIRouter, FastAPI, Query
import yfinance as yf

app = FastAPI()
router = APIRouter()


# 入力したティッカーシンボルに合致する企業の株価を返却するAPI
@router.get("/companies/stock_price")
async def fetch_stock_price(ticker_symbol: Annotated[list[str], Query()],period:str):
    req_tickers = yf.Tickers(ticker_symbol)
    all_prices_data = []
    for symbol in ticker_symbol:
        stock_prices = req_tickers.tickers[symbol].history(period=period)
        stock_prices_dict = stock_prices.reset_index().to_dict(orient="records")
        all_prices_data.append(
            {"ticker_symbol": symbol, "price_data": stock_prices_dict}
        )
    return all_prices_data