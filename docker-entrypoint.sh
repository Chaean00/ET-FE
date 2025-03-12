#!/bin/sh
# docker-entrypoint.sh

# 기존 default.conf가 있다면 제거
rm -f /etc/nginx/conf.d/default.conf

# 템플릿 파일 내의 환경변수를 치환하여 최종 설정 파일 생성
envsubst '$VITE_API_BASE_URL $VITE_API_BASE_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Nginx 실행
exec nginx -g 'daemon off;'