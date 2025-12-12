FROM node:18 AS builder

LABEL maintainer="uguraksahin1903@gmail.com"

ENV APP_NAME="Full Stack React JS"
ENV VERSION="v1.0.0"
ENV PORT="3000"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1
