FROM node:14-alpine

WORKDIR /app

COPY . ./

RUN yarn install

RUN yarn workspaces run build

CMD node packages/backend/dist/index.js