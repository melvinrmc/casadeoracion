# stage 1: build

FROM node:16.14.2 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ['/bin/sh', '-c', 'npm run build -- --configuration="production"']

# stage 2: run

FROM nginx:1.19.10-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
