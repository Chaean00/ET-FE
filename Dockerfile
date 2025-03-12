# Stage 1: Build React/Vite 애플리케이션
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_BASE_URL
ARG VITE_API_BASE_PORT
ARG VITE_API_TIMEOUT
ARG VITE_AUTH_HEADER_KEY
ARG VITE_AUTH_HEADER_PREFIX

# 빌드 시점에 사용할 환경변수 설정 (오타 수정: 두 번째는 BASE_PORT)
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_BASE_PORT=${VITE_API_BASE_PORT}
ENV VITE_API_TIMEOUT=10000
ENV VITE_AUTH_HEADER_KEY=Authorization
ENV VITE_AUTH_HEADER_PREFIX=Bearer

RUN npm run build

# Stage 2: Nginx를 통한 서비스
FROM nginx:alpine

# 템플릿 파일을 컨테이너의 /etc/nginx/conf.d/로 복사
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# 프로젝트 루트에 위치한 docker-entrypoint.sh 복사
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 빌드된 정적 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# docker-entrypoint.sh를 통해 envsubst 후 Nginx 실행
ENTRYPOINT ["/docker-entrypoint.sh"]