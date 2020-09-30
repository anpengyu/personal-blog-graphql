FROM node:alpine as NodeBuilder

WORKDIR /usr/src/app/
USER gitlab-runner

RUN npm i -g mirror-config-china --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root
RUN ls -la
COPY package.json ./
# COPY package-lock.json ./
# COPY yarn.lock ./


# RUN yarn --registry=https://registry.npm.taobao.org
RUN npm install

COPY ./ ./
RUN  npm run build
RUN  find build -name "*" -type f -print0 | xargs -0 gzip -9 -k


FROM nginx:alpine as ServerBuilder

WORKDIR /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=NodeBuilder /usr/src/app/build  /usr/share/nginx/html/
