# 依赖
FROM node:10-alpine
# 安装 nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# npm install
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm i  --production --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root


EXPOSE 3001
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# 复制项目所有代码
COPY . /usr/src/app


RUN npm start
