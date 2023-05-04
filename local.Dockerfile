FROM node:18-bullseye-slim
WORKDIR /front
COPY ./front /front
EXPOSE 3000
ENV CI=true
