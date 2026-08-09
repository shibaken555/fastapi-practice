from fastapi import APIRouter, FastAPI
import yfinance as yf

app = FastAPI()
router = APIRouter()


# 企業を検索した時に表示させる概要ページを表示するAPI
@router.get("/companies/overview/{ticker_symbol}")
async def fetch_companies_overview(ticker_symbol):
    input_ticker_symbol = yf.Ticker(ticker_symbol)
    company_info = input_ticker_symbol.info
    try:
        if company_info.get("trailingPegRatio") is None:
            return {
                "ticker_symbol": ticker_symbol,
                "message": "存在しないティッカーシンボルです",
            }
        else:
            # 企業名、株価、時価総額を取得し返却する
            company_name = company_info.get("longName")
            stock_price = company_info.get("currentPrice")
            market_cap = company_info.get("marketCap")
            return {
                "ticker_symbol": ticker_symbol,
                "company_name": company_name,
                "stock_price": stock_price,
                "market_cap": market_cap,
                "message": "OK",
            }
    except Exception:
        return {
            "ticker_symbol": ticker_symbol,
            "message": "存在しないティッカーシンボルです",
        }


# 入力したティッカーシンボルに合致する企業情報を返却するAPI
@router.get("/companies/info/{ticker_symbol}")
async def fetch_companies_info(ticker_symbol):
    input_ticker_symbol = yf.Ticker(ticker_symbol)
    company = input_ticker_symbol.info
    if company.get("trailingPegRatio") is None:
        return {
            {
                "ticker_symbol": ticker_symbol,
                "company_info": "存在しないティッカーシンボルです",
            },
        }
    else:
        company_info = company.get("longBusinessSummary")
        return {"ticker_symbol": ticker_symbol, "company_info": company_info}
