#!/bin/sh
# docker-entrypoint.sh

# envsubst를 이용해 /etc/nginx/nginx.conf 템플릿 파일 내의 환경변수를 치환하여 최종 설정 파일로 생성
envsubst '$VITE_API_BASE_URL $VITE_API_BASE_PORT' < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf

# 치환된 설정 파일을 기반으로 Nginx 실행
exec nginx -g 'daemon off;'