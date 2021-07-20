FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY packages/ ./packages
RUN yarn --network-timeout 100000

RUN yarn workspaces run build

EXPOSE 3000
CMD node packages/backend/dist/index.js