# Build Stage
FROM node:22 AS build

WORKDIR /app

# package.json 파일들 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 프로젝트 전체 복사
COPY . .

# 빌드 시 필요한 빌드 인수 정의
ARG VITE_API_BASE_URL
ARG VITE_API_BASE_PORT
ARG VITE_API_TIMEOUT
ARG VITE_AUTH_HEADER_KEY
ARG VITE_AUTH_HEADER_PREFIX

# 런타임 환경 변수 설정 (빌드 단계에서 npm run build 시 사용 가능)
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_BASE_PORT=${VITE_API_BASE_PORT}
ENV VITE_API_TIMEOUT=10000
ENV VITE_AUTH_HEADER_KEY=Authorization
ENV VITE_AUTH_HEADER_PREFIX=Bearer

# 프론트엔드 애플리케이션 빌드
RUN npm run build

# Runtime Stage
FROM nginx:alpine

# 기본 default.conf 삭제하여 사용자 설정과 충돌 없도록 함.
RUN rm /etc/nginx/conf.d/default.conf

# 템플릿 파일 복사 (프로젝트 루트의 nginx.conf.template을 컨테이너 내 /etc/nginx/에 복사)
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# 빌드된 정적 파일 복사 (Nginx 기본 HTML 경로로)
COPY --from=build /app/dist /usr/share/nginx/html

# 외부에서 80 포트 접근 허용
EXPOSE 80

# 컨테이너 시작 시 환경 변수 치환 후 Nginx 실행
CMD envsubst '$VITE_API_BASE_URL $VITE_API_BASE_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'