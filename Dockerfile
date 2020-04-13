FROM node:alpine

WORKDIR /usr/src/app/
USER root

# 中国镜像源
RUN npm i -g mirror-config-china --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root

# npm install
COPY package.json ./
COPY yarn.lock  ./

RUN yarn 
COPY ./ ./

# RUN npm run test:all
EXPOSE 3001
RUN yarn run start


