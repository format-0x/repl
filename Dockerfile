FROM nginx:1.17.9-alpine
COPY default.conf /etc/nginx/conf.d

FROM nginx:1.17.9-alpine
WORKDIR /usr/src/app/
COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/src/app/