# nginxのバージョンを指定
FROM nginx:1.26
# nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf
# htmlをコピー
COPY ./src/html /usr/share/nginx/html
