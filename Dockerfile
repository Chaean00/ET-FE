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

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_BASE_PORT=${VITE_API_BASE_PORT}
ENV VITE_API_TIMEOUT=10000
ENV VITE_AUTH_HEADER_KEY=Authorization
ENV VITE_AUTH_HEADER_PREFIX=Bearer

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Nginx 실행
CMD envsubst '$VITE_API_BASE_URL $VITE_API_BASE_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'