# Python 3.12イメージをベースにする
FROM python:3.12.5-bullseye

# 作業ディレクトリを設定
WORKDIR /code

# 依存関係ファイルをコピー
COPY ./requirements.txt /code/requirements.txt
COPY ./app /code/app

# 依存関係をインストール
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt